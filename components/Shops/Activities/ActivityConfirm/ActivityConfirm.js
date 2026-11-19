import { useEffect, useState } from "react";
import { ActivityConfirmStyles } from "./styles/ActivityConfirmStyles";
import { updateDoc, doc, getDoc, getFirestore } from "firebase/firestore/lite";
import Spinner from "../../../UI/Spinner";
import Image from "next/image";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import ActivityStatusInfo from "../ActivityStatusInfo";
import axios from "axios";
const ActivityConfirm = ({ id }) => {
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
  const [confirmed, setConfirmed] = useState();
  const getOrder = async () => {
    getDoc(doc(getFirestore(), "orders", id)).then((orderDoc) => {
      if (orderDoc.exists()) {
        if (orderDoc.data().status === "pending") {
          getDoc(
            doc(getFirestore(), "activities", orderDoc.data().activityId)
          ).then((activityDoc) => {
            setOrder({ ...orderDoc.data(), activity: activityDoc.data() });
            setLoading(false);
            //
            // Start Confirming
            //
            //
            if (user?.uid === activityDoc?.data()?.shopId) {
              axios({
                method: "post",
                url: `https://asia-northeast1-dekitabi.cloudfunctions.net/confirmActivity`,
                data: { order:{ ...orderDoc.data(), activity: activityDoc.data() } },
              })
                .then((data) => {
                  console.log(data)
                  setConfirmed(true);
                }).catch(err => { console.log(err); setLoading(false)});
            } else {
              setLoading(false);
            }
            //
            //
            //
            //
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
  if (confirmed)
    return (
      <ActivityStatusInfo
        t={t}
        status={"completed"}
        msg={t("shops:activityConfirmed", {
          name: order?.activity?.translatedName
            ? order?.activity?.translatedName[language?.code]
            : order?.activity?.name,
        })}
        order={order}
      />
    );
  if (!order?.status)
    return (
      <ActivityStatusInfo t={t} msg={t("shops:noReservation")} order={order} />
    );
  if (
    new Date()?.getTime() >
      new Date(`${order?.date} ${order?.time?.split("-")[1]}`)?.getTime() &&
    order?.status === "confirmed"
  )
    return (
      <ActivityStatusInfo
        t={t}
        msg={t("shops:alreadyCompleted")}
        order={order}
      />
    );
  if (order?.status === "canceled")
    return (
      <ActivityStatusInfo
        t={t}
        msg={t("shops:alreadyCanceled")}
        order={order}
      />
    );
  if (order?.status === "confirmed")
    return (
      <ActivityStatusInfo
        t={t}
        msg={t("shops:alreadyConfirmed")}
        order={order}
      />
    );
  if (user?.uid !== order?.activity?.shopId)
    return (
      <ActivityStatusInfo
        t={t}
        msg={t("shops:signInToConfirm")}
        order={order}
        status={"signInShop"}
      />
    );
  return (
    <ActivityStatusInfo
      t={t}
      msg={t("shops:confirmingActivity")}
      order={order}
      status={"loading"}
    />
  );
};
export default ActivityConfirm;
