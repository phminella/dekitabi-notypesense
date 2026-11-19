import { CheckoutSubTotalStyles } from "./styles/CheckoutSubTotalStyles";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import Price from "../../UI/Price";
import Discounts from "../../UI/Discounts";
import CheckoutCoupon from "./CheckoutCoupon";
const CheckoutSubTotal = ({
  loading,
  t,
  cart,
  currency,
  setCoupon,
  coupon,
  user,
}) => {
  return (
    <CheckoutSubTotalStyles className="checkout-subtotal">
      <h2>
        <Image
          height={25}
          width={25}
          src="/img/icon-order-summary.svg"
          alt="order-summary"
        />{" "}
        2. {t("orderSummary")}
      </h2>
      {loading && <Skeleton variant="rounded" width={"100%"} height={150} />}
      {!coupon && !loading && <CheckoutCoupon t={t} setCoupon={setCoupon} />}
      <div
        style={{
          position: loading ? "absolute" : "relative",
          top: loading ? "-100vw" : "0",
          opacity: loading ? "0" : "1",
          transition: "opacity 1s ease-in-out",
        }}
      >
        <div className="sub-total">
          <div className="sub-total-label">{t("tours")}*</div>
          <div className="sub-total-price">
            <Price
              currency={currency}
              value={cart?.items}
              conversionType={"totalWithoutFee"}
            />
          </div>
        </div>
        {(coupon || user?.likesCounter > 9) && (
          <div className="sub-total coupon">
            <div className="sub-total-label">{t("discounts")}</div>
            <div className="sub-total-price">
              -
              <Discounts
                currency={currency}
                tours={cart?.items}
                likesCounter={user?.likesCounter}
                coupon={coupon}
              />
            </div>
          </div>
        )}
        <p className="tours-info">*{t("toursInfo")}</p>
        <div className="total-wrapper">
          <div className="sub-total percentage">
            <div className="sub-total-label">{t("serviceFee")}</div>
            <div className="sub-total-price">
              <Price
                currency={currency}
                value={cart?.items}
                conversionType={"totalFee"}
                coupon={coupon}
                likesCounter={user?.likesCounter}
              />
            </div>
          </div>
          <div className="sub-total total">
            <div className="sub-total-label">{t("total")}</div>
            <div className="sub-total-price">
              <Price
                currency={currency}
                value={cart?.items}
                conversionType={"totalWithFee"}
                coupon={coupon ? true : false}
                likesCounter={user?.likesCounter}
              />
            </div>
          </div>
        </div>
      </div>
    </CheckoutSubTotalStyles>
  );
};
export default CheckoutSubTotal;
