import { OrderStyles } from "./styles/OrderStyles";
import { OrderActivityStyles } from "./styles/OrderActivityStyles";
import { OrderTourStyles } from "./styles/OrderTourStyles";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import Price from "../../UI/Price";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import AttractionImage from "../../S/Attractions/AttractionImage";
import Link from "next/link";
const OrderActivity = ({ order, t }) => {
  const language = useSelector((state) => state.app.language);
  const [activity, setActivity] = useState();
  const getActivity = useCallback(async () => {
    try {
      const activityRef = doc(getFirestore(), "activities", order?.activityId);
      const tempActivity = await getDoc(activityRef);
      if (tempActivity.exists()) {
        let totalWithCancellationFee = tempActivity?.total;
        if (tempActivity?.status === "canceled") {
        }
        setActivity({
          ...tempActivity.data(),
          totalWithCancellationFee: totalWithCancellationFee,
        });
      } else {
        setActivity("fail");
      }
    } catch (err) {
      setActivity("fail");
    }
  }, [order?.activityId]);
  useEffect(() => {
    getActivity();
  }, [getActivity]);
  return (
    <OrderActivityStyles>
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
                  value={order?.total}
                  conversionType={
                    order?.payment ? "priceWithFee" : "priceWithoutFee"
                  }
                />
              </b>
            </p>
          </div>
          <div className="order-id">
            {t("orderId").toUpperCase()}: <b>{order?.id}</b>
          </div>
        </div>
        <div className="order-items">
          {!activity ? (
            <div
              className="flex-wrapper-five"
              style={{ justifyContent: "center", margin: "50px" }}
            >
              <Image
                height={45}
                width={45}
                src="/img/icon-spinner.svg"
                alt="spinner"
              ></Image>
            </div>
          ) : (
            <OrderTourStyles>
              <div className="order-image">
                <AttractionImage
                  attraction={activity?.photos ? activity?.photos[0] : ""}
                  size={500}
                  sizes={"(max-width:460px) 100vw, 200px"}
                />
              </div>
              <div className="order-item">
                {activity?.name ? (
                  <Link prefetch={false} href={`/book/${activity?.url}`}>
                    {activity?.translatedName
                      ? activity?.translatedName[language?.code]
                      : activity?.name}
                  </Link>
                ) : (
                  <div className="activity-removed">{t("activityRemoved")}</div>
                )}
                <p className="order-details">
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-calendar.svg"
                    alt="date"
                    className="icons"
                  ></Image>
                  <b>{dayjs(order?.date).format("MM/DD/YYYY")}</b>
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-clock.svg"
                    alt="start-time"
                    className="icons"
                  ></Image>{" "}
                  <b>{order?.time}</b>
                </p>
                <div style={{ margin: "5px 0" }}>
                  {order?.tickets?.map((ticket, i) => (
                    <div key={i}>
                      {t(`shops:${ticket?.category}`)} x <b>{ticket?.amount}</b>
                    </div>
                  ))}
                </div>
                {new Date()?.getTime() <
                  new Date(
                    `${order?.date} ${order?.time?.split("-")[1]}`
                  )?.getTime() &&
                  order?.status !== "canceled" &&
                  order?.status !== "completed" && (
                    <Link
                      prefetch={false}
                      className="cancel-activity"
                      href={`/cancel-activity/${order?.id}`}
                    >
                      {t("cancel")}
                    </Link>
                  )}
                {(order?.cancelationFee === 0 || order?.cancelationFee > 0) &&
                order?.payment &&
                order?.reason !== "auto-cancel" &&
                order?.reason !== "rejected" ? (
                  <div className="cancelation-fee">
                    <p>
                      {t("cancelationFee")}:{" "}
                      <b>
                        <Price
                          value={order?.total}
                          conversionType={"cancelationFee"}
                          currency={order?.currency}
                          cancelationFee={order?.cancelationFee}
                        />
                      </b>{" "}
                      ({order?.cancelationFee}%)
                    </p>
                    <p>
                      {t("serviceFee")}:{" "}
                      <b>
                        <Price
                          value={order?.total}
                          conversionType={"priceFee"}
                          currency={order?.currency}
                        />
                      </b>
                    </p>
                    <p>
                      {t("refund")}:{" "}
                      <b>
                        <Price
                          value={order?.total}
                          conversionType={"refund"}
                          currency={order?.currency}
                          cancelationFee={order?.cancelationFee}
                        />
                      </b>
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                {new Date()?.getTime() <
                  new Date(
                    `${order?.date} ${order?.time?.split("-")[1]}`
                  )?.getTime() &&
                order?.status !== "canceled" &&
                order?.status !== "completed" ? (
                  <div className="activity-status-wrapper">
                    <div className="activity-status">
                      <div className="activity-label">
                        {t("shops:reservation")}
                      </div>
                      <div
                        className={`activity-value ${
                          order?.status === "confirmed" ? "confirmed" : ""
                        }`}
                      >
                        {t(`shops:${order?.status}`)}
                      </div>
                    </div>
                    <div className="activity-status">
                      <div className="activity-label">{t("payment")}</div>
                      <div
                        className={`activity-value ${
                          order?.payment === "confirmed" ? "confirmed" : ""
                        }`}
                      >
                        {t(
                          `shops:${
                            order?.payment ? order?.payment : "payOnSite"
                          }`
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {" "}
                    <p
                      className={`order-status ${
                        new Date()?.getTime() >
                          new Date(
                            `${order?.date} ${order?.time?.split("-")[1]}`
                          )?.getTime() || order?.status === "completed"
                          ? "paid"
                          : ""
                      } ${order?.status === "canceled" ? "canceled" : ""}`}
                    >
                      {((new Date()?.getTime() >
                        new Date(
                          `${order?.date} ${order?.time?.split("-")[1]}`
                        )?.getTime() &&
                        order?.status === "confirmed") ||
                        order?.status === "completed") && (
                        <Image
                          height={15}
                          width={15}
                          src="/img/icon-check.svg"
                          alt="paid"
                        ></Image>
                      )}
                      {order?.status === "canceled" && (
                        <Image
                          height={15}
                          width={15}
                          src="/img/icon-close.svg"
                          alt="canceled"
                        ></Image>
                      )}
                      {t(
                        order?.status === "canceled" ? "canceled" : "completed"
                      )}
                    </p>
                  </>
                )}
              </div>
            </OrderTourStyles>
          )}
        </div>
        {order?.payment && (
          <div className="order-payment-method">
            {t("paidWithCC")}:
            <Image
              height={8}
              width={25}
              src={`/img/payment-methods/icon-${order?.paymentMethod?.card?.brand}.svg`}
              alt={`${order?.paymentMethod?.card?.brand}`}
            />
            <b>••••-••••-••••-{order?.paymentMethod?.card?.last4}</b>
            {order?.receipt &&
              order?.status !== "pending" &&
              (order?.payment === "confirmed" ||
                order?.payment === "refunded") &&
              order?.reason !== "auto-cancel" &&
              order?.reason !== "rejected" && (
                <a
                  href={order?.receipt}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  {t("viewReceipt")}
                </a>
              )}
          </div>
        )}
      </OrderStyles>
    </OrderActivityStyles>
  );
};
export default OrderActivity;
