import { SignInStyle } from "./styles/SignInStyle";
import useForm from "../../lib/useForm";
import Image from "next/legacy/image";
import useUser from "../../lib/useUser";
import { setShowLogin } from "../../store/appSlice";
import TextField from "@mui/material/TextField";
import { useState } from "react";
const SignIn = ({ setAction, dispatch, t, isiOS }) => {
  const { federatedSignIn, signIn, loading, error } = useUser();
  const { validEmail } = useForm();
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    guide: false,
  }); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn(formInput.email, formInput.password)
      .then(() => {
        dispatch(setShowLogin(false));
        setFormInput({ email: "", password: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFederated = async (provider) => {
    federatedSignIn(provider, formInput.guide)
      .then(() => {
        dispatch(setShowLogin(false));
        setFormInput({ email: "", password: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SignInStyle>
      <div className="sign-title-wrapper">
        <div className="sign-title">
          <Image
            src="/img/logo.png"
            height={51}
            width={154}
            alt="logo"
            className="logo"
          />
          <h2>{t("signIn")}</h2>
          <p className="alternative">
            {t("dontHaveAccount")}
            <button
              onClick={() => setAction("signup")}
              className="alternative-button"
            >
              {t("signUp")}!
            </button>{" "}
          </p>
        </div>
      </div>
      <div className="sign-form">
        <form onSubmit={handleSubmit}>
          <fieldset disabled={loading} aria-busy={loading}>
            <div className="mui-input-wrapper">
              <TextField
                name="email"
                type="email"
                label={t("email")}
                placeholder={t("email")}
                variant="filled"
                color="secondary"
                error={!validEmail(formInput.email)}
                className={!validEmail(formInput.email) ? "error-input" : ""}
                value={formInput.email}
                onChange={(e) =>
                  setFormInput({ ...formInput, email: e.target.value })
                }
                maxLength={80}
                minLength={6}
                required
                autoComplete="email"
              />
            </div>
            {/* // Password */}
            <div className="mui-input-wrapper">
              <TextField
                name="password"
                label={t("password")}
                placeholder={t("password")}
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
            {typeof navigator !== "undefined" && (
              <>
                {!navigator?.cookieEnabled && (
                  <p className="warning-message">
                    <Image
                      src="/img/icon-alert.svg"
                      alt="alert"
                      height={15}
                      width={15}
                    />
                    {t("enableCookiesSignIn")}
                  </p>
                )}
              </>
            )}
            {!loading && (
              <button className="submit-button normal-button" type="submit">
                {t("signIn")}
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
            {error && <p className="error-message">&#9940;{t(error)}</p>}
            <p style={{ margin: "5px 0" }}>
              {t("forgotPassword")}{" "}
              <button
                className="link-button"
                onClick={() => setAction("resetpassword")}
              >
                {t("resetPassword")}
              </button>
            </p>
          </fieldset>
        </form>
        {typeof navigator !== "undefined" && (
          <>
            {(!navigator.userAgent.includes("PWAShell") || !isiOS()) && (
              <section id="OAuth-signup" className={true ? "is-ios" : ""}>
                {/* <button
                  onClick={() => handleFederated("Facebook")}
                  id="facebook-button"
                  type="button"
                >
                  <Image
                    src="/img/icon-facebook.svg"
                    alt="facebook"
                    height={25}
                    width={25}
                  />
                </button> */}
                <button
                  onClick={() => handleFederated("Google")}
                  id="gmail-button"
                  type="button"
                >
                  <Image
                    src="/img/icon-google.svg"
                    alt="google"
                    height={25}
                    width={25}
                  />
                </button>
                {true && (
                  <button
                    onClick={() => handleFederated("Apple")}
                    id="apple-button"
                    type="button"
                  >
                    <Image
                      src="/img/icon-apple.svg"
                      alt="apple"
                      height={25}
                      width={20}
                    />
                  </button>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </SignInStyle>
  );
};
export default SignIn;
