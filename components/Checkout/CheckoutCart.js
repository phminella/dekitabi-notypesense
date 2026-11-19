import { CheckoutCartStyles } from "./styles/CheckoutCartStyles";
import CartTour from "../Cart/CartTour";
import Skeleton from "@mui/material/Skeleton";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import React from "react";
const CheckoutCart = ({ removeFromCart, t, loading, currency, cart }) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <CheckoutCartStyles className="checkout-cart">
      {cart?.items?.length === 0 && !loading && (
        <p className="empty-cart">{t("emptyCart")}</p>
      )}
      {cart?.items?.map((item, i) => {
        return (
          <div key={i}>
            {(loading || !cart) && (
              <Skeleton
                style={{
                  marginTop: "20px",
                }}
                key={i}
                variant="rounded"
                width={"100%"}
                height={120}
              />
            )}
            <div
              style={{
                position: loading ? "absolute" : "relative",
                top: loading ? "-100vw" : "0",
                opacity: loading ? "0" : "1",
                transition: "opacity 1s ease-in-out",
              }}
            >
              <CartTour
                item={item}
                removeFromCart={removeFromCart}
                t={t}
                // dateError={dateError}
                currency={currency}
              />
            </div>
          </div>
        );
      })}
    </CheckoutCartStyles>
  );
};
export default React.memo(CheckoutCart);
