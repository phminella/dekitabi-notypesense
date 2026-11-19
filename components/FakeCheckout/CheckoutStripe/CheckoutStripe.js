import { CheckoutStripeStyles } from "./styles/CheckoutStripeStyles";
import { useState, useEffect, useRef } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import CheckoutStripeElement from "./CheckoutStripeElement";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_PUBLISHABLE_KEY);
const CheckoutStripe = ({
  getTotal,
  currency,
  user,
  withSignUp,
  isGuide,
  setLoading,
  loading,
  t,
  signUpTab,
  language,
  coupon,
}) => {
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
      amount: 50,
      currency: "jpy",
      capture_method: "automatic_async",
      receipt_email: user?.email ? user?.email : "noreply@dekitabi.com",
      // setup_future_usage: "off_session",
      ...((currency?.code === "JPY" || currency?.code === "CNY") && {
        payment_method_types: ["card", "alipay", "wechat_pay"],
      }),
      ...(currency?.code !== "JPY" &&
        currency?.code !== "CNY" && {
          payment_method_types: ["card"],
        }),
      payment_method_options: {
        card: {
          capture_method: "manual",
          setup_future_usage: "off_session",
        },
      },
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
    if (!clientSecret && currency.rate && !noClientRef.current) {
      noClientRef.current = true;
      getClientSecrets();
    }
  }, [currency]);
  const options = {
    clientSecret,
    appearance,
    loader: "always",
    locale: language.code,
  };
  return (
    <CheckoutStripeStyles className="checkout-stripe">
      {clientSecret && options.clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutStripeElement
            user={user}
            withSignUp={withSignUp}
            isGuide={isGuide}
            setLoading={setLoading}
            loading={loading}
            t={t}
            signUpTab={signUpTab}
            getTotal={getTotal}
            clientSecret={clientSecret}
            updateStripePaymentIntent={updateStripePaymentIntent}
            createStripeCustomer={createStripeCustomer}
            language={language}
            currency={currency}
            coupon={coupon}
          />
        </Elements>
      )}
    </CheckoutStripeStyles>
  );
};
export default CheckoutStripe;
