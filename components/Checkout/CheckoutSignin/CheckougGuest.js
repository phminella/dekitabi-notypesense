import { CheckoutGuestStyles } from "./styles/CheckoutGuestStyles";
import Image from "next/image";
const CheckoutGuest = ({ setWithSignUp, t }) => {
  return (
    <CheckoutGuestStyles>
      <h2>
        <Image height={20} width={20} src="/img/icon-login.svg" alt="login" />
        {t("continueAsGuest")}
      </h2>
      <div className="guest-message">
        <ul>
          <li>{t("guestInfo")}</li>
          <li>{t("guestInfo2")}</li>
        </ul>
      </div>
      {t("or")}{" "}
      <button className="sign-up-button" onClick={() => setWithSignUp(true)}>
        {t("signUp")}
      </button>
    </CheckoutGuestStyles>
  );
};
export default CheckoutGuest;
