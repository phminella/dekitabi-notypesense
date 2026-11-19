import { ShopSignUpStyles } from "./styles/ShopSignUpStyles";
import Image from "next/legacy/image";
import TextField from "@mui/material/TextField";
import useUser from "../../lib/useUser";
import { useRouter } from "next/router";
import Link from "next/link";
import Spinner from "../UI/Spinner";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
const ShopSignIn = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state?.app?.user);
  const { loading, complete, error, resetPassword } = useUser();
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(true);
  const [newAccount, setNewAccount] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    resetPassword(email).catch((err) => console.log(err));
  };
  useEffect(() => {
    if (user) {
      if (user?.shopId) {
        router.push(`/shop/${user?.url}`).then(() => {
          router.reload();
        });
      } else if (user?.uid && !user?.shopId) {
        setNewAccount(true);
        setFormLoading(false);
      } else {
        setFormLoading(false);
      }
    }
  }, [user]);
  if (formLoading) return <Spinner />;
  if (newAccount)
    return (
      <ShopSignUpStyles>
        <div className="create-new">
          {t("shops:createNewAccount", {
            type: user?.guide === "true" ? "guide" : "traveler",
          })}
        </div>
      </ShopSignUpStyles>
    );
  return (
    <ShopSignUpStyles>
      <Image
        src="/img/logo.png"
        height={45}
        width={141}
        alt="dekitabi-logo"
        priority={true}
        className="dekitabi-logo"
      />
      <div className="wrapper">
        <div className="sign-title-wrapper">
          <div className="sign-title">
            <h2>{t("resetPassword")}</h2>
            <p className="alternative">
              {t("dontHaveAccount")}{" "}
              <Link className="link" href={`/shop/sign-up`} prefetch={false}>
                {t("signUp")}!
              </Link>
            </p>
          </div>
        </div>
        <div className="sign-form">
          <form onSubmit={handleSubmit}>
            <fieldset disabled={loading} aria-busy={loading}>
              {/* // shop */}
              <div className="mui-input-wrapper">
                <TextField
                  name="email"
                  label={t("email")}
                  placeholder={t("emailPlaceholder")}
                  variant="filled"
                  color="secondary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={80}
                  minLength={6}
                  type="email"
                  required
                />
              </div>
              {error && <p className="error-message">&#9940;{t(error)}</p>}
              {!loading && (
                <button className="submit-button normal-button" type="submit">
                  {t("requestReset")}
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
              {complete && (
                <p>
                  {t("linkSent")} (<b>{email}</b>)
                </p>
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </ShopSignUpStyles>
  );
};
export default ShopSignIn;
