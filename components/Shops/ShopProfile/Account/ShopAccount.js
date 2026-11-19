import { ShopAccountStyles } from "./styles/ShopAccountStyles";
import BasicModal from "../../../UI/BasicModal";
import Image from "next/image";
import { useState } from "react";
import {
  deleteUser,
  getAuth,
  signOut,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  doc,
  getFirestore,
  deleteDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore/lite";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useRouter } from "next/router";
import { getFunctions, httpsCallable } from "firebase/functions";
const ShopAccount = ({ t, shopProfile, setShopProfile }) => {
  console.log(shopProfile);
  let deleteStripeAccount;
  let functions;
  let auth;
  let updateStripeAccount;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    deleteStripeAccount = httpsCallable(functions, "deleteStripeAccount");
    updateStripeAccount = httpsCallable(functions, "updateStripeAccount");
    auth = getAuth();
  } catch (err) {
    console.log(err);
  }
  const [showDelete, setShowDelete] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [cancelPassword, setCancelPassword] = useState("");
  // Email
  const [emailSaved, setEmailSaved] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  // Password
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [cancelPassError, setCancelPassError] = useState("");
  const router = useRouter();
  const exists = async (key, value) => {
    const usersRef = collection(getFirestore(), "shops");
    const q = query(usersRef, where(key, "==", value));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return false;
    } else {
      return true;
    }
  };
  const reLogin = async (currentPassword) => {
    const credential = EmailAuthProvider.credential(
      shopProfile?.email,
      currentPassword
    );
    console.log(credential, auth?.currentUser);
    // Now you can use that to reauthenticate
    return reauthenticateWithCredential(auth.currentUser, credential)
      .then(async (res) => {
        return updateEmail(auth.currentUser, email)
          .then(async (res) => {
            return true;
          })
          .catch((error) => {
            console.log(error);
            setEmailError(error?.message?.split("(")[1].split(")")[0]);
            setLoadingEmail(false);
            return false;
          });
      })
      .catch((error) => {
        setEmailError(error?.message?.split("(")[1].split(")")[0]);
      });
  };
  const cancel = async () => {
    setLoadingCancel(true);
    const reLogin = async (currentPassword) => {
      const credential = EmailAuthProvider.credential(
        shopProfile?.email,
        currentPassword
      );
      // Now you can use that to reauthenticate
      return reauthenticateWithCredential(auth.currentUser, credential)
        .then(async (res) => {
          return true;
        })
        .catch((error) => {
          return false;
        });
    };
    const deleteUserFromFirebase = async () => {
      const currentUser = auth.currentUser;
      return deleteUser(currentUser)
        .then(() => {
          return true;
        })
        .catch((error) => {
          console.log("Error deleting user:", error);
        });
    };
    reLogin(cancelPassword)
      .then(async (ok) => {
        if (ok) {
          if (shopProfile?.photos?.length > 0) {
            try {
              const deletedPhotos = await shopProfile?.photos?.map((photo) => {
                const fileRef = ref(getStorage(), photo);
                deleteObject(fileRef);
              });
            } catch (err) {
              console.log(err);
            }
          }
          if (shopProfile?.activities?.length > 0) {
            try {
              const deletedActivities = await shopProfile?.activities?.map(
                async (activity) => {
                  try {
                    const deletedPhotos = await activity?.photos?.map(
                      (photo) => {
                        const fileRef = ref(getStorage(), photo);
                        deleteObject(fileRef);
                      }
                    );
                  } catch (err) {
                    console.log(err);
                  }
                  deleteDoc(doc(getFirestore(), "activities", activity?.id));
                }
              );
            } catch (err) {
              console.log(err);
            }
          }
          deleteStripeAccount(shopProfile?.stripeAccountId)
            .then(() => {
              deleteDoc(doc(getFirestore(), "shops", shopProfile?.uid))
                .then(async () => {
                  deleteUserFromFirebase()
                    .then(() => {
                      signOut(auth)
                        .then(() => {
                          setLoadingCancel(false);
                          router.push("/shop/sign-up").then(() => {
                            router.reload();
                          });
                        })
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        } else {
          setLoadingCancel(false);
          setShowDelete(false);
          setCancelPassError(true);
        }
      })
      .catch((err) => {
        setShowDelete(false);
        setCancelPassError(true);
        setLoadingCancel(false);
      });
  };
  const editEmail = async (e) => {
    e.preventDefault();
    setLoadingEmail(true);
    exists("email", email).then((exists) => {
      if (exists) {
        setEmailError("auth/email-already-in-use");
        setLoadingEmail(false);
      } else {
        updateEmail(auth.currentUser, email)
          .then(() => {
            updateStripeAccount({
              id: shopProfile?.stripeAccountId,
              updatedData: { email },
            })
              .then(() => {
                updateDoc(doc(getFirestore(), "shops", shopProfile?.uid), {
                  email,
                })
                  .then(() => {
                    setShopProfile({ ...shopProfile, email });
                    setLoadingEmail(false);
                    setShowEmail(false);
                    setEmailSaved(true);
                    setTimeout(() => {
                      setEmailSaved(false);
                    }, 2500);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            if (
              err.message === "Firebase: Error (auth/requires-recent-login)." ||
              err.message ===
                "Firebase: Please verify the new email before changing email. (auth/operation-not-allowed)."
            ) {
              reLogin(currentPassword)
                .then((ok) => {
                  if (ok) {
                    updateStripeAccount({
                      id: shopProfile?.stripeAccountId,
                      updatedData: { email },
                    })
                      .then(() => {
                        updateDoc(
                          doc(getFirestore(), "shops", shopProfile?.uid),
                          {
                            email,
                          }
                        )
                          .then(() => {
                            setShopProfile({ ...shopProfile, email });
                            setLoadingEmail(false);
                            setShowEmail(false);
                            setEmailSaved(true);
                            setTimeout(() => {
                              setEmailSaved(false);
                            }, 2500);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
      }
    });
  };
  const editPassword = async (e) => {
    e.preventDefault();
    setLoadingPassword(true);
    if (newPassword === confirmPassword) {
      return updatePassword(auth.currentUser, newPassword, oldPassword)
        .then(async (res) => {
          setLoadingPassword(false);
          setShowPassword(false);
          setPasswordSaved(true);
          setNewPassword("");
          setOldPassword("");
          setConfirmPassword("");
          setTimeout(() => {
            setPasswordSaved(false);
          }, 2500);
        })
        .catch(async (err) => {
          if (
            err.message === "Firebase: Error (auth/requires-recent-login)." ||
            err.message ===
              "Firebase: Please verify the new email before changing email. (auth/operation-not-allowed)."
          ) {
            const credential = EmailAuthProvider.credential(
              shopProfile?.email,
              oldPassword
            );
            // Now you can use that to reauthenticate
            return reauthenticateWithCredential(
              auth.currentUser,
              credential
            ).then(async (res) => {
              updatePassword(auth.currentUser, newPassword, oldPassword).then(
                async (res) => {
                  setLoadingPassword(false);
                  setShowPassword(false);
                  setPasswordSaved(true);
                  setNewPassword("");
                  setOldPassword("");
                  setConfirmPassword("");
                  setTimeout(() => {
                    setPasswordSaved(false);
                  }, 2500);
                }
              );
            });
          } else {
            setPasswordError(t(err));
          }
        });
    } else {
      setLoadingPassword(false);
      setPasswordError("passwordDoesNotMatch");
    }
  };
  return (
    <ShopAccountStyles>
      <p className="profile-title">{t("shops:editShopInfo")}</p>
      {/* 
      EMAIL
       */}
      <div className="form-wrapper">
        <div className="info-wrapper">
          <div className="info-title">{t("email")}</div>
          {!showEmail ? (
            <>
              <div className="info-grid">
                <p>{shopProfile?.email}</p>
                <button className="link" onClick={() => setShowEmail(true)}>
                  {t("edit")}{" "}
                </button>
              </div>
              {emailSaved && <p className="saved">{t("saved")}</p>}
            </>
          ) : (
            <form onSubmit={editEmail}>
              <label htmlFor="email">
                {t("email")}
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder={t("newEmailInput")}
                  value={email}
                  autoComplete="off"
                  onChange={(e) => {
                    if (emailError) {
                      setEmailError("");
                    }
                    setEmail(e?.target.value);
                  }}
                  disabled={loadingEmail}
                  minLength={5}
                  maxLength={40}
                  required
                />
              </label>
              <label htmlFor="currentPassword">
                {t("password")}
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder={t("passwordInput")}
                  value={currentPassword}
                  autoComplete="off"
                  onChange={(e) => {
                    if (passwordError) {
                      setPasswordError("");
                    }
                    setCurrentPassword(e?.target.value);
                  }}
                  disabled={loadingEmail}
                  minLength={8}
                  maxLength={40}
                  required
                  className="password"
                />
              </label>
              <div className="password-buttons">
                <button
                  type="button"
                  className="normal-button"
                  onClick={() => {
                    setShowEmail(false);
                    setEmailError("");
                    setEmail(shopProfile?.email || "");
                  }}
                >
                  {t("cancel")}
                </button>
                <button className="normal-button" disabled={loadingEmail}>
                  {loadingEmail ? (
                    <Image
                      src="/img/icon-spinner.svg"
                      alt="spinner"
                      height={25}
                      width={25}
                    />
                  ) : (
                    <>{t("update")}</>
                  )}
                </button>
              </div>
              {emailError && (
                <p className="error-message">&#9940;{t(emailError)}</p>
              )}
            </form>
          )}
        </div>
      </div>
      {/* 
      PASSWORD
       */}
      <div className="form-wrapper">
        <div className="info-wrapper">
          <div className="info-title">{t("password")}</div>
          {!showPassword ? (
            <>
              <div className="info-grid">
                <p>**********</p>
                <button className="link" onClick={() => setShowPassword(true)}>
                  {t("edit")}
                </button>
              </div>
              {passwordSaved && <p className="saved">{t("saved")}</p>}
            </>
          ) : (
            <form onSubmit={editPassword}>
              <label htmlFor="currentPassword">
                {t("oldPassword")}
                <input
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  placeholder={t("passwordInput")}
                  value={oldPassword}
                  autoComplete="off"
                  onChange={(e) => {
                    if (passwordError) {
                      setPasswordError("");
                    }
                    setOldPassword(e?.target.value);
                  }}
                  disabled={loadingPassword}
                  minLength={8}
                  maxLength={40}
                  required
                  className="password"
                />
              </label>
              <label htmlFor="newPassword">
                {t("newPassword")}
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder={t("newPasswordInput")}
                  value={newPassword}
                  autoComplete="off"
                  className="password"
                  onChange={(e) => {
                    if (passwordError) {
                      setPasswordError("");
                    }
                    setNewPassword(e?.target.value);
                  }}
                  disabled={loadingPassword}
                  minLength={8}
                  maxLength={40}
                  required
                />
              </label>
              <label htmlFor="confirmPassword">
                {t("confirmPassword")}
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder={t("confirmPasswordPlaceholder")}
                  value={confirmPassword}
                  autoComplete="off"
                  onChange={(e) => {
                    if (passwordError) {
                      setPasswordError("");
                    }
                    setConfirmPassword(e?.target.value);
                  }}
                  disabled={loadingPassword}
                  minLength={8}
                  maxLength={40}
                  required
                  className="password"
                />
              </label>
              {passwordError && (
                <p className="error-message">&#9940;{t(passwordError)}</p>
              )}
              <div className="password-buttons">
                <button
                  className="normal-button"
                  onClick={() => {
                    setShowPassword(false);
                    setConfirmPassword("");
                    setOldPassword("");
                    setNewPassword("");
                    setPasswordError("");
                  }}
                  type="button"
                  disabled={loadingPassword}
                >
                  {t("cancel")}
                </button>
                <button className="normal-button">
                  {loadingPassword ? (
                    <Image
                      src="/img/icon-spinner.svg"
                      alt="spinner"
                      height={25}
                      width={25}
                    />
                  ) : (
                    <>{t("update")}</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <BasicModal showModal={showDelete} setShowModal={setShowDelete}>
        <div style={{ paddingBottom: "15px" }}>
          <h3 className="modal-title">{t("deleteAccount")}</h3>
          <p className="modal-message">{t("deleteAccountMsg")}</p>
          <div className="modal-buttons">
            <button
              className="normal-button"
              onClick={() => setShowDelete(false)}
              disabled={loadingCancel}
            >
              {t("no")}
            </button>{" "}
            {!loadingCancel ? (
              <button
                className="normal-button"
                onClick={() => {
                  cancel();
                }}
              >
                {t("deleteAccount")}
              </button>
            ) : (
              <div className="fake-button">
                <Image
                  height={30}
                  width={30}
                  src="/img/icon-spinner.svg"
                  alt="spinner"
                />
              </div>
            )}
          </div>
        </div>
      </BasicModal>
      <div className="form-wrapper">
        <div className="info-wrapper">
          <div className="info-title">{t("deleteAccount")}</div>
          {!showDeleteForm ? (
            <div className="info-grid">
              <p>{t("deleteAccountMsg")}</p>
              <button className="link" onClick={() => setShowDeleteForm(true)}>
                {t("delete")}
              </button>
            </div>
          ) : (
            <>
              <label htmlFor="currentPassword">
                {t("password")}
                <input
                  className="cancel-input"
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder={t("passwordInput")}
                  value={cancelPassword}
                  autoComplete="off"
                  onChange={(e) => {
                    if (passwordError) {
                      setPasswordError("");
                    }
                    setCancelPassword(e?.target.value);
                  }}
                  disabled={loadingCancel}
                  minLength={8}
                  maxLength={40}
                  required
                />
              </label>
              {cancelPassError && (
                <p className="error-message">
                  &#9940;{t("auth/wrong-password")}
                </p>
              )}
              <div className="password-buttons">
                <button
                  onClick={() => {
                    setShowDeleteForm(false);
                    setCancelPassword(false);
                    setCancelPassError(false);
                    setLoadingCancel(false);
                  }}
                  className="normal-button"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => setShowDelete(true)}
                  className="normal-button cancel"
                >
                  {t("delete")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </ShopAccountStyles>
  );
};
export default ShopAccount;
