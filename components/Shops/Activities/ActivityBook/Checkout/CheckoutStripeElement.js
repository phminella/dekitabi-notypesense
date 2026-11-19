import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import useUser from "../../../../../lib/useUser";
const CheckoutStripeElement = ({
  user,
  t,
  booking,
  clientSecret,
  updateStripePaymentIntent,
  signUpTab,
  formInput,
  loadingCheckout,
  setLoadingCheckout,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState(null);
  const [formError, setFormError] = useState("");
  const { signUp, federatedSignIn, error: signUpError } = useUser();
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
  const handleStripePayment = async () => {
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
        return_url: `${window.location.origin}/book/completed?booking=${booking?.id}`,
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setLoading(false);
      setMessage(error.message);
    } else {
      setLoading(false);
      setMessage("errorMsg");
    }
  };
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setMessage("");
    setFormError("");
    const completeOrder = async (user) => {
      try {
      const completedBooking = await axios({
        method: "post",
        url: `https://asia-northeast1-dekitabi.cloudfunctions.net/bookActivity`,
        data: {
          booking: {
            ...booking,
            customerId: user?.uid,
            shopId: booking?.activity?.shopId,
          },
        },
      });
      const updatedPaymentIntent = await updateStripePaymentIntent({
        test: true,
        secret: clientSecret.split("_secret_")[0],
        updatedData: {
          customer: user.stripeCustomerId,
          receipt_email: user.email,
        },
      }); 
      handleStripePayment();
    } catch(err) {
        console.log(err);
        setFormError("errorMsg")
      }
    };
    if (user?.uid) {
      completeOrder(user);
    } else {
      if (signUpTab === "email") {
        if (formInput.password !== formInput.confirmPassword) {
          setFormError("passwordDoesNotMatch");
          setLoading(false);
        } else {
          signUp(false, formInput?.email, formInput?.password)
            .then((data) => {
              if (data) {
                completeOrder(data);
              } else {
                setFormError(signUpError ? signUpError : "errorMsg");
                setLoading(false);
              }
            })
            .catch((err) => {
              setTimeout(() => {
                setFormError(err);
                setLoading(false);
              }, 1000);
            });
        }
      } else {
        federatedSignIn("Google")
          .then(async (data) => {
            if (data) {
              completeOrder(data);
            } else {
              setFormError("errorMsg");
              setLoading(false);
            }
          })
          .catch((err) => {
            setFormError(err);
            setLoading(false);
          });
      }
    }
  };
  return (
    <div
      className="stripe-element"
      style={{
        position: loadingCheckout ? "absolute" : "relative",
        top: loadingCheckout ? "-100vw" : "0",
        opacity: loadingCheckout ? "0" : "1",
        transition: "opacity 1s ease-in-out",
      }}
    >
      <p className="checkout-title">{t("payment")}</p>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement
          id="payment-element"
          onReady={() => {
            setTimeout(() => {
              setLoadingCheckout(false);
            }, 300);
          }}
        />
        <button
          className={`normal-button`}
          disabled={loading || !stripe || !elements}
          id="submit"
        >
          {loading ? (
            <><Image
              height={35}
              width={40}
              src="/img/icon-spinner.svg"
              alt="spinner"
              className="spinner"
            /> {t("pleaseWait")}...</>
          ) : user?.uid ? (
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
          <p className="error-message" id="payment-message">
            &#9940; {message.charAt(0).toUpperCase() + message.slice(1)}
          </p>
        )}
        {formError && (
          <p className="error-message" id="payment-message">
            &#9940; {t(signUpError ? signUpError : formError)}
          </p>
        )}
      </form>
      <div className="card-warning">
        <Image height={17} width={17} src="/img/icon-alert.svg" alt="alert" />
        {t("chargedJpy")}
      </div>
    </div>
  );
};
export default React.memo(CheckoutStripeElement);
