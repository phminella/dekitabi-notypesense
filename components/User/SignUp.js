import { SignInStyle } from "./styles/SignInStyle";
import useForm from "../../lib/useForm";
import useUser from "../../lib/useUser";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { setShowLogin } from "../../store/appSlice";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import DOMPurify from "isomorphic-dompurify";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore/lite";
const SignUp = ({ setAction, dispatch, t, isiOS }) => {
  const router = useRouter();
  const { validEmail } = useForm();
  const { signUp, federatedSignIn, loading, error } = useUser();
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countryError, setCountryError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    coupon: "",
    guide: false,
    country: {
      code: "JP",
      name: "Japan",
      language: "日本語",
      currency: "JPY",
      phoneCode: "+81",
    },
  });
  const language = useSelector((state) => state.app.language);
  const getCountries = async () => {
    let tempCountries = [];
    const q = query(collection(getFirestore(), "countries"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const country = doc.data();
      tempCountries.push({
        value: {
          name: country.name,
          code: country.code,
          language: country.language,
          currency: country.currency,
          phoneCode: country.phoneCode,
        },
        label: country.translatedName[language?.code],
      });
    });
    setCountriesOptions(tempCountries);
    setLoadingCountries(false);
  };
  useEffect(() => {
    getCountries();
  }, [language]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formInput.password !== formInput.confirmPassword) {
      document.getElementById("confirmPassword").focus();
      setConfirmError(true);
    } else {
      let coupon;
      if (formInput?.coupon) {
        const getAffiliate = async () => {
          const usersRef = collection(getFirestore(), "affiliates");
          const q = query(usersRef, where("coupon", "==", formInput?.coupon));
          const querySnapshot = await getDocs(q);
          let affiliates = [];
          querySnapshot.forEach(async (affiliate) => {
            affiliates?.push({
              id: affiliate?.data()?.id,
              email: affiliate?.data()?.email,
              stripeAccountId: affiliate?.data()?.stripeAccountId,
            });
          });
          return affiliates?.length > 0 ? affiliates[0] : false;
        };
        coupon = await getAffiliate();
        if (!coupon) {
          document.getElementById("coupon").focus();
          setCouponError(true);
          return false;
        }
      }
      signUp(
        formInput.guide,
        formInput.email,
        formInput.password,
        formInput.country,
        coupon
      )
        .then((newUserData) => {
          if (newUserData) {
            setFormInput({
              email: "",
              password: "",
              confirmPassword: "",
              guide: false,
            });
            if (newUserData?.guide === "true") {
              setAction("laststep");
            } else {
              dispatch(setShowLogin(false));
              router.push(`/${newUserData?.username}`);
              setAction("signin");
            }
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleFederated = async (provider) => {
    let coupon;
    if (formInput?.coupon) {
      const getAffiliate = async () => {
        const usersRef = collection(getFirestore(), "affiliates");
        const q = query(usersRef, where("coupon", "==", formInput?.coupon));
        const querySnapshot = await getDocs(q);
        let affiliates = [];
        querySnapshot.forEach(async (affiliate) => {
          affiliates?.push({
            id: affiliate?.data()?.id,
            email: affiliate?.data()?.email,
            stripeAccountId: affiliate?.data()?.stripeAccountId,
          });
        });
        return affiliates?.length > 0 ? affiliates[0] : false;
      };
      coupon = await getAffiliate();
      if (!coupon) {
        document.getElementById("coupon")?.focus();
        setCouponError(true);
        return false;
      }
    }
    federatedSignIn(provider, formInput.guide, formInput?.country, coupon)
      .then((newUserData) => {
        if (newUserData) {
          setFormInput({
            email: "",
            password: "",
            confirmPassword: "",
            guide: false,
          });
          if (newUserData.guide === "true") {
            setAction("laststep");
          } else {
            dispatch(setShowLogin(false));
            router.push(`/${newUserData?.username}`);
            setAction("signin");
          }
        }
      })
      .catch((err) => console.log(err));
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
          <h2>{t("signUp")}</h2>
          <p className="alternative">
            {t("alreadyHaveAccount")}
            <button
              onClick={() => setAction("signin")}
              className="alternative-button"
            >
              {t("signIn")}!
            </button>{" "}
          </p>
        </div>
      </div>
      <div className="sign-form">
        <form onSubmit={handleSubmit}>
          <fieldset disabled={loading} aria-busy={loading}>
            {/* Guide */}
            <div className="switch-wrapper">
              <p className={formInput.guide ? "guide" : ""}>{t("imaGuide")}</p>
              <label className="switch">
                <input
                  type="checkbox"
                  value={formInput.guide}
                  checked={formInput.guide}
                  onChange={() =>
                    setFormInput({ ...formInput, guide: !formInput.guide })
                  }
                  name="guide"
                />
                <span className="slider round"></span>
              </label>
            </div>
            {/* Country */}
            {false && (
              <div className="mui-input-wrapper">
                {loadingCountries ? (
                  <Image
                    src="/img/icon-spinner.png"
                    height={35}
                    width={35}
                    alt="spinner"
                    className="spinner"
                  />
                ) : (
                  <FormControl
                    variant="filled"
                    sx={{ minWidth: 200 }}
                    className="mui-input-wrapper"
                  >
                    <InputLabel id="country-label">{t("country")}</InputLabel>
                    <Select
                      labelId="country-label"
                      value={formInput.country}
                      onChange={(e) => {
                        setCountryError(false);
                        setFormInput({ ...formInput, country: e.target.value });
                      }}
                      placeholder={t("selectCountry")}
                      required
                    >
                      {countriesOptions.map((country, i) => (
                        <MenuItem
                          key={i}
                          value={country.value}
                          disabled={country.value.name !== "Japan"}
                        >
                          {country.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </div>
            )}
            {formInput?.guide && (
              <div className="mui-input-wrapper">
                <input
                  id="coupon"
                  name="coupon"
                  placeholder={t("insertCouponCode")}
                  variant="filled"
                  color="secondary"
                  className="coupon-input"
                  type="text"
                  value={formInput.coupon}
                  onChange={(e) =>
                    setFormInput({ ...formInput, coupon: e.target.value })
                  }
                  maxLength={20}
                  minLength={3}
                />
              </div>
            )}
            {/* // Email */}
            <div className="mui-input-wrapper">
              <TextField
                name="email"
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
              />
            </div>
            {/* // Password */}
            <div className="two-columns-wrapper">
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
              {/* // Confirm Password */}
              <div className="mui-input-wrapper">
                <TextField
                  name="confirm-password"
                  id="confirmPassword"
                  label={t("confirmPassword")}
                  placeholder={t("confirmPassword")}
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
            {!navigator?.cookieEnabled && (
              <p className="warning-message">
                <Image
                  src="/img/icon-alert.svg"
                  alt="alert"
                  height={15}
                  width={15}
                />
                {t("enableCookiesSignUp")}
              </p>
            )}
            {error && <p className="error-message">&#9940;{t(error)}</p>}
            {confirmError && (
              <p className="error-message">
                &#9940;{t("passwordDoesNotMatch")}
              </p>
            )}
            {countryError && (
              <p className="error-message">&#9940;{t("countryError")}</p>
            )}
            {couponError && (
              <p className="error-message">&#9940;{t("couponError")}</p>
            )}
            {!loading && (
              <button
                className="submit-button normal-button"
                type="submit"
                disabled={!navigator?.cookieEnabled}
              >
                {!formInput.guide && <>{t("signUp")}</>}
                {formInput.guide && <>{t("continue")}</>}
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
          </fieldset>
        </form>
        {(!navigator.userAgent.includes("PWAShell") || !isiOS()) && (
          <section id="OAuth-signup" className={true ? "is-ios" : ""}>
            {/* <button
              onClick={() => {
                if (formInput?.country || !formInput?.guide) {
                  handleFederated("Facebook");
                } else {
                  setCountryError(true);
                }
              }}
              id="facebook-button"
              type="button"
            >
              <Image
                src="/img/icon-facebook.svg"
                alt="facebook"
                height={30}
                width={30}
              />
            </button> */}
            <button
              onClick={() => {
                if (formInput?.country || !formInput?.guide) {
                  handleFederated("Google");
                } else {
                  setCountryError(true);
                }
              }}
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
                onClick={() => {
                  if (formInput?.country || !formInput?.guide) {
                    handleFederated("Apple");
                  } else {
                    setCountryError(true);
                  }
                }}
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
        <div
          className="privacy-policy"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(t("acceptTermsPolicy"), {
              USE_PROFILES: { html: true },
            }),
          }}
        ></div>
      </div>
    </SignInStyle>
  );
};
export default SignUp;
