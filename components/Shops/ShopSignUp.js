import useForm from "../../lib/useForm";
import { ShopSignUpStyles } from "./styles/ShopSignUpStyles";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Spinner from "../UI/Spinner";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore/lite";
import { useRouter } from "next/router";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import useUser from "../../lib/useUser";
const ShopSignUp = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state?.app?.user);
  let functions;
  let sendEmail;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    sendEmail = httpsCallable(functions, "sendEmail");
  } catch (err) {
    console.log(err);
  }
  const { validEmail } = useForm();
  const router = useRouter();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(true);
  const [newAccount, setNewAccount] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signUp, loading, error } = useUser();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    if (formInput.password !== formInput.confirmPassword) {
      document.getElementById("confirmPassword").focus();
      setConfirmError(true);
    } else {
      const usersRef = collection(getFirestore(), "shops");
      const qEmail = query(
        usersRef,
        where("email", "==", formInput?.email?.toLowerCase())
      );
      const emailSnap = await getDocs(qEmail);
      if (emailSnap.empty) {
        const q = query(
          usersRef,
          where(
            "shopId",
            "==",
            formInput?.shopId
              ?.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/\s\s+/g, " ")
              .toLowerCase()
              .trim()
              .split(" ")
              .join("-")
          )
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          signUp(
            false,
            formInput?.email,
            formInput?.password,
            "Japan",
            null,
            formInput?.shopId
          )
            .then((shopData) => {
              console.log(error);
              if (error) {
                setSubmitLoading(false);
              } else {
                setTimeout(() => {
                  router.push(`/shop/${shopData?.url}`).then(() => {
                    router.reload();
                  });
                }, 1000);
              }
            })
            .catch((err) => {
              setSubmitLoading(false);
            });
        } else {
          setSubmitLoading(false);
          setConfirmError(false);
          setAlreadyExists(true);
          setEmailExists(false);
        }
      } else {
        setSubmitLoading(false);
        setConfirmError(false);
        setAlreadyExists(false);
        setEmailExists(true);
      }
    }
  };
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
            <h2>{t("signUp")}</h2>
            <p className="alternative">
              {t("alreadyHaveAccount")}{" "}
              <Link className="link" href={`/shop/sign-in`} prefetch={false}>
                {t("signIn")}!
              </Link>
            </p>
          </div>
        </div>
        <div className="sign-form">
          <form onSubmit={handleSubmit}>
            <fieldset disabled={submitLoading} aria-busy={submitLoading}>
              {/* // shop */}
              <div className="mui-input-wrapper">
                <TextField
                  name="shopId"
                  label={t("shops:shopId")}
                  placeholder={t("shops:shopIdPlaceholder")}
                  variant="filled"
                  color="secondary"
                  value={formInput.shopId}
                  onChange={(e) => {
                    if (confirmError) {
                      setConfirmError(false);
                    }
                    if (alreadyExists) {
                      setAlreadyExists(false);
                    }
                    if (emailExists) {
                      setEmailExists(false);
                    }
                    if (!/[^a-zA-Z0-9]/.test(e.target.value)) {
                      setFormInput({
                        ...formInput,
                        shopId: e.target.value,
                      });
                    }
                  }}
                  inputProps={{ maxLength: 25, minLength: 4 }}
                  required
                />
              </div>
              {/* // Email */}
              <div className="mui-input-wrapper">
                <TextField
                  type="email"
                  name="email"
                  label={t("email")}
                  placeholder={t("emailPlaceholder")}
                  variant="filled"
                  color="secondary"
                  error={!validEmail(formInput.email)}
                  className={!validEmail(formInput.email) ? "error-input" : ""}
                  value={formInput.email}
                  onChange={(e) => {
                    if (confirmError) {
                      setConfirmError(false);
                    }
                    if (alreadyExists) {
                      setAlreadyExists(false);
                    }
                    if (emailExists) {
                      setEmailExists(false);
                    }
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
                      if (e.target.value === formInput?.password) {
                        setConfirmError(false);
                      }
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
              {error && <p className="error-message">&#9940;{t(`${error}`)}</p>}
              {alreadyExists && (
                <p className="error-message">&#9940;{t("shops:shopIdError")}</p>
              )}
              {emailExists && (
                <p className="error-message">
                  &#9940;{t("auth/email-already-in-use")}
                </p>
              )}
              {confirmError && (
                <p className="error-message">
                  &#9940;{t("passwordDoesNotMatch")}
                </p>
              )}
              {!submitLoading && !loading && (
                <button className="submit-button normal-button" type="submit">
                  {t("signUp")}
                </button>
              )}
              {(submitLoading || loading) && (
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
          </form>
          <div className="privacy-policy">{t("shops:shopTerms")}</div>
        </div>
      </div>
    </ShopSignUpStyles>
  );
};
export default ShopSignUp;
