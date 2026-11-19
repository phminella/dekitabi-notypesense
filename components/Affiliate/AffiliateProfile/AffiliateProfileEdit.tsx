import type { HttpsCallable } from "firebase/functions";
import type { Affiliate } from "../../../types/Affiliate/AffiliateProfile";
import type { NextRouter } from "next/router";
import type SetState from "../../../types/helpers";
import { AffiliateProfileEditStyles } from "./styles/AffiliateProfileEditStyles";
import BasicModal from "../../UI/BasicModal";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  clearAffiliateSessionToken,
  withAffiliateSessionHeaders,
} from "../../../lib/affiliateSessionClient";

const AffiliateProfileEdit: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
  deleteStripeAccount: HttpsCallable<string, void>;
  affiliate: Affiliate;
  setAffiliate: SetState<Affiliate | undefined>;
  router: NextRouter;
}> = ({ t, deleteStripeAccount, affiliate, setAffiliate, router }) => {
  const tAffiliate = (key: string) => t(`affiliate:${key}`);
  const [showDelete, setShowDelete] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);

  const [couponSaved, setCouponSaved] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [coupon, setCoupon] = useState(affiliate?.coupon || "");
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");

  const [payPalIdSaved, setPayPalIdSaved] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);
  const [payPalId, setPayPalId] = useState(affiliate?.payPalId || "");
  const [loadingPayPal, setLoadingPayPal] = useState(false);
  const [payPalError, setPayPalError] = useState("");

  const [emailSaved, setEmailSaved] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState(affiliate?.email || "");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [passwordSaved, setPasswordSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const postProfileAction = async (action: string, payload: Record<string, unknown> = {}) => {
    const response = await fetch("/api/affiliate/profile", {
      method: "POST",
      headers: withAffiliateSessionHeaders({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        action,
        ...payload,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (data?.code === "UNAUTHORIZED") {
        clearAffiliateSessionToken();
      }
      throw new Error(String(data?.code || "INTERNAL_ERROR"));
    }
    return data;
  };

  const cancel = async () => {
    setLoadingCancel(true);
    try {
      if (affiliate?.stripeAccountId) {
        try {
          await deleteStripeAccount(affiliate?.stripeAccountId);
        } catch (err) {
          console.log(err);
        }
      }
      await postProfileAction("deleteAccount");
      await router.push("/affiliate-program");
    } catch (err) {
      console.log(err);
      setLoadingCancel(false);
    }
  };

  const editCoupon: (e: React.FormEvent<HTMLFormElement>) => void = async (
    e
  ) => {
    e.preventDefault();
    setLoadingCoupon(true);
    setCouponError("");
    try {
      await postProfileAction("updateCoupon", { coupon });
      setAffiliate((prev) => (prev ? { ...prev, coupon } : prev));
      setShowCoupon(false);
      setCouponSaved(true);
      setTimeout(() => {
        setCouponSaved(false);
      }, 2500);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "COUPON_EXISTS") {
        setCouponError("errorCoupon");
      } else {
        setCouponError("somethingWrong");
      }
    } finally {
      setLoadingCoupon(false);
    }
  };

  const editPayPal: (e: React.FormEvent<HTMLFormElement>) => void = async (
    e
  ) => {
    e.preventDefault();
    setLoadingPayPal(true);
    setPayPalError("");
    try {
      await postProfileAction("updatePayPalId", { payPalId });
      setAffiliate((prev) => (prev ? { ...prev, payPalId } : prev));
      setShowPayPal(false);
      setPayPalIdSaved(true);
      setTimeout(() => {
        setPayPalIdSaved(false);
      }, 2500);
    } catch (err: unknown) {
      setPayPalError("somethingWrong");
      console.log(err);
    } finally {
      setLoadingPayPal(false);
    }
  };

  const editEmail: (e: React.FormEvent<HTMLFormElement>) => void = async (
    e
  ) => {
    e.preventDefault();
    setLoadingEmail(true);
    setEmailError("");
    try {
      await postProfileAction("updateEmail", { email });
      setAffiliate((prev) => (prev ? { ...prev, email } : prev));
      setShowEmail(false);
      setEmailSaved(true);
      setTimeout(() => {
        setEmailSaved(false);
      }, 2500);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "EMAIL_EXISTS") {
        setEmailError("errorEmail");
      } else {
        setEmailError("somethingWrong");
      }
    } finally {
      setLoadingEmail(false);
    }
  };

  const editPassword: (e: React.FormEvent<HTMLFormElement>) => void = async (
    e
  ) => {
    e.preventDefault();
    setLoadingPassword(true);
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("passwordError");
      setLoadingPassword(false);
      return;
    }

    try {
      await postProfileAction("updatePassword", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      setShowPassword(false);
      setPasswordSaved(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setPasswordSaved(false);
      }, 2500);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "OLD_PASSWORD_INVALID") {
        setPasswordError("passwordError2");
      } else if (err instanceof Error && err.message === "PASSWORD_MISMATCH") {
        setPasswordError("passwordError");
      } else {
        setPasswordError("somethingWrong");
      }
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <AffiliateProfileEditStyles>
      <p className="title">{t("affiliate:editInfo")}</p>
      <Link
        className="link title-link"
        href={`/affiliate/${affiliate?.id}`}
        prefetch={false}
      >
        {t("affiliate:goBack")}
      </Link>
      <div className="form-wrapper">
        <div className="info-wrapper">
          <div className="info-title">{t("affiliate:editInfo")}</div>
          {!showCoupon ? (
            <>
              <div className="info-grid">
                <p>
                  {affiliate?.coupon
                    ? affiliate?.coupon
                    : t("affiliate:addCoupon")}
                </p>
                <button className="link" onClick={() => setShowCoupon(true)}>
                  {affiliate?.coupon ? t("affiliate:edit") : t("affiliate:add")}
                </button>
              </div>
              {couponSaved && <p className="saved">{t("affiliate:saved")}</p>}
            </>
          ) : (
            <form onSubmit={editCoupon}>
              <div className="form-grid">
                <input
                  type="text"
                  name="coupon"
                  id="coupon"
                  placeholder={t("affiliate:addCoupon")}
                  value={coupon}
                  autoComplete="off"
                  onChange={(e) => {
                    if (couponError) {
                      setCouponError("");
                    }
                    setCoupon(e?.target.value);
                  }}
                  disabled={loadingCoupon}
                  minLength={5}
                  maxLength={10}
                  required
                />
                <button className="normal-button">
                  {loadingCoupon ? (
                    <Image
                      src="/img/icon-spinner.svg"
                      alt="spinner"
                      height={25}
                      width={25}
                    />
                  ) : (
                    <Image
                      src="/img/icon-check.svg"
                      alt="close"
                      height={15}
                      width={15}
                    />
                  )}
                </button>
                <button
                  type="button"
                  className="normal-button"
                  onClick={() => {
                    setShowCoupon(false);
                    setCouponError("");
                    setCoupon(affiliate?.coupon || "");
                  }}
                >
                  <Image
                    src="/img/icon-close.svg"
                    alt="close"
                    height={18}
                    width={18}
                  />
                </button>
              </div>
              {couponError && (
                <p className="error-message">&#9940;{tAffiliate(couponError)}</p>
              )}
            </form>
          )}
        </div>
      </div>
      {!affiliate?.stripeAccountId && (
        <div className="form-wrapper">
          <div className="info-wrapper">
            <div className="info-title">{t("affiliate:payPalId")}</div>
            {!showPayPal ? (
              <>
                <div className="info-grid">
                  <p>
                    {affiliate?.payPalId
                      ? affiliate?.payPalId
                      : t("affiliate:addPayPal2")}
                  </p>
                  <button className="link" onClick={() => setShowPayPal(true)}>
                    {affiliate?.payPalId
                      ? t("affiliate:edit")
                      : t("affiliate:add")}
                  </button>
                </div>
                {payPalIdSaved && (
                  <p className="saved">{t("affiliate:saved")}</p>
                )}
              </>
            ) : (
              <form onSubmit={editPayPal}>
                <div className="form-grid">
                  <input
                    type="text"
                    name="payPal"
                    id="payPal"
                    placeholder={t("affiliate:addPayPal2")}
                    value={payPalId}
                    autoComplete="off"
                    onChange={(e) => {
                      if (payPalError) {
                        setPayPalError("");
                      }
                      setPayPalId(e?.target.value);
                    }}
                    disabled={loadingPayPal}
                    minLength={3}
                    maxLength={30}
                    required
                  />
                  <button className="normal-button">
                    {loadingPayPal ? (
                      <Image
                        src="/img/icon-spinner.svg"
                        alt="spinner"
                        height={25}
                        width={25}
                      />
                    ) : (
                      <Image
                        src="/img/icon-check.svg"
                        alt="close"
                        height={15}
                        width={15}
                      />
                    )}
                  </button>
                  <button
                    type="button"
                    className="normal-button"
                    onClick={() => {
                      setShowPayPal(false);
                      setPayPalError("");
                      setPayPalId(affiliate?.payPalId || "");
                    }}
                  >
                    <Image
                      src="/img/icon-close.svg"
                      alt="close"
                      height={18}
                      width={18}
                    />
                  </button>
                </div>
                {payPalError && (
                  <p className="error-message">&#9940;{tAffiliate(payPalError)}</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
      <div className="form-wrapper">
        <div className="info-wrapper">
          <div className="info-title">{t("affiliate:emailAddress")}</div>
          {!showEmail ? (
            <>
              <div className="info-grid">
                <p>{affiliate?.email}</p>
                <button className="link" onClick={() => setShowEmail(true)}>
                  {t("affiliate:edit")}{" "}
                </button>
              </div>
              {emailSaved && <p className="saved">{t("affiliate:saved")}</p>}
            </>
          ) : (
            <form onSubmit={editEmail}>
              <div className="form-grid">
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder={t("affiliate:emailPlaceholder")}
                  value={email}
                  autoComplete="off"
                  onChange={(e) => {
                    if (emailError) {
                      setEmailError("");
                    }
                    setEmail(e?.target.value);
                  }}
                  disabled={loadingEmail}
                  minLength={5}
                  maxLength={40}
                  required
                />
                <button className="normal-button">
                  {loadingEmail ? (
                    <Image
                      src="/img/icon-spinner.svg"
                      alt="spinner"
                      height={25}
                      width={25}
                    />
                  ) : (
                    <Image
                      src="/img/icon-check.svg"
                      alt="close"
                      height={15}
                      width={15}
                    />
                  )}
                </button>
                <button
                  type="button"
                  className="normal-button"
                  onClick={() => {
                    setShowEmail(false);
                    setEmailError("");
                    setEmail(affiliate?.email || "");
                  }}
                >
                  <Image
                    src="/img/icon-close.svg"
                    alt="close"
                    height={18}
                    width={18}
                  />
                </button>
              </div>
              {emailError && (
                <p className="error-message">&#9940;{tAffiliate(emailError)}</p>
              )}
            </form>
          )}
        </div>
      </div>
      <div className="form-wrapper">
        <div className="info-wrapper">
          <div className="info-title">{t("affiliate:password")}</div>
          {!showPassword ? (
            <>
              <div className="info-grid">
                <p>**********</p>
                <button className="link" onClick={() => setShowPassword(true)}>
                  {t("affiliate:edit")}
                </button>
              </div>
              {passwordSaved && <p className="saved">{t("affiliate:saved")}</p>}
            </>
          ) : (
            <form onSubmit={editPassword}>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder={t("affiliate:currentPasswordPlaceholder")}
                value={oldPassword}
                autoComplete="off"
                onChange={(e) => {
                  if (passwordError) {
                    setPasswordError("");
                  }
                  setOldPassword(e?.target.value);
                }}
                disabled={loadingPassword}
                minLength={8}
                maxLength={40}
                required
                className="password"
              />
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder={t("affiliate:newPasswordPlaceholder")}
                value={newPassword}
                autoComplete="off"
                className="password"
                onChange={(e) => {
                  if (passwordError) {
                    setPasswordError("");
                  }
                  setNewPassword(e?.target.value);
                }}
                disabled={loadingPassword}
                minLength={8}
                maxLength={40}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder={t("affiliate:confirmPasswordPlaceholder")}
                value={confirmPassword}
                autoComplete="off"
                onChange={(e) => {
                  if (passwordError) {
                    setPasswordError("");
                  }
                  setConfirmPassword(e?.target.value);
                }}
                disabled={loadingPassword}
                minLength={8}
                maxLength={40}
                required
                className="password"
              />
              {passwordError && (
                <p className="error-message">&#9940;{tAffiliate(passwordError)}</p>
              )}
              <div className="password-buttons">
                <button
                  className="normal-button"
                  onClick={() => {
                    setShowPassword(false);
                    setConfirmPassword("");
                    setOldPassword("");
                    setNewPassword("");
                    setPasswordError("");
                  }}
                  type="button"
                  disabled={loadingPassword}
                >
                  {t("affiliate:cancel")}
                </button>
                <button className="normal-button">
                  {loadingPassword ? (
                    <Image
                      src="/img/icon-spinner.svg"
                      alt="spinner"
                      height={25}
                      width={25}
                    />
                  ) : (
                    <Image
                      src="/img/icon-check.svg"
                      alt="close"
                      height={15}
                      width={15}
                    />
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <BasicModal showModal={showDelete} setShowModal={setShowDelete}>
        <div style={{ paddingBottom: "15px" }}>
          <h3 className="modal-title">{t("affiliate:cancelAffiliation")}</h3>
          <p className="modal-message">{t("affiliate:cancelAffiliationMsg")}</p>
          <div className="modal-buttons">
            <button
              className="normal-button"
              onClick={() => setShowDelete(false)}
              disabled={loadingCancel}
            >
              {t("affiliate:no")}
            </button>{" "}
            {!loadingCancel ? (
              <button
                className="normal-button"
                onClick={() => {
                  cancel();
                }}
              >
                {t("affiliate:cancelAffiliation")}
              </button>
            ) : (
              <div className="fake-button">
                <Image
                  height={30}
                  width={30}
                  src="/img/icon-spinner.svg"
                  alt="spinner"
                />
              </div>
            )}
          </div>
        </div>
      </BasicModal>
      <button
        onClick={() => setShowDelete(true)}
        className="normal-button cancel"
      >
        {t("affiliate:cancelAffiliation")}
      </button>
    </AffiliateProfileEditStyles>
  );
};

export default AffiliateProfileEdit;
