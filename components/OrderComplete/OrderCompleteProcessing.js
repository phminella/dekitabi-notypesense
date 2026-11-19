import { OrderCompleteProcessingStyles } from "./styles/OrderCompleteProcessingStyles";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Image from "next/image";
import autoId from "../../lib/autoId";
import { arrayUnion, doc, getFirestore, setDoc } from "firebase/firestore/lite";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useTranslation } from "next-i18next";
import dayjs from "dayjs";
import useTour from "../../lib/useTour";
import useCart from "../../lib/useCart";
import { useLeavePageConfirmation } from "../../lib/useLeavePageConfirmation";
import convertFromYen from "../../lib/convertFromYen";
import Spinner from "../UI/Spinner";
import getDiscountedPrice from "../../lib/getDiscountedPrice";
import { getLanguageFlagAbsoluteSrc } from "../../lib/languageFlags";
const OrderCompleteProcessing = () => {
  const cart = useSelector((state) => state.app.cart, shallowEqual);
  const user = useSelector((state) => state.app.user, shallowEqual);
  const router = useRouter();
  let functions;
  let sendEmail;
  let checkoutCharge;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    checkoutCharge = httpsCallable(functions, "checkoutCharge");
    sendEmail = httpsCallable(functions, "sendEmail");
  } catch (err) {
    console.log(err);
  }
  const language = useSelector((state) => state.app.language, shallowEqual);
  const itineraries = useSelector(
    (state) => state.itinerary.itineraries,
    shallowEqual
  );
  const { t } = useTranslation();
  const { createTour } = useTour();
  const { clearCart, getTotal } = useCart();
  const [progress, setProgress] = useState(0);
  const sendOrderEmail = async (paymentMethod, order) => {
    return sendEmail({
      to: router?.query.email,
      sender: "noreply@dekitabi.com",
      subject: `dekitabi | ${t("orderComplete")} ${order?.id}`,
      body: `<link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      /><div style="background:#f7f7f7; font-family: 'Poppins', sans-serif; padding:10px; font-size:15px">
    
<div style="text-align:center; padding:20px 0 20px 0">
<img
src="https://www.dekitabi.com/img/logo.png"
height="45"
width="141"
alt="dekitabi"
/></div>
<section style="background:white;max-width:600px;margin: 20px auto;border-top:4px solid #03c03c;border-radius:5px;padding:20px;">
 <h1 style="color: #03c03c; margin: 0; text-align:center">${t(
   "orderComplete"
 )}</h1>
  <h2>${t("hello")} ${
        user?.firstname ? `${user?.firstname} ${user?.lastname}` : t("traveler")
      },</h2>
  <p style="margin: 0 0 20px 0">
  ${t("orderThankYouMsg")} 
${t("guideWasInformed")}<br/><br/>${t("newTourRequestTravelerMsg1")} <br/>${t(
        "newTourRequestTravelerMsg2"
      )}<br/> <br/>${t("orderIdMsg")} <b>${order?.id}</b>
  </p>
</section>
<section style="background:white;max-width: 600px; margin: 20px auto;padding:20px;border-radius:5px">
<h3 style="margin:0">${t("orderSummary")}*</h3>
<p style="font-size:0.8em; margin-top:0">*${t("feeNotIncluded")}</p>
<ul style="list-style: none; margin: 0; padding:0">
${order?.items
  .map((item) => {
    return `<li style="padding-bottom:15px; margin:0 0 15px 0; border-bottom: 1px solid lightgray"><div style="width: 100%; position: relative"><div><p style="display: -webkit-box; -webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;font-weight: 700; margin: 0; margin-bottom: 2px;">
    <a href="https://www.dekitabi.com/itinerary/${
      item?.id
    }" target="_blank" rel="noreferrer" style="color:#2186eb">${
      item?.name
    }</a></p>
    <p style="margin: 0 0 5px 0;"><span style="border-radius: 5px; padding:3px 5px; background: #f3f3f3;font-size: 0.9em;"><img src="${getLanguageFlagAbsoluteSrc(
      item?.primaryLanguage
    )}" height="15px" width="20px" style="vertical-align:middle; margin-top:-3px;"/> ${
      item?.primaryLanguage
    }</span>     
      ${
        item?.transportIncluded
          ? `<span style="border-radius: 5px; padding:3px 5px; background: #f3f3f3;font-size: 0.9em;"><img src="https://www.dekitabi.com/img/icon-car.png" height="15px" width="15px" style="vertical-align:middle; margin-top:-3px;"/> ${t(
              "transportationIncluded"
            )}</span>`
          : ""
      }</p>
    <div style="margin:0 0 8px 0;"><img
    height="13"
    width="13"
    src="https://www.dekitabi.com/img/icon-calendar.png"
    alt="calendar"
    style="vertical-align:middle; margin-top:-3px;"
  /> ${dayjs(item?.date).format("MM/DD/YYYY")} <img
    height="13"
    width="13"
    src="https://www.dekitabi.com/img/icon-clock.png"
    alt="clock"
    style="vertical-align:middle; margin-top:-3px;"
  /> ${item?.startTime} <img
    height="13"
    width="13"
    src="https://www.dekitabi.com/img/icon-login.png"
    alt="persons"
    style="vertical-align:middle; margin-top:-3px;"
  /> ${item?.person} ${t("persons")}</div>
  <div style="margin-top: 2px">${t("meetingPlace")}:<b> ${
      item?.meetingPlace
        ? item?.meetingPlace?.translatedName
          ? item?.meetingPlace?.translatedName[language?.code]
          : item?.meetingPlace?.name
        : item?.attractions[0]?.translatedName
        ? item?.attractions[0]?.translatedName[language?.code]
        : item?.attractions[0]?.name
    } </b> <a href="${
      item?.meetingPlace
        ? item?.meetingPlace?.mapUrl
        : item?.attractions[0]?.mapUrl
    }" target="_blank" rel="noreferrer" style="color:#2186eb">${t(
      "viewWithGoogleMaps"
    )}</a>
    <p style="margin:0 0 5px 0">${t("guideContact")}: <b>${
      !user?.uid
        ? item?.guideData?.email
        : `dekitabi ${t("chat")}:${
            item?.guideData?.firstname
              ? `${item?.guideData?.firstname} ${item?.guideData?.lastname}`
              : item?.guideData?.username
          }`
    }</b></p>
    <div style="font-size:1.1em;font-weight: bold; margin:0 0 5px 0;">
      ${
        paymentMethod?.card?.brand === "jcb" ||
        paymentMethod?.card?.brand === "diners" ||
        paymentMethod?.card?.brand === "discover"
          ? `JPY${convertFromYen(
              { rate: 1, currency: t("jpYen"), code: "JPY", symbol: "¥" },
              item?.price,
              "priceWithoutFee",
              false,
              false,
              router?.query?.coupon,
              user?.likesCounter
            )}`
          : `${item?.currency?.symbol}
          ${convertFromYen(
            item?.currency,
            item?.price,
            "priceWithoutFee",
            false,
            false,
            router?.query?.coupon,
            user?.likesCounter
          )}`
      }</div><a href="https://www.dekitabi.com/cancel-tour/${
      item?.id
    }" target="_blank" rel="noreferrer" style="display:inline-flex; background:#ff2e4a; padding:10px; margin:3px 0; border-radius:5px; color:white; text-decoration:none">${t(
      "cancel"
    )}</a>  </div></li>`;
  })
  .join("")}  
</ul>
${
  user?.uid
    ? `${t(
        "cancelTourAccountMsg"
      )} <a href="https://www.dekitabi.com/account/tours" target="_blank" rel="noreferrer" style="color:#2186eb;">${t(
        "goToAccount"
      )}</a>. <br/>`
    : ""
}     
<a href="https://www.dekitabi.com/cancelation-policy" target="_blank" rel="noreferrer" style="color:#2186eb;">${t(
        "cancelationPolicy"
      )}</a> 
  </section>
  <section style="background:white; color:#000; max-width: 600px; margin: 20px auto;padding:20px;border-radius:5px">
  <h3 style="display:flex; gap:5px; align-items:center;margin: 0 0 5px 0; color:#000">
  ${
    paymentMethod?.type !== "card"
      ? `<img
  src="https://www.dekitabi.com/img/payment-methods/icon-${
    paymentMethod?.type === "alipay" ? "alipay" : "wechat"
  }.png"
  height="25"
  width="25"
  alt="payment-method"
  />`
      : ""
  } ${t("paymentDetails")}</h3>
  ${order?.items
    .map((item) => {
      return `<div style="padding:0 0 10px 0;"><p style="margin:0 0 3px 0; font-weight: bold;">${
        item?.name
      }</p>
  <p style="margin:0;">${
    paymentMethod?.card?.brand === "jcb" ||
    paymentMethod?.card?.brand === "diners" ||
    paymentMethod?.card?.brand === "discover"
      ? `JPY${item?.price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      : `${item?.currency?.symbol}${convertFromYen(
          item?.currency,
          item?.price,
          "priceWithoutFee",
          false,
          false,
          router?.query?.coupon,
          user?.likesCounter
        )}`
  }</p></div>`;
    })
    .join("")}
  <div style="padding-bottom:7px; font-size:0.9em; border-bottom:1px solid lightgray"><p style="margin:0 0 5px 0">${t(
    "10serviceFee"
  )}</p>
  <p style="margin:0">${
    paymentMethod?.card?.brand === "jcb" ||
    paymentMethod?.card?.brand === "diners" ||
    paymentMethod?.card?.brand === "discover"
      ? `JPY${(order?.total * 0.1)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      : `${order?.currency?.symbol}${convertFromYen(
          order?.currency,
          order?.items,
          "totalFee",
          false,
          false,
          router?.query?.coupon,
          user?.likesCounter
        )}`
  }</p>
  </div>
  <div style="padding:10px 0 0 0"><p style="margin:0 0 5px 0">${t(
    "waitingForGuide"
  )}</p>
  <p style="font-size:1.3em;color:#000; font-weight:bold; margin:0 0 10px 0">${
    paymentMethod?.card?.brand === "jcb" ||
    paymentMethod?.card?.brand === "diners" ||
    paymentMethod?.card?.brand === "discover"
      ? `JPY${(order?.total + order?.total * 0.1)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      : `${order?.currency?.symbol}${convertFromYen(
          order?.currency,
          order?.items,
          "totalWithFee",
          false,
          false,
          router?.query?.coupon,
          user?.likesCounter
        )}`
  }</p></div>        
  ${
    user?.uid
      ? `<a style="color:#2186eb" href="https://www.dekitabi.com/account/orders" target="_blank" rel="noreferrer">${t(
          "viewOrders"
        )}</a>`
      : ""
  }
  ${
    paymentMethod?.type === "card"
      ? `<div style="margin-top:10px"><p style="margin: 0 0 5px 0">${t(
          "willBePaidWithCC"
        )}</p>
  <p style="color:var(--darkBlue); font-weight:bold">xxxx-xxxx-xxxx-${
    paymentMethod?.card?.last4
  }</p></div>`
      : ""
  }
  ${
    paymentMethod?.type === "card"
      ? `<p style="margin:0 0 5px 0; font-weight: bold;">${t(
          "automaticChargeMsg"
        )}</p>`
      : `<p style="border-radius:15px;border:3px solid #FFAA33;padding:10px;color:var(--darkBlue); margin:10px 0 0 0">${t(
          "manualChargeMsg",
          {
            paymentMethod:
              paymentMethod?.type === "alipay" ? "Alipay" : "WeChat Pay",
          }
        )}</p>`
  }
  </section>      
  <section
  style="
    max-width: 600px;
    margin: 0 auto;
    position: relative;
    padding: 0 10px;
  "
>
  <div>
    <img src="https://www.dekitabi.com/img/logo.png" height="30" width="90" />
    <ul style="margin: 10px 0 0 0; list-style: none; float: right; display: block">
      <li style="display: inline; margin-left:5px">
        <a
          href="https://www.instagram.com/dekitabi"
          target="_blank"
          rel="noreferrer"
          style="text-decoration:none"
        >
          <img
            src="https://www.dekitabi.com/img/icon-instagram.png"
            alt="instagram"
            height="20"
            width="20"
          />
        </a>
      </li>
      <li style="display: inline; margin-left:5px">
        <a
          href="https://www.facebook.com/dekitabi"
          target="_blank"
          rel="noreferrer"
          style="text-decoration:none"
        >
          <img
            src="https://www.dekitabi.com/img/icon-facebook.png"
            alt="facebook"
            height="20"
            width="20"
          />
        </a>
      </li>
      <li style="display: inline; margin-left:5px">
        <a
          href="https://www.threads.net/@dekitabi"
          target="_blank"
          rel="noreferrer"
          style="text-decoration:none"
        >
          <img
            src="https://www.dekitabi.com/img/icon-threads.png"
            alt="threads"
            height="20"
            width="20"
          />
        </a>
      </li>
      <li style="display: inline; margin-left:5px">
        <a
          href="https://www.twitter.com/dekitabi"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="https://www.dekitabi.com/img/icon-twitter.png"
            alt="twitter"
            height="20"
            width="20"
          />
        </a>
      </li>
    </ul>
  </div>
  <p style="font-size: 0.8em">
    〒160-0023<br />
    東京都新宿区西新宿三丁目3番13号　西新宿水間ビル6階.
  </p>
  <div>
    <a
      href="https://play.google.com/store/apps/details?id=com.dekitabi"
      target="_blank"
      rel="noreferrer"
      style="margin-right: 5px; text-decoration:none"
    >
      <img
        src="https://www.dekitabi.com/img/icon-googleplay.png"
        alt="open"
        width="100"
        height="29"
      />
    </a>
    <a
      href="https://appgallery.huawei.com/#/app/C110443229"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src="https://www.dekitabi.com/img/icon-huawei.png"
        alt="open"
        width="100"
        height="29"
      />
    </a>
  </div>
</section>
  <p
    style="
      margin: 25px 0 0 0;
      color: #adadad;
      padding: 20px 0;
      border-top: 1px solid #adadad;
      font-size: 10px;
      background:white;
      text-align:center;
    "
  >
  ${t("doNotReplyEmail")}
  </p></div>`,
    })
      .then(() => {
        return true;
      })
      .catch((error) => console.log(error));
  };
  let charging = useRef(false);
  const customizedDialog = async (msg) => {
    const warning = await setDoc(
      doc(getFirestore(), "misc", "leftOrderProcessing"),
      {
        order: arrayUnion({ user, cart }),
      }
    );
    const confirmationValue = window.confirm(msg);
    return confirmationValue;
  };
  useLeavePageConfirmation(
    progress > 1 && cart?.items?.length > 0 ? true : false,
    t("leavePage"),
    customizedDialog
  );
  useEffect(() => {
    if (user && itineraries && cart && language?.code) {
      if (
        !charging?.current &&
        router?.query.payment_intent &&
        cart?.items?.length > 0
      ) {
        charging.current = true;
        if (router?.query.started === "true" && !router?.query?.orderId) {
          router?.push("/checkout");
        } else {
          chargeOrder();
        }
      } else if (!charging?.current && router?.query?.orderId) {
        window.location.replace(
          window.location.origin +
            `/order-complete?email=${router?.query.email}&orderId=${router?.query.orderId}`
        );
      }
    }
  }, [router?.query.payment_intent, user, language, itineraries, cart]);
  // Create order function
  const createOrder = async (customerId, paymentMethod) => {
    let orderId =
      "R81-" +
      Math.random()?.toString()?.slice(2, 6) +
      "-" +
      Date.now()?.toString()?.slice(0, 4) +
      "-" +
      Date.now()?.toString()?.slice(4, 8) +
      "-" +
      Date.now()?.toString()?.slice(8, 12);
    let tempOrder = {
      id: orderId,
      items: cart?.items,
      createdAt: new Date().getTime(),
      total: getTotal()?.total,
      currency:
        paymentMethod?.card?.brand === "jcb" ||
        paymentMethod?.card?.brand === "diners" ||
        paymentMethod?.card?.brand === "discover"
          ? { code: "JPY", rate: 1, symbol: "¥", currency: t("jpYen") }
          : cart?.currency,
      travelerId: user?.uid ? user?.uid : "Guest",
      ...(router?.query?.coupon && { coupon: true }),
    };
    setProgress(3);
    tempOrder = { ...tempOrder, paymentMethod };
    let emailOrder = { ...tempOrder, paymentMethod };
    router.query.started = "true";
    router.push(router);
    Promise.all(
      (tempOrder.items = tempOrder?.items?.map(async (item, i) => {
        let newItineraryId = autoId();
        let priceWithDiscount = getDiscountedPrice(
          item?.price,
          router?.query?.coupon,
          user?.likesCounter
        );
        let newOrderItem = {
          ...emailOrder?.items[i],
          id: newItineraryId,
          priceWithDiscount,
        };
        let newOrderItems = [...emailOrder?.items];
        newOrderItems?.splice(i, 1, newOrderItem);
        emailOrder = { ...emailOrder, items: newOrderItems };
        return createTour(
          language,
          paymentMethod?.card?.brand === "jcb" ||
            paymentMethod?.card?.brand === "diners" ||
            paymentMethod?.card?.brand === "discover"
            ? { code: "JPY", rate: 1, symbol: "¥", currency: t("jpYen") }
            : tempOrder?.currency,
          tempOrder?.id,
          newItineraryId,
          router?.query?.test && !router?.query?.coupon
            ? {
                ...item,
                test: true,
                ...(priceWithDiscount !== item?.price && {
                  priceWithDiscount,
                }),
              }
            : router?.query?.test && router?.query?.coupon
            ? {
                ...item,
                test: true,
                affiliateId: router?.query?.coupon,
                coupon: true,
                ...(priceWithDiscount !== item?.price && {
                  priceWithDiscount,
                }),
              }
            : !router?.query?.test && router?.query?.coupon
            ? {
                ...item,
                affiliateId: router?.query?.coupon,
                coupon: true,
                ...(priceWithDiscount !== item?.price && {
                  priceWithDiscount,
                }),
              }
            : {
                ...item,
                ...(priceWithDiscount !== item?.price && {
                  priceWithDiscount,
                }),
              },
          user?.uid ? user : "Guest",
          router?.query.email,
          paymentMethod,
          customerId,
          setProgress
        )
          .then(() => {
            return {
              type: item?.type,
              item: item?.type === "tour" ? newItineraryId : item?.id,
              priceBeforeFee: item?.price,
              ...(priceWithDiscount !== item?.price && {
                priceWithDiscount,
              }),
              buyer: user?.uid ? user?.uid : "Guest",
              guide: item?.type === "tour" ? item?.guide : item?.createdBy,
              status: item?.type === "tour" ? "pending" : "paid",
              currency:
                paymentMethod?.card?.brand === "jcb" ||
                paymentMethod?.card?.brand === "diners" ||
                paymentMethod?.card?.brand === "discover"
                  ? {
                      code: "JPY",
                      rate: 1,
                      symbol: "¥",
                      currency: t("jpYen"),
                    }
                  : tempOrder?.currency,
            };
          })
          .catch((err) => console.log(err));
      }))
    )
      .then((tempOrderItems) => {
        tempOrder.items = [...tempOrderItems];
        clearCart();
        sendOrderEmail(paymentMethod, emailOrder).then(() => {
          const orderRef = doc(getFirestore(), "orders", tempOrder?.id);
          setDoc(orderRef, tempOrder)
            .then(() => {
              router.query.orderId = tempOrder?.id;
              router.push(router);
              setProgress(5);
              window.location.replace(
                window.location.origin +
                  `/order-complete?email=${router.query.email}&orderId=${tempOrder?.id}`
              );
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };
  const chargeOrder = async () => {
    // Retrieve payment intent
    setProgress(1);
    checkoutCharge({
      secret: router.query.payment_intent,
      test: router.query.test,
    })
      .then((data) => {
        if (!data?.data?.tempCustomerId) {
          router.push("/checkout");
        } else {
          setProgress(2);
          createOrder(
            data?.data?.tempCustomerId,
            data?.data?.tempPaymentMethod
          );
        }
      })
      .catch((err) => {
        console.log("go back, RETRIEVE STRIPE PAYMENT METHOD WRONG");
        router.push("/checkout");
      });
  };
  if (progress === 0) return <Spinner />;
  return (
    <OrderCompleteProcessingStyles>
      <div className="loading-modal">
        <div className="loading-wrapper">
          <Image
            src="/img/logo.png"
            height={45}
            width={141}
            alt="logo"
            className="logo"
          />
          <p className="progress-default-message">
            {t("creatingOrder")} <br />
            {t("mayTakeSeconds")}
            <br />
            {t("dontClosePage")}
          </p>
          {progress >= 0 && (
            <ul className="progress-list">
              <li className={progress > 0 ? "completed" : ""}>
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-check.svg"
                  alt="checked"
                  className={progress > 1 ? "checked" : ""}
                />
                {t("creatingOrder1")}
              </li>
              <li className={progress > 1 ? "completed" : ""}>
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-check.svg"
                  alt="checked"
                  className={progress > 2 ? "checked" : ""}
                />
                {t("creatingOrder4")}
              </li>
              {user?.uid && (
                <li className={progress > 2 ? "completed" : ""}>
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-check.svg"
                    alt="checked"
                    className={progress > 3 ? "checked" : ""}
                  />
                  {t("creatingOrder2")}
                </li>
              )}
              <li className={progress > 3 ? "completed" : ""}>
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-check.svg"
                  alt="checked"
                  className={progress > 4 ? "checked" : ""}
                />
                {t("creatingOrder3")}
              </li>
            </ul>
          )}
          <div className="progress"></div>
        </div>
      </div>
    </OrderCompleteProcessingStyles>
  );
};
export default OrderCompleteProcessing;
