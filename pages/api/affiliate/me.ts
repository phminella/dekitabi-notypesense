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
    return res.status(401).json({ code: "UNAUTHORIZED" });
  }

  const routeAffiliateId = String(req.query?.id ?? "")
    .trim()
    .toLowerCase();
  if (routeAffiliateId && routeAffiliateId !== session.id) {
    return res.status(403).json({ code: "FORBIDDEN" });
  }

  try {
    const affiliate = await getAffiliateById(session.id);
    if (!affiliate) {
      clearAffiliateSessionCookie(res);
      return res.status(401).json({ code: "UNAUTHORIZED" });
    }

    return res.status(200).json({
      affiliate: {
        id: affiliate.id ?? session.id,
        email: affiliate.email ?? "",
        stripeAccountId: affiliate.stripeAccountId ?? "",
        payPalId: affiliate.payPalId ?? "",
        coupon: affiliate.coupon ?? "",
        viewCounter: Number(affiliate.viewCounter ?? 0),
        balance: Number(affiliate.balance ?? 0),
        signedUpGuides: Array.isArray(affiliate.signedUpGuides)
          ? affiliate.signedUpGuides
          : [],
        completedTours: Array.isArray(affiliate.completedTours)
          ? affiliate.completedTours
          : [],
      },
    });
  } catch (error) {
    return respondInternalError(res, "affiliate me failed", error);
  }
}
