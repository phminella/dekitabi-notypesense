import type { NextApiRequest, NextApiResponse } from "next";
import { clearAffiliateSessionCookie } from "../../../lib/server/affiliateAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ code: "METHOD_NOT_ALLOWED" });
  }

  clearAffiliateSessionCookie(res);
  return res.status(200).json({ ok: true });
}
