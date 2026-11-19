import { ActivityCancelStyles } from "./styles/ActivityCancelStyles";
import { useEffect, useState } from "react";
import { updateDoc, doc, getDoc, getFirestore } from "firebase/firestore/lite";
import Spinner from "../../../UI/Spinner";
import Image from "next/image";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import ActivityStatusInfo from "../ActivityStatusInfo";
import axios from "axios"
import moment from "moment";
import Link from "next/link";
const ActivityCancel = ({ id }) => {
  let functions;
  let sendEmail;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    sendEmail = httpsCallable(functions, "sendEmail");
  } catch (err) {
    console.log(err);
  }
  const user = useSelector((state) => state?.app?.user);
  const language = useSelector((state) => state?.app?.language);
  const { t } = useTranslation();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);
  const [canceled, setCanceled] = useState();
  const [reason, setReason] = useState();
  const [reasonDetails, setReasonDetails] = useState("");
  const [error, setError] = useState(false);
  const cancelBooking = async (booking) => {
    setCanceling(true);
     axios({
      method: "post",
      url: `https://asia-northeast1-dekitabi.cloudfunctions.net/cancelActivity`,
      data: { order:booking ? booking : order, reason: booking ? "rejected" : reason },
    })
      .then((data) => {
        setCanceled(true);
        setCanceling(false)
      }).catch(err => { console.log(err); setCanceling(false); setError("errorMsg")});
  };
  const getOrder = async () => {
    getDoc(doc(getFirestore(), "orders", id)).then((orderDoc) => {
      if (orderDoc.exists()) {
        if (
          (orderDoc?.data()?.status === "pending" ||
            orderDoc?.data()?.status === "confirmed") &&
          new Date()?.getTime() <
            new Date(`${orderDoc?.data()?.date} ${orderDoc?.data()?.time?.split("-")[1]}`)?.getTime()
        ) {
          getDoc(
            doc(getFirestore(), "activities", orderDoc.data().activityId)
          ).then(async (activityDoc) => {
            if (
              user?.uid === activityDoc?.data()?.shopId &&
              orderDoc?.data()?.status === "pending"
            ) {
              setOrder({ ...orderDoc.data(), activity: activityDoc.data() });
              setLoading(false);
              cancelBooking({ ...orderDoc.data(), activity: activityDoc.data()});
            } else {
              const shopData = await getDoc(
                doc(getFirestore(), "shops", orderDoc.data().shopId)
              );
              const getShopCancellationFee = () => {
                let cancellationFee = 0;
                let daysLeft = Math.round(
                  Math.abs(
                    (moment(new Date(), "DD-MM-YYYY").startOf("day").valueOf() -
                      moment(new Date(orderDoc?.data()?.date), "DD-MM-YYYY")
                        .startOf("day")
                        .valueOf()) /
                      (1000 * 3600 * 24)
                  )
                );
                for (let i = 0; i < shopData?.data()?.cancellationPolicy?.length; i++) {
                  if (
                    daysLeft <= shopData?.data()?.cancellationPolicy[i]?.days &&
                    (daysLeft > shopData?.data()?.cancellationPolicy[i - 1]?.days ||
                      !shopData?.data()?.cancellationPolicy[i - 1]?.days)
                  ) {
                    cancellationFee = shopData?.data()?.cancellationPolicy[i]?.fee;
                    break;
                  }
                }
                return cancellationFee;
              };
              setOrder({ ...orderDoc.data(), activity: activityDoc.data(), cancellationFee: getShopCancellationFee(), shopUrl:shopData?.data()?.url });
              setLoading(false);
            }
          });
        } else {
          setOrder(orderDoc.data());
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    if (user) {
      getOrder();
    }
  }, [user]);
  if (loading) return <Spinner />;
  if (canceled)
    return (
      <ActivityStatusInfo
        t={t}
        status={"completed"}
        msg={
          user?.uid === order?.activity?.shopId && order?.status === "pending"
            ? t("shops:activityRejected", {
                name: order?.activity?.translatedName
                  ? order?.activity?.translatedName[language?.code]
                  : order?.activity?.name,
              })
            : t("shops:activityCanceled", {
                name: order?.activity?.translatedName
                  ? order?.activity?.translatedName[language?.code]
                  : order?.activity?.name,
              })
        }
        order={order}
      />
    );
  if (!order?.status)
    return (
      <ActivityStatusInfo t={t} msg={t("shops:noReservation")} order={order} />
    );
  if (order?.status === "canceled")
    return (
      <ActivityStatusInfo
        t={t}
        msg={t("shops:alreadyCanceled")}
        order={order}
      />
    );
  if (
    (new Date()?.getTime() >
      new Date(`${order?.date} ${order?.time?.split("-")[1]}`)?.getTime() &&
    order?.status === "confirmed") || order?.status === "completed"
  )
    return (
      <ActivityStatusInfo
        t={t}
        msg={t("shops:alreadyCompleted")}
        order={order}
      />
    );
  if (canceling)
    return (
      <ActivityStatusInfo
        t={t}
        msg={t("shops:cancelingActivity")}
        order={order}
        status={"loading"}
      />
    );
  if (user?.uid !== order?.customerId)
    return (
      <ActivityStatusInfo t={t} msg={t("shops:signInToCancel")} order={order} />
    );
  return (
    <ActivityCancelStyles>
      <div className="cancel-title">
        <h1>
          {" "}
          {order?.activity?.translatedName
            ? order?.activity?.translatedName[language?.code]
            : order?.activity?.name}
        </h1>
        <p>{t("shops:letUsKnowCancel")}</p>
      </div>
      <ul>
        {order?.payment && <li>
        <p className="cancellation-fee">{t("cancelationFee")}: <b>{order?.status==="confirmed" ? order?.cancellationFee : "0"}%</b> {" "}
        <Link prefetch={false} href={`/shop/${order?.shopUrl}`} target="_blank">
          {t("cancelationPolicy")}
        </Link></p></li>}
        <li>
          <input
            name="plans-changed"
            type="radio"
            checked={reason === "Travel plans changed"}
            onChange={() => setReason("Travel plans changed")}
          />{" "}
          {t("cancelReason4")}
        </li>{" "}
        <li>
          <input
            name="found-better"
            type="radio"
            checked={reason === "Found better elsewhere"}
            onChange={() => setReason("Found better elsewhere")}
          />{" "}
          {t("cancelReason5")}
        </li>
        <li>
          <input
            name="other"
            type="radio"
            checked={reason === "Other"}
            onChange={() => setReason("Other")}
          />{" "}
          {t("other")}
        </li>
        <textarea
          value={reasonDetails}
          placeholder={`${t("letKnowDetails")} (${t("optional")})`}
          onChange={(e) => setReasonDetails(e.target.value)}
          maxLength={1000}
        ></textarea>
        <p className="reason-counter">
          {t("charRemaining")}: {500 - reasonDetails.length}
        </p>
      </ul>
      {error && reason + reasonDetails !== "" && (
        <p className="error-message">&#9940;{t(error)}</p>
      )}
      {error && reason + reasonDetails === "" && (
        <p className="error-message">&#9940;{t("selectItem")}</p>
      )}{" "}
      <div className="cancel-buttons">
        <button
          className="normal-button"
          onClick={()=>cancelBooking()}
          disabled={user?.uid !== order?.customerId || reason + reasonDetails === ""}
        >
          {loading ? (
            <Image
              src="/img/icon-spinner-white.svg"
              alt="spinner"
              height={30}
              width={30}
            />
          ) : (
            t("cancel")
          )}
        </button>
      </div>
    </ActivityCancelStyles>
  );
};
export default ActivityCancel;
