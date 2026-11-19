import { HeaderNotificationsStyles } from "./styles/HeaderNotificationsStyles";
import HeaderNotificationsTitle from "./HeaderNotificationsTitle";
import NoNotifications from "./NoNotifications";
import dynamic from "next/dynamic";
const HeaderNotificationAcceptTour = dynamic(() =>
  import("./HeaderNotificationAcceptTour")
);
const HeaderNotificationRequirements = dynamic(() =>
  import("./HeaderNotificationRequirements")
);
const HeaderNotificationNormal = dynamic(() =>
  import("./HeaderNotificationNormal")
);
import Image from "next/image";
import setTimeAgoLocale from "../../../lib/setTimeAgoLocale";
import { useState, useEffect, useCallback } from "react";
import {
  doc,
  updateDoc,
  getFirestore,
  increment,
  deleteDoc,
  collection,
  where,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore/lite";
import React from "react";
const HeaderNotifications = ({ t, language, user, setShowNotifications }) => {
  const [notifications, setNotifications] = useState();
  const [loading, setLoading] = useState();
  const [timeAgo, setTimeAgo] = useState();
  const isGuide = user?.guide === "true" || user?.guide === true;
  const stripeRequirements =
    user?.stripeAccountRequirements || user?.stripeRequirements;
  const stripeCurrentlyDueCount = Array.isArray(stripeRequirements?.currently_due)
    ? stripeRequirements.currently_due.length
    : 0;
  const stripeEventuallyDueCount = Array.isArray(
    stripeRequirements?.eventually_due
  )
    ? stripeRequirements.eventually_due.length
    : 0;
  const stripePendingVerificationCount = Array.isArray(
    stripeRequirements?.pending_verification
  )
    ? stripeRequirements.pending_verification.length
    : 0;
  const stripeErrorsCount = Array.isArray(stripeRequirements?.errors)
    ? stripeRequirements.errors.length
    : 0;
  const stripeDisabledReason = stripeRequirements?.disabled_reason;
  const hasStripeRequirementsAlert =
    Boolean(stripeRequirements) &&
    (stripeCurrentlyDueCount > 0 ||
      stripeEventuallyDueCount > 0 ||
      stripePendingVerificationCount > 0 ||
      stripeErrorsCount > 0 ||
      Boolean(stripeDisabledReason));
  const notificationsCounter = Number(user?.notificationsCounter ?? 0);
  const hasUnreadNotifications = Number.isFinite(notificationsCounter)
    ? notificationsCounter > 0
    : Boolean(user?.notificationsCounter);
  const showNoNotificationsMessage =
    notifications?.length === 0 && (!isGuide || !hasStripeRequirementsAlert);
  const userRef = doc(getFirestore(), "users", user?.uid);
  const getNotifications = useCallback(async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      const q = query(
        collection(getFirestore(), "notifications"),
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const tempNotifications = [];
      querySnapshot.forEach((data) => {
        tempNotifications.push(data.data());
      });
      setNotifications(tempNotifications);
      if (
        tempNotifications.length === 0 &&
        !hasStripeRequirementsAlert &&
        hasUnreadNotifications
      ) {
        await updateDoc(userRef, { notificationsCounter: 0 });
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, [hasStripeRequirementsAlert, hasUnreadNotifications, user?.uid, userRef]);
  useEffect(() => {
    setTimeAgo(setTimeAgoLocale(language));
    getNotifications();
  }, [language, user?.notificationsCounter, getNotifications]);
  const removeNotification = async (notificationId) => {
    try {
      await deleteDoc(doc(getFirestore(), "notifications", notificationId));
      await updateDoc(userRef, { notificationsCounter: increment(-1) });
      setNotifications((prev) =>
        Array.isArray(prev)
          ? prev.filter((notification) => notification?.id !== notificationId)
          : prev
      );
    } catch (err) {
      console.error("Failed to remove notification:", err);
    }
  };
  const removeAllNotifications = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(getFirestore(), "notifications"),
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const ids = querySnapshot.docs
        .map((snapshot) => snapshot.data()?.id)
        .filter(Boolean);

      if (ids.length === 0) {
        setNotifications([]);
        return;
      }

      const deletionResults = await Promise.allSettled(
        ids.map((id) => deleteDoc(doc(getFirestore(), "notifications", id)))
      );
      const deletedIds = ids.filter(
        (_, index) => deletionResults[index]?.status === "fulfilled"
      );
      const failedIds = ids.filter(
        (_, index) => deletionResults[index]?.status === "rejected"
      );

      setNotifications((prev) =>
        Array.isArray(prev)
          ? prev.filter((notification) => failedIds.includes(notification?.id))
          : prev
      );

      if (deletedIds.length > 0) {
        if (failedIds.length === 0) {
          await updateDoc(userRef, { notificationsCounter: 0 });
        } else {
          await updateDoc(userRef, {
            notificationsCounter: increment(-deletedIds.length),
          });
        }
      }
    } catch (err) {
      console.error("Failed to remove all notifications:", err);
    } finally {
      setLoading(false);
    }
  };
  if (!notifications) return <></>;
  return (
    <HeaderNotificationsStyles className="header-notifications">
      <div className={`notifications`}>
        <button
          className="close-icon"
          onClick={() => setShowNotifications(false)}
        >
          <Image
            src="/img/icon-close.svg"
            height={20}
            width={20}
            alt="close-dekitabi-notifications"
          />
        </button>
        <HeaderNotificationsTitle t={t} />
        {showNoNotificationsMessage && <NoNotifications t={t} />}
        {loading ? (
          <div className="loading-notifications">
            <Image
              height={60}
              width={60}
              src="/img/icon-spinner.svg"
              alt="loading-dekitabi-notifications"
            ></Image>
          </div>
        ) : (
          <>
            <ul className="notifications-ul">
              {notifications?.map((notification, i) => (
                <li
                  className={`notifications-li ${
                    notification.type === "tour" ? "li-tour" : ""
                  }`}
                  key={i}
                >
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="remove-notification"
                  >
                    <Image
                      height={12}
                      width={12}
                      src={`/img/icon-close.svg`}
                      alt="remove-dekitabi-notification"
                    ></Image>
                  </button>
                  {notification.type !== "tour" ? (
                    <HeaderNotificationNormal
                      notification={notification}
                      t={t}
                    />
                  ) : (
                    <HeaderNotificationAcceptTour
                      notification={notification}
                      setShowNotifications={setShowNotifications}
                      t={t}
                      userUid={user?.uid}
                    />
                  )}
                  <p className="notification-date">
                    {timeAgo?.format(
                      Math.floor(new Date().getTime()) -
                        (new Date().getTime() - notification?.createdAt)
                    )}
                  </p>
                </li>
              ))}
              {(stripeErrorsCount > 0 ||
                stripeCurrentlyDueCount > 0 ||
                stripeEventuallyDueCount > 0) &&
                stripeDisabledReason !==
                  "requirements.pending_verification" &&
                stripeDisabledReason !==
                  "under_review" && (
                  <li className="notifications-li">
                    <HeaderNotificationRequirements
                      t={t}
                      user={user}
                      setShowNotifications={setShowNotifications}
                      notification={
                        user?.stripeFirstTime
                          ? "missingInformation"
                          : "missingInformation2"
                      }
                    />
                  </li>
                )}
              {(stripeDisabledReason === "requirements.pending_verification" ||
                stripeDisabledReason === "under_review") && (
                <li className="notifications-li">
                  <HeaderNotificationRequirements
                    t={t}
                    user={user}
                    setShowNotifications={setShowNotifications}
                    notification={"requirements.pending_verification"}
                  />
                </li>
              )}
            </ul>{" "}
            {notifications?.length > 0 && (
              <div className="remove-all">
                <button onClick={removeAllNotifications}>
                  {t("removeAll")}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </HeaderNotificationsStyles>
  );
};
export default React.memo(HeaderNotifications);
