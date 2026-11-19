import { CartTimerStyles } from "./styles/CartTimerStyles";
import useCart from "../../lib/useCart";
import Image from "next/image";
import { useState } from "react";
const CartTimer = ({ t, cart }) => {
  const { clearCart } = useCart();
  const [timer, setTimer] = useState();
  const getTimeLeft = () => {
    if (cart?.timer) {
      const now = new Date().getTime();
      const timeLeft = now - cart?.timer;
      const minutes =
        59 - Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = 59 - Math.floor((timeLeft % (1000 * 60)) / 1000);
      if (minutes < 0) {
        clearCart();
      }
      setTimer({ minutes, seconds });
    }
  };
  var x = setInterval(function () {
    getTimeLeft();
    clearInterval(x);
  }, 1000);
  return (
    <CartTimerStyles>
      <Image
        height={20}
        width={20}
        src="/img/icon-fire.svg"
        alt="dekitabi-cart-timer"
        className="icon-fire"
      ></Image>
      {t("availableToCheckout")}{" "}
      {timer ? (
        <span>
          00:{timer?.minutes < 10 ? "0" : ""}
          {timer?.minutes}:{timer?.seconds < 10 ? "0" : ""}
          {timer?.seconds}
        </span>
      ) : (
        <Image
          src="/img/icon-spinner-white.svg"
          alt="dekitabi-cart-timer-time-left"
          height={19}
          width={19}
          style={{ margin: "0 !important" }}
          className="time-left-spinner"
        />
      )}
    </CartTimerStyles>
  );
};
export default CartTimer;
