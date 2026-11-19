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
  const { signIn, loading, error } = useUser();
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(true);
  const [newAccount, setNewAccount] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    setSignInLoading(true);
    e.preventDefault();
    signIn(formInput.email, formInput.password)
      .then((data) => {
        if (!data) {
          setSignInLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setSignInLoading(false);
      });
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
            <h2>{t("signIn")}</h2>
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
                  value={formInput.email}
                  onChange={(e) =>
                    setFormInput({ ...formInput, email: e.target.value })
                  }
                  maxLength={20}
                  minLength={3}
                  required
                />
              </div>
              {/* // Password */}
              <div className="mui-input-wrapper">
                <TextField
                  name="password"
                  label={t("password")}
                  placeholder={t("passwordInput")}
                  variant="filled"
                  color="secondary"
                  type="password"
                  value={formInput.password}
                  onChange={(e) =>
                    setFormInput({ ...formInput, password: e.target.value })
                  }
                  maxLength={40}
                  minLength={8}
                  required
                />
              </div>
              {error && <p className="error-message">&#9940;{t(error)}</p>}
              {!loading && !signInLoading && (
                <button className="submit-button normal-button" type="submit">
                  {t("signIn")}
                </button>
              )}
              {(loading || signInLoading) && (
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
            {t("forgotPassword")}{" "}
            <Link href="/shop/reset-password" prefetch={false}>
              {t("clickHere")}
            </Link>
          </p>
        </div>
      </div>
    </ShopSignUpStyles>
  );
};
export default ShopSignIn;
