import { AccountPasswordStyles } from "./styles/AccountPasswordStyles";
import { useState } from "react";
import useUser from "../../../lib/useUser";
import Image from "next/legacy/image";
import TextField from "@mui/material/TextField";
const AccountPassword = ({ t, user, provider }) => {
  const { updateAuthPassword, error } = useUser();
  const [password, setPassword] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword0, setShowPassword0] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordMatches, setPasswordMatches] = useState(true);
  const updatePassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    setPasswordMatches(true);
    setShowPassword0(false);
    setShowPassword(false);
    setShowPassword2(false);
    if (password.password === password.confirmPassword) {
      updateAuthPassword(password.password, password.oldPassword)
        .then(() => {
          setEditPassword(false);
          setSaved(true);
          setPassword({
            oldPassword: "",
            password: "",
            confirmPassword: "",
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
      setPasswordMatches(false);
      setLoading(false);
    }
  };
  return (
    <AccountPasswordStyles>
      <div className="login-menu">
        <h3>{t("changePassword")}</h3>{" "}
        {saved && <p style={{ color: "var(--pink)" }}>{t("saved")}</p>}
        {!editPassword && (
          <button onClick={() => setEditPassword(true)}>{t("edit")}</button>
        )}
        {editPassword && (
          <button
            onClick={() => {
              setEditPassword(false);
              setPassword({
                oldPassword: "",
                password: "",
                confirmPassword: "",
              });
            }}
          >
            {t("cancel")}
          </button>
        )}
      </div>
      {editPassword && (
        <form onSubmit={updatePassword}>
          {/* // Password */}
          <div className="mui-input-wrapper">
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              label={t("newPassword")}
              placeholder={t("newPasswordInput")}
              variant="filled"
              color="secondary"
                  value={password.password}
                  onChange={(e) =>
                    setPassword({ ...password, password: e.target.value })
                  }
                  maxLength={40}
                  minLength={8}
                  required
                />
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
          {/* // Confirm Password */}
          <div className="mui-input-wrapper">
            <TextField
              name="confirm-password"
              type={showPassword2 ? "text" : "password"}
              label={t("confirmNewPassword")}
              placeholder={t("confirmNewPasswordInput")}
              variant="filled"
              color="secondary"
                  value={password.confirmPassword}
                  onChange={(e) =>
                    setPassword({ ...password, confirmPassword: e.target.value })
                  }
                  maxLength={40}
                  minLength={8}
                  required
                />
            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className={showPassword2 ? "active" : ""}
            >
              <Image
                src="/img/icon-view.svg"
                height={20}
                width={20}
                alt="show-password"
              />
            </button>
          </div>
          {!passwordMatches && (
            <p className="error-message">&#9940;{t("passwordsNotSame")}</p>
          )}
          {provider === "password" && (
            <div className="mui-input-wrapper">
              <TextField
                name="old-password"
                type={showPassword0 ? "text" : "password"}
                label={t("oldPassword")}
                placeholder={t("oldPasswordInput")}
                variant="filled"
                color="secondary"
                value={password.oldPassword}
                onChange={(e) =>
                  setPassword({ ...password, oldPassword: e.target.value })
                }
                maxLength={40}
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword0(!showPassword0)}
                className={showPassword0 ? "active" : ""}
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
          {error && <p className="error-message">&#9940;{t(error)}</p>}
          <div className="edit-buttons">
            <button
              className="normal-button"
              type="button"
              onClick={() => {
                setEditPassword(false);
                setPassword({
                  oldPassword: "",
                  password: "",
                  confirmPassword: "",
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
    </AccountPasswordStyles>
  );
};
export default AccountPassword;
