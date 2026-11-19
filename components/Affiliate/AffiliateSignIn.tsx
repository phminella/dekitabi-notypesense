import { AffiliateSignUpStyles } from "./styles/AffiliateSignUpStyles";
import Image from "next/legacy/image";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import Link from "next/link";
import Spinner from "../UI/Spinner";
import { useState, useEffect, FormEvent, useCallback } from "react";
import {
  clearAffiliateSessionToken,
  setAffiliateSessionToken,
  withAffiliateSessionHeaders,
} from "../../lib/affiliateSessionClient";
const AffiliateSignIn: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
}> = ({ t }) => {
  const router = useRouter();
  const [wrongPassword, setWrongPassword] = useState(false);
  const [noAffiliate, setNoAffiliate] = useState(false);
  const [formInput, setFormInput] = useState({
    affiliateId: "",
    password: "",
  });
  const [loadingButton, setLoadingButton] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoadingButton(true);
      setWrongPassword(false);
      setNoAffiliate(false);

      try {
        const response = await fetch("/api/affiliate/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            affiliateId: formInput?.affiliateId,
            password: formInput?.password,
          }),
        });
        const data = await response.json().catch(() => ({}));

        if (response.ok && data?.id) {
          if (typeof data?.token === "string" && data.token) {
            setAffiliateSessionToken(data.token);
          }
          await router.push(`/affiliate/${String(data.id).toLowerCase()}`);
          return;
        }

        if (data?.code === "AFFILIATE_NOT_FOUND") {
          setNoAffiliate(true);
          setWrongPassword(false);
        } else if (data?.code === "INVALID_CREDENTIALS") {
          setWrongPassword(true);
          setNoAffiliate(false);
        } else {
          setNoAffiliate(true);
          setWrongPassword(false);
        }
      } catch (err) {
        console.error("affiliate signin failed", err);
        setNoAffiliate(true);
        setWrongPassword(false);
      } finally {
        setLoadingButton(false);
      }
    },
    [formInput?.affiliateId, formInput?.password, router]
  );

  const checkSession = useCallback(async () => {
    try {
      const response = await fetch("/api/affiliate/session", {
        headers: withAffiliateSessionHeaders(),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data?.authenticated && data?.id) {
        await router.push(`/affiliate/${String(data.id).toLowerCase()}`);
        return;
      }
      if (!data?.authenticated) {
        clearAffiliateSessionToken();
      }
    } catch (err) {
      console.error("affiliate session check failed", err);
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (loading) return <Spinner />;
  return (
    <AffiliateSignUpStyles>
      <div className="wrapper">
        <div className="sign-title-wrapper">
          <div className="sign-title">
            <h2>{t("affiliate:signIn")}</h2>
            <p className="alternative">
              {t("affiliate:noAccount")}{" "}
              <Link
                className="link"
                href={`/affiliate-program/sign-up`}
                prefetch={false}
              >
                {t("affiliate:signUp")}!
              </Link>
            </p>
          </div>
        </div>
        <div className="sign-form">
          <form onSubmit={handleSubmit}>
            <fieldset disabled={loadingButton} aria-busy={loadingButton}>
              {/* // Affiliate */}
              <div className="mui-input-wrapper">
                <TextField
                  name="email"
                  label={t("affiliate:affiliateId")}
                  placeholder={t("affiliate:affiliateIdSignUp")}
                  variant="filled"
                  color="secondary"
                  value={formInput.affiliateId}
                  onChange={(e) =>
                    setFormInput({ ...formInput, affiliateId: e.target.value })
                  }
                  inputProps={{
                    maxLength: 20,
                    minLength: 3,
                  }}
                  required
                />
              </div>
              {/* // Password */}
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
              {noAffiliate && (
                <p className="error-message">
                  &#9940;{t("affiliate:affiliateIdError2")}
                </p>
              )}
              {wrongPassword && (
                <p className="error-message">
                  &#9940;{t("affiliate:passwordError2")}
                </p>
              )}
              {!loadingButton && (
                <button className="submit-button normal-button" type="submit">
                  {t("affiliate:signIn")}
                </button>
              )}
              {loadingButton && (
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
          </form>{" "}
          <p className="alternative">
            {t("affiliate:forgotPassword")} <span>contact@dekitabi.com</span>
          </p>
        </div>
      </div>
    </AffiliateSignUpStyles>
  );
};
export default AffiliateSignIn;
