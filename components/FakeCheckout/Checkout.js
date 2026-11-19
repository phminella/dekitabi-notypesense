import { CheckoutStyles } from "./styles/CheckoutStyles";
import { CheckoutResponsiveStyles } from "./styles/responsive/CheckoutResponsiveStyles";
import { useTranslation } from "next-i18next";
import { useSelector, shallowEqual } from "react-redux";
import useCart from "../../lib/useCart";
import CheckoutCart from "../Checkout/CheckoutCart";
import CheckoutSignin from "../Checkout/CheckoutSignin/CheckoutSignin";
import CheckoutStripe from "./CheckoutStripe/CheckoutStripe";
import CheckoutSubTotal from "../Checkout/CheckoutStripe/CheckoutSubTotal";
import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
import CheckoutBackground from "../Checkout/CheckoutBackground";
import CheckoutAccountCreated from "../Checkout/CheckoutAccountCreated";
const Checkout = () => {
  const user = useSelector((state) => state.app.user, shallowEqual);
  const language = useSelector((state) => state.app.language, shallowEqual);
  const currency = useSelector((state) => state.app.currency, shallowEqual);
  const cart = useSelector((state) => state.app.cart, shallowEqual);
  const { t } = useTranslation();
  const { removeFromCart } = useCart();
  const [withSignUp, setWithSignUp] = useState(false);
  const [signUpTab, setSignUpTab] = useState("email");
  const [isGuide, setIsGuide] = useState(user?.guide === "true" ? true : false);
  const [loading, setLoading] = useState(true);
  const [coupon, setCoupon] = useState("");
  return (
    <CheckoutResponsiveStyles>
      <CheckoutStyles className="checkout">
        <Head>
          <title>{t("checkout")}</title>
        </Head>
        <div className="checkout-left-side">
          <h2 className="checkout-title">
            <Image
              height={35}
              width={35}
              src="/img/icon-stripe.svg"
              alt="stripe"
            />
            <Image
              height={35}
              width={35}
              src="/img/icon-https.svg"
              alt="https"
            />
            {t("checkoutTitle")}
            <span>powered by Stripe</span>
          </h2>
          {user?.uid && withSignUp && (
            <CheckoutAccountCreated t={t}></CheckoutAccountCreated>
          )}
          {user && !user?.uid && (
            <CheckoutSignin
              withSignUp={withSignUp}
              isGuide={isGuide}
              setWithSignUp={setWithSignUp}
              setIsGuide={setIsGuide}
              t={t}
              loading={loading}
              signUpTab={signUpTab}
              setSignUpTab={setSignUpTab}
            />
          )}
          <h2 className="review-items">
            <Image
              height={25}
              width={25}
              src="/img/icon-check.svg"
              alt="check"
            />
            1. {t("reviewItems")}
          </h2>
          <CheckoutCart
            removeFromCart={removeFromCart}
            language={language}
            t={t}
            loading={loading}
            cart={cart}
            currency={currency}
          />
          <CheckoutSubTotal
            currency={currency}
            cart={cart}
            loading={loading}
            t={t}
            setCoupon={setCoupon}
            coupon={coupon}
            user={user}
          />
        </div>
        <div className="checkout-right-side">
          <CheckoutBackground />
          <CheckoutStripe
            currency={currency}
            user={user}
            withSignUp={withSignUp}
            isGuide={isGuide}
            setLoading={setLoading}
            loading={loading}
            t={t}
            signUpTab={signUpTab}
            language={language}
            coupon={coupon}
          />
        </div>
      </CheckoutStyles>
    </CheckoutResponsiveStyles>
  );
};
export default Checkout;
