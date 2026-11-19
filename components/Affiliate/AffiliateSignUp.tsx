import useForm from "../../lib/useForm";
import { AffiliateSignUpStyles } from "./styles/AffiliateSignUpStyles";
import Image from "next/legacy/image";
import { useState, FormEvent } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  getFunctions,
  httpsCallable,
  HttpsCallable,
  HttpsCallableResult,
} from "firebase/functions";
import type {
  SendEmailRequest,
  SendEmailResponse,
  CreateStripeAccountRequest,
  CreateStripeAccountResponse,
} from "../../types/Affiliate/AffiliateSignUp";
import { setAffiliateSessionToken } from "../../lib/affiliateSessionClient";
const AffiliateSignUp: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
}> = ({ t }) => {
  let functions;
  let sendEmail: HttpsCallable<SendEmailRequest, SendEmailResponse> | null =
    null;
  let createStripeAccount: HttpsCallable<
    CreateStripeAccountRequest,
    CreateStripeAccountResponse
  > | null = null;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    sendEmail = httpsCallable(functions, "sendEmail");
    createStripeAccount = httpsCallable(functions, "createStripeAccount");
  } catch (err) {
    console.log(err);
  }
  const { validEmail } = useForm();
  const router = useRouter();
  const [withStripe, setWithStripe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [formInput, setFormInput] = useState({
    affiliateId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setConfirmError(false);
    setAlreadyExists(false);
    setEmailExists(false);
    if (formInput.password !== formInput.confirmPassword) {
      const confirmInput = document.getElementById(
        "confirmPassword"
      ) as HTMLInputElement | null;
      if (confirmInput) {
        confirmInput.focus();
      }
      setConfirmError(true);
      setLoading(false);
    } else {
      try {
        let stripeAccount: HttpsCallableResult<CreateStripeAccountResponse> | null =
          null;
        if (withStripe && createStripeAccount) {
          stripeAccount = await createStripeAccount({
            email: formInput?.email,
          });
        }

        const response = await fetch("/api/affiliate/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            affiliateId: formInput?.affiliateId?.toLowerCase(),
            email: formInput?.email,
            password: formInput?.password,
            withStripe,
            stripeAccountId: stripeAccount?.data?.id || "",
          }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          if (data?.code === "AFFILIATE_EXISTS") {
            setAlreadyExists(true);
          } else if (data?.code === "EMAIL_EXISTS") {
            setEmailExists(true);
          } else {
            setError(t("affiliate:somethingWrong"));
          }
          return;
        }
        if (typeof data?.token === "string" && data.token) {
          setAffiliateSessionToken(data.token);
        }

        if (sendEmail) {
          await sendEmail({
              to: formInput?.email,
              sender: "noreply@dekitabi.com",
              subject: `dekitabi | ${t("affiliate:emailTitle")}`,
              body: `<link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <div style="background:#f7f7f7; font-family: 'Poppins', sans-serif; font-size:15px">
            <div style="text-align: center; padding: 40px 0 20px 0">
              <img
                src="https://www.dekitabi.com/img/logo.png"
                height="45"
                width="141"
                alt="dekitabi"
              />
            </div>
            <section
              style="
                background: white;
                max-width: 600px;
                margin: 20px auto;
                border-top: 4px solid #03c03c;
                border-radius: 5px;
                padding: 20px;
                text-align: center;
                font-size:1.1em;
              "
            >
              <h1 style="color: #03c03c; margin: 0; font-size:2em;">
                 ${t("affiliate:thanksSignUp")}
              </h1>
              <h2>${t("affiliate:affiliateEmailSignUp1", {
                affiliateId: formInput?.affiliateId,
              })}</h2>
              <h3 style="font-size:2.5em; margin:15px 0 20px 0">${t(
                "affiliate:getReady"
              )}</h3>
              <p style="text-align:left">
              ${
                withStripe
                  ? t("affiliate:emailSignUpStripe")
                  : t("affiliate:emailSignUpPayPal")
              }
                   
              <p style="margin:15px 0; font-size:1.2em; font-weight: bold; text-align: left; color:#fc0165">${t(
                "affiliate:affiliateEmailSignUp2",
                {
                  affiliateId: formInput.affiliateId,
                }
              )}</p>
              <p style="margin: 0 0 20px 0; text-align: left">
               ${t("affiliate:affiliateEmailSignUp3")}
                </p>
                <ul style="text-align:left">
                 <li>
               ${t("affiliate:affiliateEmailSignUp4")}</li>
                  <li>
               ${t("affiliate:affiliateEmailSignUp5")}</li>
                  <li>
               ${t("affiliate:affiliateEmailSignUp6")}</li>
                  <li>
               ${t("affiliate:affiliateEmailSignUp7")}</li>
                </ul>
                <p style="text-align: left"
               ${t("affiliate:affiliateEmailSignUp8")}></p>
    <ul
      style="
        margin: 0;
        list-style: none;
        display: block;
        text-align: left;
        padding: 0;
      "
    >
      <li style="display: inline; margin-left: 5px">
        <a
          href="https://www.instagram.com/dekitabi"
          target="_blank"
          rel="noreferrer"
          style="text-decoration: none"
        >
          <img
            src="https://www.dekitabi.com/img/icon-instagram.png"
            alt="instagram"
            height="20"
            width="20"
          />
        </a>
      </li>
      <li style="display: inline; margin-left: 5px">
        <a
          href="https://www.facebook.com/dekitabi"
          target="_blank"
          rel="noreferrer"
          style="text-decoration: none"
        >
          <img
            src="https://www.dekitabi.com/img/icon-facebook.png"
            alt="facebook"
            height="20"
            width="20"
          />
        </a>
      </li>
      <li style="display: inline; margin-left: 5px">
        <a
          href="https://www.threads.net/@dekitabi"
          target="_blank"
          rel="noreferrer"
          style="text-decoration: none"
        >
          <img
            src="https://www.dekitabi.com/img/icon-threads.png"
            alt="threads"
            height="20"
            width="20"
          />
        </a>
      </li>
      <li style="display: inline; margin-left: 5px">
        <a
          href="https://www.twitter.com/dekitabi"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://www.dekitabi.com/img/icon-twitter.png"
            alt="twitter"
            height="20"
            width="20"
          />
        </a>
      </li>
    </ul>
    <p style="margin: 20px 0 20px 0; text-align: left">
      ${t("affiliate:affiliateEmailSignUp9")}
    </p>
            </section>      
            <section
            style="
              max-width: 600px;
              margin: 0 auto;
              position: relative;
              padding: 0 10px;
            "
          >
            <div>
              <img src="https://www.dekitabi.com/img/logo.png" height="30" width="90" />
              <ul style="margin: 10px 0 0 0; list-style: none; float: right; display: block">
                <li style="display: inline; margin-left:5px">
                  <a
                    href="https://www.instagram.com/dekitabi"
                    target="_blank"
                    rel="noreferrer"
                    style="text-decoration:none"
                  >
                    <img
                      src="https://www.dekitabi.com/img/icon-instagram.png"
                      alt="instagram"
                      height="20"
                      width="20"
                    />
                  </a>
                </li>
                <li style="display: inline; margin-left:5px">
                  <a
                    href="https://www.facebook.com/dekitabi"
                    target="_blank"
                    rel="noreferrer"
                    style="text-decoration:none"
                  >
                    <img
                      src="https://www.dekitabi.com/img/icon-facebook.png"
                      alt="facebook"
                      height="20"
                      width="20"
                    />
                  </a>
                </li>
                <li style="display: inline; margin-left:5px">
                  <a
                    href="https://www.threads.net/@dekitabi"
                    target="_blank"
                    rel="noreferrer"
                    style="text-decoration:none"
                  >
                    <img
                      src="https://www.dekitabi.com/img/icon-threads.png"
                      alt="threads"
                      height="20"
                      width="20"
                    />
                  </a>
                </li>
                <li style="display: inline; margin-left:5px">
                  <a
                    href="https://www.twitter.com/dekitabi"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://www.dekitabi.com/img/icon-twitter.png"
                      alt="twitter"
                      height="20"
                      width="20"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <p style="font-size: 0.8em">
              〒160-0023<br />
              東京都新宿区西新宿三丁目3番13号　西新宿水間ビル6階.
            </p>
            <div>
              <a
                href="https://play.google.com/store/apps/details?id=com.dekitabi"
                target="_blank"
                rel="noreferrer"
                style="margin-right: 5px; text-decoration:none"
              >
                <img
                  src="https://www.dekitabi.com/img/icon-googleplay.png"
                  alt="open"
                  width="100"
                  height="29"
                />
              </a>
              <a
                href="https://appgallery.huawei.com/#/app/C110443229"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://www.dekitabi.com/img/icon-huawei.png"
                  alt="open"
                  width="100"
                  height="29"
                />
              </a>
            </div>
          </section>
            <p
              style="
                margin: 25px 0 0 0;
                color: #adadad;
                padding: 20px 0;
                border-top: 1px solid #adadad;
                font-size: 10px;
                background: white;
                text-align: center;
              "
            >
            
               ${t("affiliate:affiliateEmailSignUp10")} 
            </p>
          </div>`,
          });
        }

        await router.push(`/affiliate/${formInput?.affiliateId.toLowerCase()}`);
      } catch (err) {
        console.log(err);
        setError(t("affiliate:somethingWrong"));
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <AffiliateSignUpStyles>
      <div className="wrapper">
        <div className="sign-title-wrapper">
          <div className="sign-title">
            <h2>{t("affiliate:signUp")}</h2>
            <p className="alternative">
              {t("affiliate:alreadySignedUp")}{" "}
              <Link
                className="link"
                href={`/affiliate-program/sign-in`}
                prefetch={false}
              >
                {t("affiliate:signIn")}!
              </Link>
            </p>
          </div>
        </div>
        <div className="sign-form">
          <form onSubmit={handleSubmit}>
            <fieldset disabled={loading} aria-busy={loading}>
              {/* // Affiliate */}
              <div className="mui-input-wrapper">
                <TextField
                  name="email"
                  label={t("affiliate:affiliateId")}
                  placeholder={t("affiliate:affiliateIdPlaceholder")}
                  variant="filled"
                  color="secondary"
                  error={!validEmail(formInput.affiliateId)}
                  className={
                    !validEmail(formInput.affiliateId) ? "error-input" : ""
                  }
                  value={formInput.affiliateId}
                  onChange={(e) => {
                    if (!/[^a-zA-Z0-9]/.test(e.target.value)) {
                      setFormInput({
                        ...formInput,
                        affiliateId: e.target.value,
                      });
                    }
                  }}
                  inputProps={{ maxLength: 25, minLength: 4 }}
                  required
                />
              </div>
              {/* // Email */}
              <div className="mui-input-wrapper">
                <TextField
                  name="email"
                  label={t("affiliate:email")}
                  placeholder={t("affiliate:emailPlaceholder")}
                  variant="filled"
                  color="secondary"
                  error={!validEmail(formInput.email)}
                  className={!validEmail(formInput.email) ? "error-input" : ""}
                  value={formInput.email}
                  onChange={(e) =>
                    setFormInput({ ...formInput, email: e.target.value })
                  }
                  required
                />
              </div>
              {/* // Password */}
              <div className="two-columns-wrapper">
                <div className="mui-input-wrapper">
                  <TextField
                    name="password"
                    label={t("affiliate:password")}
                    placeholder={t("affiliate:passwordPlaceholder")}
                    variant="filled"
                    color="secondary"
                    type="password"
                    value={formInput.password}
                    onChange={(e) =>
                      setFormInput({ ...formInput, password: e.target.value })
                    }
                    inputProps={{
                      maxLength: 40,
                      minLength: 8,
                    }}
                    required
                  />
                </div>
                {/* // Confirm Password */}
                <div className="mui-input-wrapper">
                  <TextField
                    name="confirm-password"
                    id="confirmPassword"
                    label={t("affiliate:confirmPassword")}
                    placeholder={t("affiliate:confirmPasswordPlaceholder")}
                    variant="filled"
                    color="secondary"
                    type="password"
                    error={
                      formInput.confirmPassword !== formInput.password &&
                      formInput.confirmPassword.length > 0
                    }
                    className={
                      formInput.confirmPassword !== formInput.password &&
                      formInput.confirmPassword.length > 0
                        ? "error-input"
                        : ""
                    }
                    value={formInput.confirmPassword}
                    onChange={(e) => {
                      if (e.target.value === formInput?.password) {
                        setConfirmError(false);
                      }
                      setFormInput({
                        ...formInput,
                        confirmPassword: e.target.value,
                      });
                    }}
                    inputProps={{
                      maxLength: 40,
                      minLength: 8,
                    }}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              <div className="checkbox-wrapper">
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{
                        transform: "scale(1.5)",
                      }}
                      checked={withStripe}
                      onChange={() => setWithStripe(!withStripe)}
                      sx={{
                        color: "var(--pink)",
                        "&.Mui-checked": {
                          color: "var(--pink)",
                        },
                      }}
                    />
                  }
                  label={t("affiliate:liveJapan")}
                />
              </div>
              {error && <p className="error-message">&#9940;{error}</p>}
              {alreadyExists && (
                <p className="error-message">
                  &#9940;{t("affiliate:affiliateIdError")}
                </p>
              )}
              {emailExists && (
                <p className="error-message">
                  &#9940;{t("affiliate:emailError")}
                </p>
              )}
              {confirmError && (
                <p className="error-message">
                  &#9940;{t("affiliate:passwordError")}
                </p>
              )}
              {!loading && (
                <button className="submit-button normal-button" type="submit">
                  {t("affiliate:signUp")}
                </button>
              )}
              {loading && (
                <div className="submit-spinner normal-button">
                  <Image
                    src="/img/icon-spinner-white.svg"
                    alt="spinner"
                    height={40}
                    width={40}
                  />
                </div>
              )}
            </fieldset>
          </form>
          <div className="privacy-policy">{t("affiliate:affiliateTerms")}</div>
        </div>
      </div>
    </AffiliateSignUpStyles>
  );
};
export default AffiliateSignUp;
