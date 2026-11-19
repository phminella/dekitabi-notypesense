import { CheckoutStripeElementStyles } from "./styles/CheckoutStripeElementStyles";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CheckoutStripeElementSkeleton from "./CheckoutStripeElementSkeleton";
import useUser from "../../../lib/useUser";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import useCart from "../../../lib/useCart";
// import { doc, getFirestore, getDoc } from "firebase/firestore/lite";
// import useDate from "../../../lib/useDate";
const CheckoutStripeElement = ({
  user,
  withSignUp,
  isGuide,
  setLoading,
  loading,
  t,
  signUpTab,
  clientSecret,
  updateStripePaymentIntent,
  createStripeCustomer,
  language,
  currency,
  coupon,
}) => {
  console.log(coupon);
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dateError, setDateError] = useState(false);
  // const [guideError, setGuideError] = useState(false);
  const [signUpDetails, setSignUpDetails] = useState({
    password: "",
    confirmPassword: "",
  });
  const cart = useSelector((state) => state.app.cart);
  // const { isGuideAvailable } = useDate();
  // const checkGuideAvailability = async (guideId, date) => {
  //   const docRef = doc(getFirestore(), "users", guideId);
  //   const docSnap = await getDoc(docRef);
  //   const guide = docSnap.data();
  //   if (!isGuideAvailable(guide.availability, date)) {
  //     setGuideError(true);
  //   }
  // };
  useEffect(() => {
    cart?.items?.map((item, i) => {
      // checkGuideAvailability(item.guide, item.date);
      if (
        dayjs(new Date(item?.date)).startOf("day").valueOf() <
        dayjs(new Date()).startOf("day").add(1, "day").valueOf()
      ) {
        setDateError(true);
      }
    });
  }, [cart]);
  const {
    signUp,
    federatedSignIn,
    loading: signUpLoading,
    error: signUpError,
  } = useUser();
  const { getTotal } = useCart();
  useEffect(() => {
    if (!stripe) {
      return;
    } else {
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
      if (!clientSecret) {
        return;
      }
      stripe
        .retrievePaymentIntent(clientSecret)
        .then(({ paymentIntent }) => {
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              break;
          }
        })
        .catch((err) => console.log(err));
    }
  }, [stripe]);
  const handleStripePayment = async (userEmail) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      capture_method: "automatic_async",
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${
          window.location.origin
        }/order-complete-processing?email=${
          user?.email ? user?.email : email?.email ? email?.email : userEmail
        }${coupon ? `&coupon=${coupon}` : ""}&test=true`,
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setIsLoading(false);
      setMessage(error.message);
    } else {
      setIsLoading(false);
      setMessage("An unexpected error occurred.");
    }
  };
  const [stripeCustomerUpdated, setStripeCustomerUpdated] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    if (withSignUp && !user?.uid) {
      if (isGuide && getTotal().tours > 0) {
      } else {
        if (signUpTab === "Google" || signUpTab === "Facebook") {
          federatedSignIn(signUpTab, signUpDetails.guide)
            .then(async (data) => {
              if (data) {
                if (!stripeCustomerUpdated) {
                  setStripeCustomerUpdated(true);
                  updateStripePaymentIntent({
                    test: true,
                    secret: clientSecret.split("_secret_")[0],
                    updatedData: {
                      customer: data.stripeCustomerId,
                      receipt_email: data.email,
                    },
                  })
                    .then(() => handleStripePayment(data.email))
                    .catch((err) => {
                      console.log(err);
                      setIsLoading(false);
                    });
                } else {
                  handleStripePayment(data.email);
                }
              } else {
                setIsLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setIsLoading(false);
            });
        } else {
          if (signUpDetails.password !== signUpDetails.confirmPassword) {
            document.getElementById("confirmPassword").focus();
          } else {
            signUp(signUpDetails.guide, email.email, signUpDetails.password)
              .then((data) => {
                if (data) {
                  if (!stripeCustomerUpdated) {
                    setStripeCustomerUpdated(true);
                    updateStripePaymentIntent({
                      test: true,
                      secret: clientSecret.split("_secret_")[0],
                      updatedData: {
                        customer: data.stripeCustomerId,
                        receipt_email: data.email,
                      },
                    })
                      .then(() => handleStripePayment(data.email))
                      .catch((err) => console.log(err));
                  } else {
                    handleStripePayment(data.email);
                  }
                } else {
                  setIsLoading(false);
                }
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
              });
          }
        }
      }
    } else {
      if (user?.uid) {
        if (!stripeCustomerUpdated) {
          setStripeCustomerUpdated(true);
          updateStripePaymentIntent({
            test: true,
            secret: clientSecret.split("_secret_")[0],
            updatedData: {
              customer: user?.stripeCustomerId,
              receipt_email: user?.email,
            },
          })
            .then((data) => {
              handleStripePayment(user?.email);
            })
            .catch((err) => {
              console.log(err);
              setIsLoading(false);
            });
        } else {
          handleStripePayment(user?.email);
        }
      } else {
        console.log(email, language);
        createStripeCustomer({
          email: email?.email,
          preferred_locales: [language.code],
        })
          .then((res) => {
            if (!stripeCustomerUpdated) {
              setStripeCustomerUpdated(true);
              updateStripePaymentIntent({
                test: true,
                secret: clientSecret.split("_secret_")[0],
                updatedData: {
                  customer: res.data.id,
                  receipt_email: email.email,
                },
              })
                .then(() => handleStripePayment(user?.email))
                .catch((err) => {
                  console.log(err);
                  setIsLoading(false);
                });
            } else {
              handleStripePayment(user?.email);
            }
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }
    }
  };
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <CheckoutStripeElementStyles className="checkout-stripe-element">
      {loading && (
        <CheckoutStripeElementSkeleton
          t={t}
          withSignUp={withSignUp}
          user={user}
        />
      )}
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        style={{
          position: loading ? "absolute" : "relative",
          top: loading ? "-100vw" : "0",
          opacity: loading ? "0" : "1",
          transition: "opacity 1s ease-in-out",
        }}
      >
        <h2>
          <Image
            height={25}
            width={25}
            src="/img/icon-payment.svg"
            alt="payment"
          />{" "}
          3. {t("payment")}
        </h2>
        {((!user?.uid && !withSignUp) ||
          (withSignUp && signUpTab === "email")) && (
          <LinkAuthenticationElement
            id="link-authentication-element"
            value={email}
            onChange={(e) => setEmail(e.value)}
          />
        )}
        {withSignUp && signUpTab === "email" && (
          <div className="input-password-wrapper">
            <div className="input-password">
              {/* // Password */}
              <div className="input-item">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder={t("password")}
                  value={signUpDetails.password}
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      password: e.target.value,
                    })
                  }
                  minLength={8}
                  maxLength={50}
                  required
                />
              </div>
              {/* // Confirm Password */}
              <div className="input-item">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder={t("confirmPasswordPlaceholder")}
                  value={signUpDetails.confirmPassword}
                  className={
                    signUpDetails.confirmPassword !== signUpDetails.password
                      ? "input-error"
                      : null
                  }
                  onChange={(e) =>
                    setSignUpDetails({
                      ...signUpDetails,
                      confirmPassword: e.target.value,
                    })
                  }
                  minLength={8}
                  maxLength={50}
                  required
                />
              </div>
            </div>
            {signUpDetails.confirmPassword !== signUpDetails.password &&
              signUpDetails.confirmPassword.length > 0 && (
                <p className="error"> &#9940;{t("passwordDoesNotMatch")} </p>
              )}
          </div>
        )}
        <PaymentElement
          id="payment-element"
          onReady={() => {
            setTimeout(() => {
              setLoading(false);
            }, 300);
          }}
        />
        <button
          className={`pay-button`}
          disabled={
            (isGuide && getTotal().tours > 0) ||
            cart?.items?.length === 0 ||
            isLoading ||
            loading ||
            dateError ||
            // guideError ||
            signUpLoading ||
            !stripe ||
            !elements ||
            (signUpDetails.guide && getTotal().tours > 0)
          }
          id="submit"
        >
          {isLoading || signUpLoading ? (
            <Image
              height={35}
              width={40}
              src="/img/icon-spinner.svg"
              alt="spinner"
              className="spinner"
            />
          ) : !withSignUp ? (
            t("payNow")
          ) : (
            t("payNowAndSignUp")
          )}
        </button>
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
                {t("enableCookiesCheckout")}
              </p>
            )}
          </>
        )}
        {/* Show any error or success messages */}
        {message && (
          <p className="error" id="payment-message">
            &#9940; {message.charAt(0).toUpperCase() + message.slice(1)}.
          </p>
        )}
        {signUpError && (
          <p className="error" id="payment-message">
            &#9940; {t(signUpError)}.
          </p>
        )}
        {isGuide && getTotal().tours > 0 && (
          <p className="guide-alert">
            <Image
              height={20}
              width={20}
              src="/img/icon-alert.svg"
              alt="alert"
            ></Image>
            {t("cantBookTours")}
          </p>
        )}
        {/* {guideError && (
          <p className="error-message">
            <Image
              height={20}
              width={20}
              src="/img/icon-alert.svg"
              alt="alert"
            ></Image>
            {t("guideNoLongerAvailable")}
          </p>
        )} */}
        {dateError && (
          <p className="error-message">
            <Image
              height={20}
              width={20}
              src="/img/icon-alert.svg"
              alt="alert"
            ></Image>
            {t("prepTime2", {
              prepTime: dayjs(today.setDate(new Date().getDate() + 1)).format(
                "YYYY-MM-DD"
              ),
            })}
          </p>
        )}
      </form>
      <div className="card-warning">
        <Image height={17} width={17} src="/img/icon-alert.svg" alt="alert" />
        {t("chargedJpy")}
      </div>
      {currency?.code !== "CNY" && currency?.code !== "JPY" && (
        <div className="card-warning wallet-pay">
          <Image
            src="/img/payment-methods/icon-alipay.svg"
            alt="alipay"
            height={15}
            width={15}
          />{" "}
          <Image
            src="/img/payment-methods/icon-wechat.svg"
            alt="alipay"
            height={15}
            width={15}
          />
          {t("walletPayCondition")}
        </div>
      )}
    </CheckoutStripeElementStyles>
  );
};
export default React.memo(CheckoutStripeElement);
