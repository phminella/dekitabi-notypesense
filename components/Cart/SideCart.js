import { SideCartStyles } from "./styles/SideCartStyles";
import Image from "next/image";
import SideCartCheckout from "./SideCartCheckout";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import useCart from "../../lib/useCart";
import { setShowCart } from "../../store/appSlice";
import CartTour from "./CartTour";
import React from "react";
import { useTranslation } from "next-i18next";
import useNetwork from "../../lib/useNetwork";
import CartTimer from "./CartTimer";
const SideCart = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.app.currency, shallowEqual);
  const showCart = useSelector((state) => state.app.showCart, shallowEqual);
  const cart = useSelector((state) => state.app.cart, shallowEqual);
  const { t } = useTranslation();
  const { removeFromCart } = useCart();
  const { isOnline } = useNetwork();
  return (
    <SideCartStyles className={showCart ? "show" : ""}>
      <div
        className="cart-bg"
        onClick={() => dispatch(setShowCart(false))}
      ></div>
      <div className="cart-wrapper">
        {!showCart ? (
          <></>
        ) : (
          <>
            <button
              className="close-cart"
              onClick={() => dispatch(setShowCart(false))}
            >
              <Image
                src="/img/icon-close.svg"
                height={20}
                width={20}
                alt="close-dekitabi-cart"
                priority={true}
              />
            </button>
            <h3>{t("yourCart")}</h3>
            {cart?.items?.length > 0 && cart?.timer && (
              <CartTimer cart={cart} t={t} />
            )}
            <div className="cart">
              {(!cart?.items || cart?.items?.length === 0) && (
                <p className="empty-cart">{t("emptyCart")}</p>
              )}
              {cart?.items?.map((item, i) => {
                return (
                  <CartTour
                    key={i}
                    item={item}
                    removeFromCart={removeFromCart}
                    t={t}
                    currency={currency}
                  />
                );
              })}
            </div>
            {isOnline && (
              <SideCartCheckout
                setShowCart={setShowCart}
                cart={cart}
                t={t}
                currency={currency}
              />
            )}
          </>
        )}
      </div>
    </SideCartStyles>
  );
};
export default React.memo(SideCart);
