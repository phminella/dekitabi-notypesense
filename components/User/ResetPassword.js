import { SignInStyle } from "./styles/SignInStyle";
import { useState } from "react";
import useForm from "../../lib/useForm";
import Image from "next/image";
import useUser from "../../lib/useUser";
import TextField from "@mui/material/TextField";
const ResetPassword = ({ setAction, t }) => {
  const { validEmail } = useForm();
  const { loading, complete, error, resetPassword } = useUser();
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    resetPassword(email);
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
          <h2>{t("resetPassword")}</h2>
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
          <fieldset
            disabled={loading || complete}
            aria-busy={loading || complete}
          >
            <div className="mui-input-wrapper">
              <TextField
                name="email"
                id="outlined-password-input"
                label={t("email")}
                placeholder={t("email")}
                variant="filled"
                color="secondary"
                error={!validEmail(email)}
                className={!validEmail(email) ? "error-input" : ""}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={80}
                minLength={6}
                autoComplete="email"
                required
              />
            </div>
            {!loading && (
              <button className="submit-button  normal-button" type="submit">
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
            {error && <p className="error-message">&#9940;{t(error)}</p>}
          </fieldset>
        </form>
      </div>
    </SignInStyle>
  );
};
export default ResetPassword;
