import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";

const SESSION_COOKIE_NAME = "affiliate_session";
const SESSION_HEADER_NAME = "x-affiliate-session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const PBKDF2_ITERATIONS = 120000;
const PBKDF2_KEY_LENGTH = 64;
const PBKDF2_DIGEST = "sha512";
const HASH_PREFIX = "pbkdf2_sha512";
let warnedMissingSessionSecret = false;

type AffiliateSession = {
  id: string;
  exp: number;
};

type PasswordVerification = {
  valid: boolean;
  needsUpgrade: boolean;
};

const getSessionSecret = () => {
  const secret =
    process.env.AFFILIATE_SESSION_SECRET ?? process.env.AFFILIATE_SECRET;
  if (secret) return secret;

  if (process.env.NODE_ENV !== "production") {
    if (!warnedMissingSessionSecret) {
      warnedMissingSessionSecret = true;
      console.warn(
        "[affiliateAuth] Missing AFFILIATE_SESSION_SECRET/AFFILIATE_SECRET. Using local dev fallback secret."
      );
    }
    return "local-dev-affiliate-session-secret";
  }

  if (!secret) {
    throw new Error("Missing affiliate session secret");
  }
  return secret;
};

const base64UrlEncode = (value: string) =>
  Buffer.from(value, "utf8").toString("base64url");

const constantTimeEqual = (a: string, b: string) => {
  const bufferA = Buffer.from(a, "utf8");
  const bufferB = Buffer.from(b, "utf8");
  if (bufferA.length !== bufferB.length) return false;
  return crypto.timingSafeEqual(
    new Uint8Array(bufferA),
    new Uint8Array(bufferB)
  );
};

const signPayload = (payload: string) =>
  crypto
    .createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");

const buildCookie = (name: string, value: string, maxAgeSeconds: number) =>
  `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds};${
    process.env.NODE_ENV === "production" ? " Secure;" : ""
  }`;

const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(
      password,
      salt,
      PBKDF2_ITERATIONS,
      PBKDF2_KEY_LENGTH,
      PBKDF2_DIGEST
    )
    .toString("hex");
  return `${HASH_PREFIX}$${PBKDF2_ITERATIONS}$${salt}$${hash}`;
};

const verifyHashedPassword = (storedHash: string, password: string) => {
  const [prefix, iterationsRaw, salt, expectedHash] = storedHash.split("$");
  if (!prefix || !iterationsRaw || !salt || !expectedHash) return false;
  if (prefix !== HASH_PREFIX) return false;

  const iterations = Number.parseInt(iterationsRaw, 10);
  if (!Number.isFinite(iterations) || iterations <= 0) return false;

  const actualHash = crypto
    .pbkdf2Sync(password, salt, iterations, PBKDF2_KEY_LENGTH, PBKDF2_DIGEST)
    .toString("hex");
  return constantTimeEqual(actualHash, expectedHash);
};

const verifyLegacyPassword = (storedPassword: string, password: string) => {
  if (!storedPassword) return false;
  if (storedPassword === password) return true;

  if (!process.env.AFFILIATE_SECRET) return false;

  try {
    const decrypted = CryptoJS.AES.decrypt(
      storedPassword,
      process.env.AFFILIATE_SECRET
    ).toString(CryptoJS.enc.Utf8);
    return decrypted === password;
  } catch {
    return false;
  }
};

const createSessionToken = (affiliateId: string) => {
  const payload: AffiliateSession = {
    id: affiliateId,
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);
  return `${encodedPayload}.${signature}`;
};

const verifySessionToken = (token: string): AffiliateSession | null => {
  if (!token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = signPayload(payload);
  if (!constantTimeEqual(signature, expectedSignature)) return null;

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as AffiliateSession;
    if (!decoded?.id || !decoded?.exp) return null;
    if (Date.now() > decoded.exp) return null;
    return decoded;
  } catch {
    return null;
  }
};

const extractTokenFromHeader = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }
  if (typeof value === "string") {
    return value.trim();
  }
  return "";
};

const extractBearerToken = (value: string | string[] | undefined) => {
  const raw = extractTokenFromHeader(value);
  if (!raw) return "";

  if (raw.toLowerCase().startsWith("bearer ")) {
    return raw.slice(7).trim();
  }

  return "";
};

const getAffiliateSession = (req: NextApiRequest) => {
  const headerToken = extractTokenFromHeader(req.headers[SESSION_HEADER_NAME]);
  if (headerToken) {
    const headerSession = verifySessionToken(headerToken);
    if (headerSession) return headerSession;
  }

  const bearerToken = extractBearerToken(req.headers.authorization);
  if (bearerToken) {
    const bearerSession = verifySessionToken(bearerToken);
    if (bearerSession) return bearerSession;
  }

  const token = req.cookies[SESSION_COOKIE_NAME];
  if (!token) return null;
  return verifySessionToken(token);
};

const setAffiliateSessionCookie = (
  res: NextApiResponse,
  affiliateId: string
) => {
  const token = createSessionToken(affiliateId);
  res.setHeader(
    "Set-Cookie",
    buildCookie(SESSION_COOKIE_NAME, token, SESSION_TTL_SECONDS)
  );
  return token;
};

const clearAffiliateSessionCookie = (res: NextApiResponse) => {
  res.setHeader("Set-Cookie", buildCookie(SESSION_COOKIE_NAME, "", 0));
};

const verifyAffiliatePassword = (
  storedPassword: string,
  candidatePassword: string
): PasswordVerification => {
  if (!storedPassword || !candidatePassword) {
    return { valid: false, needsUpgrade: false };
  }

  if (storedPassword.startsWith(`${HASH_PREFIX}$`)) {
    return {
      valid: verifyHashedPassword(storedPassword, candidatePassword),
      needsUpgrade: false,
    };
  }

  const valid = verifyLegacyPassword(storedPassword, candidatePassword);
  return { valid, needsUpgrade: valid };
};

export {
  SESSION_COOKIE_NAME,
  SESSION_HEADER_NAME,
  clearAffiliateSessionCookie,
  getAffiliateSession,
  hashPassword,
  setAffiliateSessionCookie,
  verifyAffiliatePassword,
};
