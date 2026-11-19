import { AccountDeleteStyles } from "./styles/AccountDeleteStyles";
import { AccountEmailStyles } from "./styles/AccountEmailStyles";
import useUser from "../../../lib/useUser";
import { useState } from "react";
import Image from "next/image";
import Modal from "../../UI/Modal";
import TextField from "@mui/material/TextField";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
const AccountDelete = ({ t, user, provider, currentUser }) => {
  const { deleteAccount, federatedSignIn, error } = useUser();
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editDelete, setEditDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const getErrorCode = (error) => {
    const code = error?.message?.split("(")?.[1]?.split(")")?.[0];
    return code || "errorMsg";
  };
  return (
    <AccountEmailStyles>
      <AccountDeleteStyles>
        <div className="login-menu">
          <h3>{t("deleteAccount")}</h3>
          {!editDelete && (
            <button onClick={() => setEditDelete(true)}>{t("delete")}</button>
          )}
          {editDelete && (
            <button
              onClick={() => {
                setEditDelete(false);
                setPassword("");
              }}
            >
              {t("cancel")}
            </button>
          )}
        </div>
        {!editDelete && <div className="name">{user?.email}</div>}
        {editDelete && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
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
            {error && <p className="error-message">&#9940;{t(error)}</p>}
            {localError && (
              <p className="error-message">&#9940;{t(localError)}</p>
            )}
            <button className="delete-account-button">
              {t("deleteAccount")}
            </button>
          </form>
        )}
        {showModal && (
          <Modal>
            <div style={{ paddingBottom: "15px" }}>
              <p className="modal-title">
                <Image
                  height={17}
                  width={17}
                  src="/img/icon-alert.svg"
                  alt="delete-account"
                />{" "}
                {t("deleteAccount")}
              </p>
              <p className="modal-message">{t("deleteAccountMsg")}</p>
              <div className="modal-buttons">
                {loading ? (
                  <div className="modal-buttons spinner">
                    <Image
                      src="/img/icon-spinner-white.svg"
                      alt="spinner"
                      height={30}
                      width={30}
                    />
                  </div>
                ) : (
                  <button
                    className="normal-button"
                    onClick={() => {
                      setLoading(true);
                      if (provider === "password") {
                        const credential = EmailAuthProvider.credential(
                          user.email,
                          password
                        );
                        return reauthenticateWithCredential(
                          currentUser,
                          credential
                        )
                          .then(async (res) => {
                            setPassword("");
                            deleteAccount(user, password)
                              .then(() => {})
                              .catch((error) => {
                                setLoading(false);
                                setShowModal(false);
                                setLocalError(getErrorCode(error));
                              });
                          })
                          .catch((error) => {
                            setLoading(false);
                            setShowModal(false);
                            setLocalError(getErrorCode(error));
                          });
                      } else if (provider === "google.com") {
                        federatedSignIn("Google")
                          .then((res) => {
                            deleteAccount(user)
                              .then(() => {})
                              .catch((error) => {
                                setLoading(false);
                                setShowModal(false);
                                setLocalError(getErrorCode(error));
                              });
                          })
                          .catch((error) => {
                            setLoading(false);
                            setShowModal(false);
                            setLocalError(getErrorCode(error));
                          });
                      } else if (provider === "facebook.com") {
                        federatedSignIn("Facebook")
                          .then(() => {
                            deleteAccount(user)
                              .then(() => {})
                              .catch((error) => {
                                setLoading(false);
                                setShowModal(false);
                                setLocalError(getErrorCode(error));
                              });
                          })
                          .catch((error) => {
                            setLoading(false);
                            setShowModal(false);
                            setLocalError(getErrorCode(error));
                          });
                      } else {
                        federatedSignIn("Apple")
                          .then(() => {
                            deleteAccount(user)
                              .then(() => {})
                              .catch((error) => {
                                setLoading(false);
                                setShowModal(false);
                                setLocalError(getErrorCode(error));
                              });
                          })
                          .catch((error) => {
                            setLoading(false);
                            setShowModal(false);
                            setLocalError(getErrorCode(error));
                          });
                      }
                    }}
                  >
                    {t("yes")}
                  </button>
                )}
                <button
                  disabled={loading}
                  className="normal-button"
                  onClick={() => setShowModal(false)}
                >
                  {t("no")}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AccountDeleteStyles>
    </AccountEmailStyles>
  );
};
export default AccountDelete;
