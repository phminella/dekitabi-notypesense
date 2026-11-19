import { OrderStyles } from "./styles/OrderStyles";
import OrderTour from "./OrderTour";
import Image from "next/image";
import dayjs from "dayjs";
import Price from "../../UI/Price";
const Order = ({ order, t }) => {
  return (
    <OrderStyles>
      <div className="order-header">
        <div className="order-placed">
          <p className="label">{t("orderPlaced")}</p>
          <p>
            <b>{dayjs(order?.createdAt).format("MM/DD/YYYY")}</b>
          </p>
        </div>
        <div className="order-total">
          <p className="label">{t("total")}</p>
          <p>
            <b>
              <Price
                currency={order?.currency}
                value={order?.items}
                conversionType={"totalWithCancelationFee"}
                coupon={order?.coupon}
              />
            </b>
          </p>
        </div>
        <div className="order-id">
          {t("orderId").toUpperCase()}: <b>{order?.id}</b>
        </div>
      </div>
      <div className="order-items">
        {order?.items?.map((item, i) => {
          if (item?.type === "tour") {
            return (
              <div key={i} className="order-item">
                <OrderTour tour={item} t={t} />
              </div>
            );
          }
        })}
      </div>
      <div className="order-payment-method">
        {order?.paymentMethod?.type === "card" ? (
          <>
            {t("paidWithCC")}:
            <Image
              height={8}
              width={25}
              src={`/img/payment-methods/icon-${order?.paymentMethod?.card?.brand}.svg`}
              alt={`${order?.paymentMethod?.card?.brand}`}
            />
            <b>••••-••••-••••-{order?.paymentMethod?.card?.last4}</b>
          </>
        ) : (
          <>
            <Image
              height={25}
              width={25}
              src={`/img/payment-methods/icon-${
                order?.paymentMethod?.type === "alipay" ? "alipay" : "wechat"
              }.svg`}
              alt={`${order?.paymentMethod?.type}`}
            />
            <b>
              {t("paidWith", {
                type:
                  order?.paymentMethod?.type === "alipay"
                    ? "Alipay"
                    : "Wechat Pay",
              })}
            </b>
          </>
        )}
      </div>
    </OrderStyles>
  );
};
export default Order;
