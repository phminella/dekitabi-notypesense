import { CheckoutSignUpTabsStyles } from "./styles/CheckoutSignUpTabsStyles";
import Image from "next/image";
const CheckoutSignUpTabs = ({ signUpTab, setSignUpTab, t }) => {
  return (
    <CheckoutSignUpTabsStyles className="checkout-signup">
      <button
        className={`email ${signUpTab === "email" ? "active" : ""}`}
        onClick={() => setSignUpTab("email")}
      >
        <Image src="/img/icon-email.svg" alt="email" height={13} width={20} />
        <span className="signin-button-text">{t("signUpWithEmail")}</span>
      </button>
      <button
        className={signUpTab === "Google" ? "active" : ""}
        onClick={() => setSignUpTab("Google")}
      >
        <Image src="/img/icon-google.svg" alt="google" height={17} width={17} />
        <span className="signin-button-text">{t("signUpWithGmail")}</span>
      </button>
    </CheckoutSignUpTabsStyles>
  );
};
export default CheckoutSignUpTabs;
