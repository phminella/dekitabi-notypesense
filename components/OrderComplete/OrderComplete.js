import { OrderCompleteStyles } from "./styles/OrderCompleteStyles";
import { OrderCompleteResponsiveStyles } from "./styles/responsive/OrderCompleteResponsiveStyles";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import CartTour from "../Cart/CartTour";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Spinner from "../UI/Spinner";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import HomeStep1 from "../Home/HomeStep1";
import Price from "../UI/Price";
const OrderComplete = () => {
  const user = useSelector((state) => state.app.user, shallowEqual);
  const router = useRouter();
  const language = useSelector((state) => state.app.language, shallowEqual);
  const { t } = useTranslation();
  const [order, setOrder] = useState();
  const getOrder = async () => {
    const orderRef = doc(getFirestore(), "orders", router?.query.orderId);
    const orderSnap = await getDoc(orderRef);
    const tempOrder = orderSnap?.data();
    let items = await Promise.all(
      tempOrder?.items?.map(async (item) => {
        const itemRef = doc(getFirestore(), "itineraries", item?.item);
        const itemSnap = await getDoc(itemRef);
        const attractionRef = doc(
          getFirestore(),
          "attractions",
          itemSnap?.data()?.attractions[0]
        );
        const attractionSnap = await getDoc(attractionRef);
        return { ...itemSnap?.data(), attractions: [attractionSnap?.data()] };
      })
    );
    setOrder({ ...tempOrder, items });
  };
  useEffect(() => {
    if (router?.query?.orderId) {
      getOrder();
    }
  }, [router?.query?.orderId]);
  if (!order) return <Spinner />;
  return (
    <OrderCompleteResponsiveStyles>
      <OrderCompleteStyles>
        <Head>
          <title>
            {order?.id} {t("orderComplete")}
          </title>
        </Head>
        <div
          className={`order-wrapper ${order?.items?.length > 0 ? "show" : ""}`}
        >
          <div className="order-title">
            <h1>
              <Image
                height={35}
                width={35}
                src="/img/icon-check.svg"
                alt="check"
              />
              {t("orderComplete")}
            </h1>
            <p>
              {t("orderNumber")}: <b>{order?.id}</b>
            </p>
          </div>
          <Link prefetch={false} className="back-home" href="/">
            {t("continueBrowsing")}
          </Link>
          <div className="order-charge">
            <p>
              <b>
                <Image
                  height={25}
                  width={25}
                  src="/img/icon-payment.svg"
                  alt="payment"
                />
                {t("totalCharged")}:
              </b>{" "}
              <span>{order?.currency?.symbol}0</span>
            </p>
            <p>
              <b>{t("waitingForGuide")}:</b>
              <span>
                <Price
                  currency={order?.currency}
                  value={order?.items}
                  conversionType={"totalWithFee"}
                  coupon={order?.coupon}
                  likesCounter={user?.likesCounter}
                />
              </span>
            </p>
          </div>
          <ul className="order-details">
            {order?.total > 0 && (
              <>
                <li>{t("orderTourInfo")}</li>
                <li>{t("orderTourInfo2")}</li>
                {user?.uid ? (
                  <li>{t("orderTourInfoForUsers")}</li>
                ) : (
                  <li>
                    {t("orderTourInfoForGuests")} (<b>{router?.query.email}</b>)
                  </li>
                )}
              </>
            )}
          </ul>
          <div className="order-cart">
            <h3>
              <Image
                height={25}
                width={25}
                src="/img/icon-order-summary.svg"
                alt="order-summary"
              />
              <div>
                {" "}
                {t("orderSummary")}*
                {/* <br />
                <span>*{t("feeNotIncluded")}</span> */}
              </div>
            </h3>
            {order?.items?.map((item, i) => (
              <CartTour
                key={i}
                item={item}
                t={t}
                language={language}
                coupon={item?.coupon}
                order={true}
              />
            ))}
          </div>
          <h2>{t("recommendedPrefectures")}</h2>
          <HomeStep1 t={t} language={language} />
        </div>
      </OrderCompleteStyles>
    </OrderCompleteResponsiveStyles>
  );
};
export default OrderComplete;
