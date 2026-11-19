import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Price from "../../UI/Price";
import useDate from "../../../lib/useDate";
import TimeLeft from "../../UI/TimeLeft";
import isMobile from "../../../lib/isMobile";
import Spinner from "../../UI/Spinner";
import { getLanguageFlagSrc } from "../../../lib/languageFlags";
//
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { getFirestore, updateDoc, doc } from "firebase/firestore/lite";
const Payment = ({
  id,
  tour,
  setTour,
  language,
  setPaymentCompleted,
  loading,
  setLoading,
  clientSecret,
  t,
  getTour,
}) => {
  const [loadingPay, setLoadingPay] = useState(false);
  const { toTimeLength } = useDate();
  //   let stripeCheckoutParams = {
  //     capture_method: "automatic_async",
  //     confirm: true,
  //     currency: tour?.currency?.code,
  //     customer: tour?.customerId,
  //     receipt_email: user?.email ? user?.email : tour?.travelerContact,
  //     payment_method_types: [
  //       tour?.paymentMethod.type === "alipay" ? "alipay" : "wechat_pay",
  //     ],
  //     payment_method_data: {
  //       type: tour?.paymentMethod.type === "alipay" ? "alipay" : "wechat_pay",
  //     },
  //     ...(tour?.paymentMethod.type === "wechat_pay" && {
  //       payment_method_options: {
  //         wechat_pay: {
  //           client: "web",
  //         },
  //       },
  //     }),
  //     // return_url: `https://www.dekitabi.com/payment/${id}`,
  //     return_url: `http://localhost:3000/payment/${id}`,
  //     amount: chargeAmount(tour?.price, tour?.currency),
  //     transfer_group: tour?.guide,
  //   };
  //   await createStripePaymentIntent(stripeCheckoutParams)
  //     .then((res) => {
  //       console.log(res);
  //       updateDoc(doc(getFirestore(), "itineraries", tour?.id), {
  //         paymentIntent: res.data.id,
  //       }).then(() => {
  //         if (tour?.paymentMethod.type === "alipay") {
  //           router?.push(res.data.next_action.alipay_handle_redirect.url);
  //         } else {
  //           router?.push(
  //             res.data.next_action.wechat_pay_display_qr_code
  //               .hosted_instructions_url
  //           );
  //         }
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoadingPay(false);
  //     });
  // };
  const pay = () => {
    getTour()
      .then((startPayment) => {
        if (startPayment) {
          setLoadingPay(true);
          handleStripePayment();
        }
      })
      .catch((err) => console.log(err));
  };
  //
  //
  //
  const [error, setError] = useState();
  const elements = useElements();
  const stripe = useStripe();
  useEffect(() => {
    if (!stripe || !tour) {
      return;
    } else {
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
      if (!clientSecret) {
        return;
      }
      if (tour?.status === "waitingPay") {
        stripe
          .retrievePaymentIntent(clientSecret)
          .then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
              case "succeeded":
                setTour({ ...tour, paymentIntentId: paymentIntent.id });
                updateDoc(doc(getFirestore(), "itineraries", tour?.id), {
                  paymentIntentId: paymentIntent.id,
                })
                  .then(() => {
                    setPaymentCompleted(true);
                  })
                  .catch((e) => console.log(e));
                break;
              case "processing":
                console.log("Your payment is processing.");
                break;
              case "requires_payment_method":
                console.log(
                  "Your payment was not successful, please try again."
                );
                setError("errorMsg");
                break;
              default:
                console.log("Something went wrong.");
                setError("errorMsg");
                break;
            }
          })
          .catch((err) => console.log(err));
      }
    }
  }, [setPaymentCompleted, setTour, stripe, tour]);
  const handleStripePayment = async () => {
    setLoadingPay(true);
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
        return_url: `${window.location.origin}/payment/${id}`,
      },
    });
    if (error.type === "validation_error") {
      setLoadingPay(false);
      setError("errorMsg");
    } else {
      setLoadingPay(false);
      setError("errorMsg");
    }
  };
  return (
    <>
      <Image
        src="/img/logo.png"
        height={45}
        width={141}
        alt="logo"
        priority={true}
      />
      {(loading || !clientSecret) && <Spinner />}
      <div
        className="payment-wrapper"
        style={{ display: loading || !clientSecret ? "none" : "block" }}
      >
        <div className="timer-wrapper">
          <Image
            height={15}
            width={15}
            src="/img/icon-clock.svg"
            alt="fire"
            className="icon-clock"
          ></Image>
          {t("timeUntilAutoCancel")}
          <span>
            <TimeLeft tour={tour} />
          </span>
        </div>
        <h1>{t("payment")}</h1>
        <p className="payment-subtitle">{t("paymentSubtitle")}</p>
        <p className="tour-name">
          <b>{tour?.name}</b>{" "}
          <Link
            prefetch={false}
            href={`https://www.dekitabi.com/itinerary/${tour?.id}`}
            target={isMobile() ? "_self" : "_blank"}
            rel="noreferrer"
          >
            {t("viewItinerary")}
          </Link>
        </p>
        <ul className="tour-details">
          <li>
            <p>{t("primaryLanguage")}: </p>
            <p className="language">
              <Image
                src={getLanguageFlagSrc(tour?.primaryLanguage)}
                height={15}
                width={20}
                alt={tour?.primaryLanguage}
              />
              {tour?.primaryLanguage}
            </p>
          </li>
          <li>
            <p>{t("date")}:</p>
            <p>
              {(new Date(tour?.date).getMonth() > 8
                ? new Date(tour?.date).getMonth() + 1
                : "0" + (new Date(tour?.date).getMonth() + 1)) +
                "/" +
                (new Date(tour?.date).getDate() > 9
                  ? new Date(tour?.date).getDate()
                  : "0" + new Date(tour?.date).getDate()) +
                "/" +
                new Date(tour?.date).getFullYear()}
            </p>
          </li>
          <li>
            <p>{t("startTime")}:</p>
            <p>{tour?.startTime}</p>
          </li>
          <li>
            <p>{t("duration")}:</p>
            <p>{toTimeLength(tour?.duration, language.code)}</p>
          </li>
          <li>
            <p>{t("persons")}:</p>
            <p>{tour?.person}</p>
          </li>
          <li>
            <p>{t("meetingPlace")}:</p>
            <p>
              {tour?.meetingPlace
                ? tour?.meetingPlace.translatedName
                  ? tour?.meetingPlace.translatedName[language.code]
                  : tour?.meetingPlace.name
                : tour?.attractions[0].translatedName[language.code]}
              <a
                href={
                  tour?.meetingPlace
                    ? `${tour?.meetingPlace?.mapUrl}&hl=${language?.code}`
                    : `${tour?.attractions[0]?.mapUrl}&hl=${language?.code}`
                }
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                {t("viewWithGoogleMaps")}
              </a>
            </p>
          </li>
        </ul>
        <ul className="payment-details">
          <li>
            <p>{t("tourPrice")}</p>
            <p>
              <Price
                currency={tour?.currency}
                value={tour?.price}
                conversionType={"priceWithoutFee"}
                coupon={tour?.coupon}
              />
            </p>
          </li>
          <li>
            <p>{t("serviceFee")}</p>
            <p>
              <Price
                currency={tour?.currency}
                value={tour?.price}
                conversionType={"priceFee"}
                coupon={tour?.coupon}
              />
            </p>
          </li>
          <li className="total">
            <p>{t("total")}</p>
            <p>
              <Price
                currency={tour?.currency}
                value={tour?.price}
                conversionType={"priceWithFee"}
                coupon={tour?.coupon}
              />
            </p>
          </li>
        </ul>
        {tour?.id && (
          <PaymentElement
            id="payment-element"
            onReady={() => {
              setTimeout(() => {
                setLoading(false);
              }, 300);
            }}
          />
        )}
        {error && <p className="error">⛔{error}</p>}
        {!loadingPay ? (
          <button onClick={pay} disabled={loadingPay} className="normal-button">
            {t("pay")}
          </button>
        ) : (
          <div className="normal-button">
            <Image
              src="/img/icon-spinner.svg"
              height={35}
              width={35}
              alt="spinner"
            />
          </div>
        )}
      </div>
    </>
  );
};
export default Payment;
