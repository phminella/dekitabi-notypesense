import { SideCartCheckoutStyles } from "./styles/SideCartCheckoutStyles";
import SideCartPaymentMethods from "./SideCartPaymentMethods";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Price from "../UI/Price";
const SideCartCheckout = ({ cart, t, setShowCart }) => {
  const dispatch = useDispatch();
  return (
    <SideCartCheckoutStyles>
      <div className="cart-checkout">
        {cart?.items?.length > 0 && (
          <>
            <div className="checkout-total">
              <p>{t("total")}</p>
              <p className="total-price">
                <Price
                  value={cart?.items}
                  conversionType={"totalWithoutFee"}
                  currency={cart?.currency}
                />
              </p>
            </div>
            <div className="checkout-button">
              {typeof navigator !== "undefined" ? (
                <>
                  {!navigator?.cookieEnabled ? (
                    <p className="warning-message">
                      <Image
                        src="/img/icon-alert.svg"
                        alt="dekitabi-alert-enable-cookies"
                        height={15}
                        width={15}
                      />
                      {t("enableCookiesCheckout")}
                    </p>
                  ) : (
                    <Link
                      prefetch={false}
                      onClick={() => dispatch(setShowCart(false))}
                      className="normal-button"
                      href={`/checkout`}
                    >
                      <Image
                        height={20}
                        width={20}
                        src="/img/icon-checkout.svg"
                        alt="continue-to-dekitabi-checkout"
                      />
                      {t("continueToCheckout")}
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  prefetch={false}
                  onClick={() => dispatch(setShowCart(false))}
                  className="normal-button"
                  href={`/checkout`}
                >
                  <Image
                    height={20}
                    width={20}
                    src="/img/icon-checkout.svg"
                    alt="checkout"
                  />
                  {t("continueToCheckout")}
                </Link>
              )}
            </div>
          </>
        )}
        <div className="checkout-payments">
          <SideCartPaymentMethods t={t} />
        </div>
      </div>
    </SideCartCheckoutStyles>
  );
};
export default SideCartCheckout;
