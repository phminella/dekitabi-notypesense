import { ConfirmationSignUpStyles } from "./styles/ConfirmationSignUpStyles";
import Image from "next/image";
import { TextField } from "@mui/material";
const ConfirmationSignUp = ({
  signUpTab,
  setSignUpTab,
  t,
  formInput,
  setFormInput,
}) => {
  return (
    <ConfirmationSignUpStyles className="checkout-signup">
      <div className="tab-wrapper">
        {" "}
        <button
          className={`email ${signUpTab === "email" ? "active" : ""}`}
          onClick={() => setSignUpTab("email")}
        >
          <Image src="/img/icon-email.svg" alt="email" height={13} width={20} />
          <span className="signin-button-text">{t("signUpWithEmail")}</span>
        </button>
        <button
          className={signUpTab === "Google" ? "active" : ""}
          onClick={() => setSignUpTab("Google")}
        >
          <Image
            src="/img/icon-google.svg"
            alt="google"
            height={17}
            width={17}
          />
          <span className="signin-button-text">{t("signUpWithGmail")}</span>
        </button>
      </div>
      {signUpTab === "email" && (
        <div className="form-wrapper">
          {/* // Email */}
          <div className="mui-input-wrapper">
            <TextField
              type="email"
              name="email"
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              variant="filled"
              color="secondary"
              value={formInput.email}
              onChange={(e) => {
                setFormInput({ ...formInput, email: e.target.value });
              }}
              required
            />
          </div>
          {/* // Password */}
          <div className="two-columns-wrapper">
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
            {/* // Confirm Password */}
            <div className="mui-input-wrapper">
              <TextField
                name="confirm-password"
                id="confirmPassword"
                label={t("confirmPassword")}
                placeholder={t("confirmPasswordPlaceholder")}
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
                  setFormInput({
                    ...formInput,
                    confirmPassword: e.target.value,
                  });
                }}
                maxLength={40}
                minLength={8}
                autoComplete="email"
                required
              />
            </div>
          </div>
        </div>
      )}
    </ConfirmationSignUpStyles>
  );
};
export default ConfirmationSignUp;
