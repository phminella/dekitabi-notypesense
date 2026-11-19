import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import { useState, useEffect, useRef, useCallback } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useSelector } from "react-redux";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import PaymentCompleted from "./PaymentCompleted";
import PaymentNotFound from "./PaymentNotFound";
import { PaymentStyles } from "./styles/PaymentStyles";
import { useTranslation } from "next-i18next"; 
import Spinner from "../../UI/Spinner";
import Image from "next/image";
import convertFromYen from "../../../lib/convertFromYen";
const PaymentWrapper = ({ id }) => {
  const { t } = useTranslation();
  const language = useSelector((state) => state.app.language);
  const user = useSelector((state) => state.app.user);
  const [clientSecret, setClientSecret] = useState();
  const [loading, setLoading] = useState(true);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentNotFound, setPaymentNotFound] = useState(false);
  const [tour, setTour] = useState();
  const noClientRef = useRef();
  const tourRef = useRef();
  const appearance = {
    theme: "flat",
    labels: "floating",
    variables: {
      fontLineHeight: "1.5",
      borderRadius: "10px",
      colorBackground: "#F6F8FA",
      colorPrimaryText: "#262626",
    },
    rules: {
      ".Block": {
        backgroundColor: "var(--colorBackground)",
        boxShadow: "none",
        padding: "12px",
      },
      ".Input": {
        padding: "12px",
      },
      ".Input:disabled, .Input--invalid:disabled": {
        color: "lightgray",
      },
      ".Input:focus": {
        boxShadow: "none",
      },
      ".Tab": {
        padding: "10px 12px 8px 12px",
        border: "none",
      },
      ".Tab:hover": {
        border: "none",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
        border: "none",
        backgroundColor: "#fff",
        boxShadow:
          "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Label": {
        fontWeight: "500",
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
    loader: "always",
    locale: language.code,
  };
  const chargeAmount = useCallback((tourPrice, currency, tourCoupon) => {
    return convertFromYen(currency, tourPrice, "stripe", 0, 0, tourCoupon);
  }, []);
  const getTour = useCallback(async () => {
    try {
      const itineraryRef = doc(getFirestore(), "itineraries", id);
      const tourSnap = await getDoc(itineraryRef);
      let tempTour = tourSnap?.data();
      if (tempTour?.status === "waitingPay") {
        const attractionRef = doc(
          getFirestore(),
          "attractions",
          tempTour.attractions[0]
        );
        const attractionSnap = await getDoc(attractionRef);
        tempTour = { ...tempTour, attractions: [attractionSnap?.data()] };
        if (tourRef.current?.status !== tempTour?.status) {
          setTour(tempTour);
          return false;
        }
        return true;
      }
      if (
        tempTour?.status === "confirmed" ||
        tempTour?.status === "waitingReview" ||
        tempTour?.status === "completed"
      ) {
        setPaymentNotFound("paid");
        setLoading(false);
      } else {
        setPaymentNotFound("notFound");
        setLoading(false);
      }
      return false;
    } catch (err) {
      console.log(err);
      setPaymentNotFound("notFound");
      setLoading(false);
      return false;
    }
  }, [id]);
  const getClientSecrets = useCallback(async () => {
    if (!tour?.paymentMethod) {
      return;
    }
    try {
      const functions = getFunctions(undefined, "asia-northeast1");
      const createStripeCheckout = httpsCallable(
        functions,
        "createStripeCheckout"
      );
      let stripeCheckoutParams = {
        ...(tour?.test && { test: true }),
        amount: chargeAmount(tour?.price, tour?.currency, tour?.coupon),
        currency: tour?.currency?.code,
        capture_method: "automatic_async",
        receipt_email: user?.email ? user?.email : tour?.travelerContact,
        payment_method_types: [tour?.paymentMethod?.type],
      };
      const res = await createStripeCheckout(stripeCheckoutParams);
      setClientSecret(res.data.clientSecret);
    } catch (err) {
      console.log(err);
      setPaymentNotFound("notFound");
      setLoading(false);
    }
  }, [chargeAmount, tour, user]);
  useEffect(() => {
    tourRef.current = tour;
  }, [tour]);
  useEffect(() => {
    if (!tour) {
      getTour();
    }
  }, [getTour, tour]);
  useEffect(() => {
    if (!clientSecret && !noClientRef.current && tour?.paymentMethod) {
      noClientRef.current = true;
      getClientSecrets();
    }
  }, [clientSecret, getClientSecrets, tour?.paymentMethod]);
  if (paymentCompleted)
    return <PaymentCompleted user={user} tour={tour} t={t} />;
  if (paymentNotFound)
    return <PaymentNotFound t={t} paymentNotFound={paymentNotFound} />;
  return (
    <PaymentStyles>
      {clientSecret && options.clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <Payment
            id={id}
            tour={tour}
            setTour={setTour}
            language={language}
            loading={loading}
            setLoading={setLoading}
            setPaymentCompleted={setPaymentCompleted}
            t={t}
            clientSecret={clientSecret}
            getTour={getTour}
          />
        </Elements>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Image
            src="/img/logo.png"
            height={45}
            width={141}
            alt="logo"
            priority={true}
          />
          <Spinner />
        </div>
      )}
    </PaymentStyles>
  );
};
export default PaymentWrapper;
