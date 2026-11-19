import { AccountEmailStyles } from "./styles/AccountEmailStyles";
import { useState } from "react";
import useUser from "../../../lib/useUser";
import useForm from "../../../lib/useForm";
import Image from "next/legacy/image";
import TextField from "@mui/material/TextField";
const AccountEmail = ({ user, t, provider }) => {
  const { updateAuthEmail, error } = useUser();
  const { validEmail } = useForm();
  const [email, setEmail] = useState({
    email: "",
    confirmEmail: "",
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [saved, setSaved] = useState(false);
  const [emailMatches, setEmailMatches] = useState(true);
  const [loading, setLoading] = useState(false);
  const updateEmail = async (e) => {
    e.preventDefault();
    setEmailMatches(true);
    setLoading(true);
    if (email.email === email.confirmEmail) {
      updateAuthEmail(email.email, password)
        .then(() => {
          setEditEmail(false);
          setSaved(true);
          setPassword("");
          setEmail({
            email: "",
            confirmEmail: "",
          });
          setLoading(false);
          setTimeout(() => {
            setSaved(false);
          }, 2000);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setEmailMatches(false);
      setLoading(false);
    }
  };
  return (
    <AccountEmailStyles>
      <div className="login-menu">
        <h3>{t("changeEmail")}</h3>
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        {!editEmail && (
          <button onClick={() => setEditEmail(true)}>{t("edit")}</button>
        )}
        {editEmail && (
          <button
            onClick={() => {
              setEditEmail(false);
              setPassword("");
              setEmail({
                email: "",
                confirmEmail: "",
              });
            }}
          >
            {t("cancel")}
          </button>
        )}
      </div>
      {!editEmail && <div className="name">{user?.email}</div>}
      {editEmail && (
        <form onSubmit={updateEmail}>
          {/* // Email */}
          <div className="mui-input-wrapper">
            <TextField
              name="email"
              type="email"
              label={t("newEmail")}
              placeholder={t("newEmailInput")}
              variant="filled"
              color="secondary"
              error={!validEmail(email.email)}
              className={!validEmail(email.email) ? "error-input" : ""}
              value={email.email}
              onChange={(e) => setEmail({ ...email, email: e.target.value })}
              maxLength={80}
              minLength={6}
              required
            />
            {!validEmail(email.email) && (
              <p className="error-message"> &#9940;{t("emailInvalid")} </p>
            )}
          </div>
          {/* //Confirm Email */}
          <div className="mui-input-wrapper">
            <TextField
              name="confirm-password"
              type="email"
              label={t("confirmNewEmail")}
              placeholder={t("confirmNewEmailInput")}
              variant="filled"
              color="secondary"
              error={!validEmail(email.confirmEmail)}
              className={!validEmail(email.confirmEmail) ? "error-input" : ""}
              value={email.confirmEmail}
              onChange={(e) =>
                setEmail({ ...email, confirmEmail: e.target.value })
              }
              maxLength={80}
              minLength={6}
              required
            />
            {!validEmail(email.confirmEmail) && (
              <p className="error-message"> &#9940;{t("emailInvalid")} </p>
            )}
          </div>
          {!emailMatches && (
            <p className="error-message">&#9940;{t("emailsNotSame")}</p>
          )}
          {provider === "password" && (
            <div className="password-wrapper">
              {/* // Password */}
              <div className="mui-input-wrapper">
                <TextField
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label={t("password")}
                  placeholder={t("passwordInput")}
                  variant="filled"
                  color="secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={40}
                  minLength={8}
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={showPassword ? "active" : ""}
              >
                <Image
                  src="/img/icon-view.svg"
                  height={20}
                  width={20}
                  alt="show-password"
                />
              </button>
            </div>
          )}
          {error && <p className="error">&#9940;{error}</p>}
          <div className="edit-buttons">
            <button
              className="normal-button"
              type="button"
              onClick={() => {
                setEditEmail(false);
                setPassword("");
                setEmail({
                  email: "",
                  confirmEmail: "",
                });
              }}
            >
              {t("cancel")}
            </button>{" "}
            {loading ? (
              <div className="normal-button">
                <Image
                  height={30}
                  width={30}
                  src="/img/icon-spinner.svg"
                  alt="spinner"
                ></Image>
              </div>
            ) : (
              <button className="normal-button" type="submit">
                {t("save")}
              </button>
            )}
          </div>
        </form>
      )}
    </AccountEmailStyles>
  );
};
export default AccountEmail;
