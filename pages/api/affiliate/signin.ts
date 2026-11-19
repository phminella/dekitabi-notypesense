import type { NextApiRequest, NextApiResponse } from "next";
import {
  hashPassword,
  setAffiliateSessionCookie,
  verifyAffiliatePassword,
} from "../../../lib/server/affiliateAuth";
import { respondInternalError } from "../../../lib/server/affiliateApiError";
import {
  getAffiliateById,
  updateAffiliate,
} from "../../../lib/server/affiliateStore";

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
  const password = String(req.body?.password ?? "");

  if (!isValidAffiliateId(affiliateId)) {
    return res.status(400).json({ code: "INVALID_AFFILIATE_ID" });
  }
  if (!password) {
    return res.status(400).json({ code: "INVALID_PASSWORD" });
  }

  try {
    const affiliate = (await getAffiliateById(affiliateId)) as
      | { password?: string }
      | null;
    if (!affiliate) {
      return res.status(404).json({ code: "AFFILIATE_NOT_FOUND" });
    }

    const storedPassword = affiliate?.password ?? "";
    const verification = verifyAffiliatePassword(storedPassword, password);

    if (!verification.valid) {
      return res.status(401).json({ code: "INVALID_CREDENTIALS" });
    }

    if (verification.needsUpgrade) {
      await updateAffiliate(affiliateId, { password: hashPassword(password) });
    }

    const token = setAffiliateSessionCookie(res, affiliateId);
    return res.status(200).json({ id: affiliateId, token });
  } catch (error) {
    return respondInternalError(res, "affiliate signin failed", error);
  }
}
