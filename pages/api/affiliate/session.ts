import type { NextApiRequest, NextApiResponse } from "next";
import {
  clearAffiliateSessionCookie,
  getAffiliateSession,
} from "../../../lib/server/affiliateAuth";
import { respondInternalError } from "../../../lib/server/affiliateApiError";
import { getAffiliateById } from "../../../lib/server/affiliateStore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ code: "METHOD_NOT_ALLOWED" });
  }

  const session = getAffiliateSession(req);
  if (!session?.id) {
    return res.status(200).json({ authenticated: false });
  }

  try {
    const affiliate = await getAffiliateById(session.id);
    if (!affiliate) {
      clearAffiliateSessionCookie(res);
      return res.status(200).json({ authenticated: false });
    }

    return res.status(200).json({ authenticated: true, id: session.id });
  } catch (error) {
    return respondInternalError(res, "affiliate session failed", error);
  }
}
