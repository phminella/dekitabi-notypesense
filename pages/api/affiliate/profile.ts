import type { NextApiRequest, NextApiResponse } from "next";
import {
  clearAffiliateSessionCookie,
  getAffiliateSession,
  hashPassword,
  verifyAffiliatePassword,
} from "../../../lib/server/affiliateAuth";
import { respondInternalError } from "../../../lib/server/affiliateApiError";
import {
  deleteAffiliate,
  findAffiliateByField,
  getAffiliateById,
  updateAffiliate,
} from "../../../lib/server/affiliateStore";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const asTrimmedString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const handleUpdateCoupon = async (
  affiliateId: string,
  couponRaw: unknown,
  res: NextApiResponse
) => {
  const coupon = asTrimmedString(couponRaw);
  if (coupon.length < 5 || coupon.length > 10) {
    return res.status(400).json({ code: "INVALID_COUPON" });
  }

  const existingCouponDoc = await findAffiliateByField("coupon", coupon);
  if (existingCouponDoc && existingCouponDoc.id !== affiliateId) {
    return res.status(409).json({ code: "COUPON_EXISTS" });
  }

  await updateAffiliate(affiliateId, {
    coupon,
  });
  return res.status(200).json({ coupon });
};

const handleUpdatePayPal = async (
  affiliateId: string,
  payPalIdRaw: unknown,
  res: NextApiResponse
) => {
  const payPalId = asTrimmedString(payPalIdRaw);
  if (payPalId.length < 3 || payPalId.length > 30) {
    return res.status(400).json({ code: "INVALID_PAYPAL_ID" });
  }

  await updateAffiliate(affiliateId, {
    payPalId,
  });
  return res.status(200).json({ payPalId });
};

const handleUpdateEmail = async (
  affiliateId: string,
  emailRaw: unknown,
  res: NextApiResponse
) => {
  const email = asTrimmedString(emailRaw).toLowerCase();
  if (!isValidEmail(email)) {
    return res.status(400).json({ code: "INVALID_EMAIL" });
  }

  const existingEmailDoc = await findAffiliateByField("email", email);
  if (existingEmailDoc && existingEmailDoc.id !== affiliateId) {
    return res.status(409).json({ code: "EMAIL_EXISTS" });
  }

  await updateAffiliate(affiliateId, {
    email,
  });
  return res.status(200).json({ email });
};

const handleUpdatePassword = async (
  affiliateId: string,
  currentPassword: string,
  oldPasswordRaw: unknown,
  newPasswordRaw: unknown,
  confirmPasswordRaw: unknown,
  res: NextApiResponse
) => {
  const oldPassword = String(oldPasswordRaw ?? "");
  const newPassword = String(newPasswordRaw ?? "");
  const confirmPassword = String(confirmPasswordRaw ?? "");

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ code: "PASSWORD_MISMATCH" });
  }
  if (newPassword.length < 8 || newPassword.length > 40) {
    return res.status(400).json({ code: "INVALID_PASSWORD" });
  }

  const verification = verifyAffiliatePassword(currentPassword, oldPassword);
  if (!verification.valid) {
    return res.status(401).json({ code: "OLD_PASSWORD_INVALID" });
  }

  await updateAffiliate(affiliateId, {
    password: hashPassword(newPassword),
  });
  return res.status(200).json({ ok: true });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ code: "METHOD_NOT_ALLOWED" });
  }

  const session = getAffiliateSession(req);
  if (!session?.id) {
    return res.status(401).json({ code: "UNAUTHORIZED" });
  }

  try {
    const affiliate = (await getAffiliateById(session.id)) as
      | { password?: string }
      | null;
    if (!affiliate) {
      clearAffiliateSessionCookie(res);
      return res.status(401).json({ code: "UNAUTHORIZED" });
    }

    const action = String(req.body?.action ?? "");

    if (action === "updateCoupon") {
      return handleUpdateCoupon(session.id, req.body?.coupon, res);
    }

    if (action === "updatePayPalId") {
      return handleUpdatePayPal(session.id, req.body?.payPalId, res);
    }

    if (action === "updateEmail") {
      return handleUpdateEmail(session.id, req.body?.email, res);
    }

    if (action === "updatePassword") {
      return handleUpdatePassword(
        session.id,
        affiliate?.password ?? "",
        req.body?.oldPassword,
        req.body?.newPassword,
        req.body?.confirmPassword,
        res
      );
    }

    if (action === "deleteAccount") {
      await deleteAffiliate(session.id);
      clearAffiliateSessionCookie(res);
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ code: "INVALID_ACTION" });
  } catch (error) {
    return respondInternalError(
      res,
      "affiliate profile mutation failed",
      error
    );
  }
}
