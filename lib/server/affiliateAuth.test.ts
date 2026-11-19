import CryptoJS from "crypto-js";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  getAffiliateSession,
  hashPassword,
  setAffiliateSessionCookie,
  verifyAffiliatePassword,
} from "./affiliateAuth";

describe("affiliateAuth", () => {
  const originalSecret = process.env.AFFILIATE_SECRET;

  afterEach(() => {
    process.env.AFFILIATE_SECRET = originalSecret;
  });

  it("verifies pbkdf2 hashes without upgrade", () => {
    const password = "StrongPassword123!";
    const hash = hashPassword(password);
    const verification = verifyAffiliatePassword(hash, password);

    expect(verification.valid).toBe(true);
    expect(verification.needsUpgrade).toBe(false);
  });

  it("verifies legacy encrypted passwords and flags upgrade", () => {
    process.env.AFFILIATE_SECRET = "legacy-secret";
    const legacyEncrypted = CryptoJS.AES.encrypt(
      "Password123!",
      process.env.AFFILIATE_SECRET
    ).toString();

    const verification = verifyAffiliatePassword(
      legacyEncrypted,
      "Password123!"
    );

    expect(verification.valid).toBe(true);
    expect(verification.needsUpgrade).toBe(true);
  });

  it("accepts bearer token sessions from request headers", () => {
    const res = {
      setHeader: jest.fn(),
    } as unknown as NextApiResponse;

    const token = setAffiliateSessionCookie(res, "test-affiliate");
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cookies: {},
    } as unknown as NextApiRequest;

    const session = getAffiliateSession(req);

    expect(session?.id).toBe("test-affiliate");
  });

  it("accepts x-affiliate-session token headers", () => {
    const res = {
      setHeader: jest.fn(),
    } as unknown as NextApiResponse;

    const token = setAffiliateSessionCookie(res, "header-affiliate");
    const req = {
      headers: {
        "x-affiliate-session": token,
      },
      cookies: {},
    } as unknown as NextApiRequest;

    const session = getAffiliateSession(req);

    expect(session?.id).toBe("header-affiliate");
  });
});
