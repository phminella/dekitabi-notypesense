import { CheckoutStripeStyles } from "./styles/CheckoutStripeStyles";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useState, useEffect, useRef } from "react";
import CheckoutStripeElement from "./CheckoutStripeElement";
import convertFromYen from "../../../../../lib/convertFromYen";
import Skeleton from "@mui/material/Skeleton";
const stripePromise = loadStripe(process.env.STRIPE_TEST_PUBLISHABLE_KEY);
const CheckoutStripe = ({
  t,
  complete,
  loading,
  user,
  language,
  booking,
  signUpTab,
  formInput,
}) => {
  const total = convertFromYen(booking?.currency, booking?.total, "stripe");
  let functions;
  let createStripeCheckout;
  let createStripeCustomer;
  let updateStripePaymentIntent;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    createStripeCheckout = httpsCallable(functions, "createStripeCheckout");
    updateStripePaymentIntent = httpsCallable(
      functions,
      "updateStripePaymentIntent"
    );
    createStripeCustomer = httpsCallable(functions, "testcreateStripeCustomer");
  } catch (err) {
    console.log(err);
  }
  const [clientSecret, setClientSecret] = useState();
  const [loadingCheckout, setLoadingCheckout] = useState(true);
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
  const getClientSecrets = async () => {
    let stripeCheckoutParams = {
      test: true,
      amount: total,
      currency: booking?.currency?.code,
      transfer_group: booking?.activity?.shopId,
      capture_method: "automatic_async",
      receipt_email: user?.email ? user?.email : "noreply@dekitabi.com",
      // setup_future_usage: "off_session",
      payment_method_types: ["card"],
      ...(!booking?.activity?.withAvailability && {
          payment_method_options: {
            card: {
              capture_method: "manual",
              setup_future_usage: "off_session",
            },
          },
        }),
      // automatic_payment_methods: { enabled: true },
    };
    await createStripeCheckout(stripeCheckoutParams)
      .then((res) => {
        console.log(res);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.log(err));
  };
  const noClientRef = useRef();
  useEffect(() => {
    if (!clientSecret && booking?.currency.rate && !noClientRef.current) {
      noClientRef.current = true;
      getClientSecrets();
    }
  }, []);
  const options = {
    clientSecret,
    appearance,
    loader: "always",
    locale: language.code,
  };
  return (
    <CheckoutStripeStyles>
      {clientSecret && options.clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutStripeElement
            user={user}
            loading={loading}
            t={t}
            complete={complete}
            clientSecret={clientSecret}
            updateStripePaymentIntent={updateStripePaymentIntent}
            createStripeCustomer={createStripeCustomer}
            language={language}
            booking={booking}
            signUpTab={signUpTab}
            formInput={formInput}
            loadingCheckout={loadingCheckout}
            setLoadingCheckout={setLoadingCheckout}
          />
        </Elements>
      )}{" "}
      {loadingCheckout && (
        <div className="stripe-element-skeleton">
          <p className="checkout-title">{t("payment")}</p>
          <div className="grid-3">
            <Skeleton variant="rounded" width={"100%"} height={60} />
            <div className="grid-2">
              <Skeleton variant="rounded" width={"100%"} height={60} />
              <Skeleton variant="rounded" width={"100%"} height={60} />
            </div>
          </div>
          <Skeleton variant="rounded" width={"100%"} height={60} />
          <Skeleton
            style={{ marginTop: "15px" }}
            variant="rounded"
            width={"100%"}
            height={20}
          />
          <Skeleton
            style={{ margin: "20px 0" }}
            variant="rounded"
            width={"100%"}
            height={50}
          />
          <Skeleton
            style={{ marginTop: "15px" }}
            variant="rounded"
            width={"100%"}
            height={30}
          />
        </div>
      )}
    </CheckoutStripeStyles>
  );
};
export default CheckoutStripe;
