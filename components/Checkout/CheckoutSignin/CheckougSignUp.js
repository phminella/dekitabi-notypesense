import { CheckoutGuestStyles } from "./styles/CheckoutGuestStyles";
import Image from "next/image";
import CheckoutSignUpTabs from "./CheckoutSignUpTabs";
const CheckoutSignUp = ({
  setWithSignUp,
  t,
  isGuide,
  signUpTab,
  setSignUpTab,
  getTotal,
}) => {
  return (
    <CheckoutGuestStyles>
      <h2>
        <Image height={20} width={20} src="/img/icon-login.svg" alt="login" />{" "}
        {t("signUp")}
      </h2>
      <p>{t("checkoutSignUpMsg")}</p>
      {/* // Email */}
      <div className="sign-up-wrapper">
        {isGuide && getTotal().tours > 0 && (
          <p className="guide-alert">
            <Image
              height={20}
              width={20}
              src="/img/icon-alert.svg"
              alt="alert"
            ></Image>
            {t("cannotBookAsGuide")}
          </p>
        )}
        <CheckoutSignUpTabs
          t={t}
          signUpTab={signUpTab}
          setSignUpTab={setSignUpTab}
        />
      </div>
      {t("or")}{" "}
      <button className="sign-up-button" onClick={() => setWithSignUp(false)}>
        {t("checkoutAsGuest")}
      </button>
    </CheckoutGuestStyles>
  );
};
export default CheckoutSignUp;
