import type { NextApiRequest, NextApiResponse } from "next";
import { hashPassword, setAffiliateSessionCookie } from "../../../lib/server/affiliateAuth";
import { respondInternalError } from "../../../lib/server/affiliateApiError";
import {
  createAffiliate,
  findAffiliateByField,
  getAffiliateById,
} from "../../../lib/server/affiliateStore";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidAffiliateId = (id: string) => /^[a-zA-Z0-9]{4,25}$/.test(id);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ code: "METHOD_NOT_ALLOWED" });
  }

  const affiliateId = String(req.body?.affiliateId ?? "")
    .trim()
    .toLowerCase();
  const email = String(req.body?.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(req.body?.password ?? "");
  const withStripe = Boolean(req.body?.withStripe);
  const stripeAccountIdRaw = req.body?.stripeAccountId;
  const stripeAccountId =
    typeof stripeAccountIdRaw === "string" ? stripeAccountIdRaw.trim() : "";

  if (!isValidAffiliateId(affiliateId)) {
    return res.status(400).json({ code: "INVALID_AFFILIATE_ID" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ code: "INVALID_EMAIL" });
  }
  if (password.length < 8 || password.length > 40) {
    return res.status(400).json({ code: "INVALID_PASSWORD" });
  }

  try {
    const existingAffiliate = await getAffiliateById(affiliateId);
    if (existingAffiliate) {
      return res.status(409).json({ code: "AFFILIATE_EXISTS" });
    }

    const existingEmail = await findAffiliateByField("email", email);
    if (existingEmail) {
      return res.status(409).json({ code: "EMAIL_EXISTS" });
    }

    await createAffiliate(affiliateId, {
      id: affiliateId,
      email,
      password: hashPassword(password),
      ...(withStripe && stripeAccountId ? { stripeAccountId } : { payPalId: "" }),
      viewCounter: 0,
      balance: 0,
      signedUpGuides: [],
      completedTours: [],
    });

    const token = setAffiliateSessionCookie(res, affiliateId);
    return res.status(201).json({ id: affiliateId, token });
  } catch (error) {
    return respondInternalError(res, "affiliate signup failed", error);
  }
}
