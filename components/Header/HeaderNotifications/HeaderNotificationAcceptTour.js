import { HeaderNotificationAcceptTourStyles } from "./styles/HeaderNotificationAcceptTourStyles";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import TimeLeft from "../../UI/TimeLeft";
import isMobile from "../../../lib/isMobile";
import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  getFirestore,
  deleteDoc,
  updateDoc,
  increment,
} from "firebase/firestore/lite";
const HeaderNotificationAcceptTour = ({
  notification,
  t,
  setShowNotifications,
  userUid,
}) => {
  const [tour, setTour] = useState();
  const getTour = async () => {
    const bookedTourRef = doc(
      getFirestore(),
      "itineraries",
      notification.newItineraryId
    );
    const bookedTourSnap = await getDoc(bookedTourRef);
    if (bookedTourSnap.exists()) {
      const tourData = bookedTourSnap.data();
      let travelerUsername = "Guest";
      if (tourData?.createdBy !== "Guest") {
        const travelerRef = doc(getFirestore(), "users", tourData?.createdBy);
        const travelerSnap = await getDoc(travelerRef);
        const traveler = travelerSnap?.data();
        travelerUsername = traveler?.firstname
          ? traveler?.firstname
          : traveler?.username;
      }
      setTour({ ...tourData, travelerUsername });
    } else {
      const userRef = doc(getFirestore(), "users", userUid);
      updateDoc(userRef, { notificationsCounter: increment(-1) });
      deleteDoc(doc(getFirestore(), "notifications", notification?.id));
    }
  };
  useEffect(() => {
    getTour();
  }, []);
  if (!tour) return <></>;
  return (
    <HeaderNotificationAcceptTourStyles>
      <div className="notification-message">
        <b>{t("tourRequestNotificationTitle")}</b>
        <div className="tour-info">
          {t("timeUntilAutoCancel")} {tour?.date && <TimeLeft tour={tour} />}
        </div>
      </div>
      <div className="tour-details">
        <Image
          height={12}
          width={12}
          src="/img/icon-calendar.svg"
          alt="dekitabi-tour-date"
        ></Image>
        {dayjs(tour?.date).format("MM/DD/YYYY")}
        <Image
          height={12}
          width={12}
          src="/img/icon-clock.svg"
          alt="dekitabi-tour-start-time"
        ></Image>
        {tour?.startTime}
        <Link
          className="audio-guide-attraction"
          href={`/itinerary/${tour?.id}`}
          target={isMobile() ? "_self" : "_blank"}
          rel="noreferrer"
          prefetch={false}
        >
          {t("viewItinerary")}
        </Link>
      </div>
      <div className="notification-contact">
        <div className="contact-label">{t("travelersContact")}:</div>

        <div className="contact-value">
          {tour?.createdBy !== "Guest" ? (
            <>
              <Image
                height={14}
                width={14}
                src="/img/icon-chat2.svg"
                alt="traveler-dekitabi-chat-username"
              ></Image>
              {tour?.travelerUsername}
            </>
          ) : (
            <>
              <Image
                height={9}
                width={14}
                src="/img/icon-email.svg"
                alt="dekitabi-traveler-email-address"
              ></Image>
              {tour?.travelerContact}
            </>
          )}
        </div>
      </div>
      <Link
        prefetch={false}
        className="normal-button"
        href={"/account/tours"}
        onClick={() => setShowNotifications(false)}
      >
        <Image
          height={25}
          width={25}
          src="/img/icon-tour.svg"
          alt="view-dekitabi-tour-itinerary"
        ></Image>
        {t("viewTour")}
      </Link>
    </HeaderNotificationAcceptTourStyles>
  );
};
export default React.memo(HeaderNotificationAcceptTour);
