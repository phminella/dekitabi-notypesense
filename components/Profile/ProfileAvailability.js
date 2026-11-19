import { ProfileAvailabilityStyles } from "./styles/ProfileAvailabilityStyles";
import { Calendar } from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/purple.css";
import Image from "next/image";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import getCalendarLocales from "../../lib/getCalendarLocales";
import { useSelector } from "react-redux";
const ProfileAvailability = ({ profile, user, t }) => {
  const [availability, setAvailability] = useState();
  const [calendarLocales, setCalendarLocales] = useState();
  const language = useSelector((state) => state.app.language);
  useEffect(() => {
    if (language) {
      getCalendarLocales(language)
        .then((locales) => {
          setCalendarLocales(locales);
        })
        .catch((err) => console.log(err));
    }
  }, [language]);
  useEffect(() => {
    if (profile?.availability?.length > 0) {
      let dateObjectAvailability = [];
      profile?.availability?.map((date) => {
        dateObjectAvailability?.push(new DateObject(new Date(date)));
      });
      setAvailability(dateObjectAvailability);
    }
  }, [profile]);
  return (
    <ProfileAvailabilityStyles>
      <p className="availability-title">
        <Image
          height={20}
          width={20}
          src="/img/icon-availability.svg"
          alt="dekitabi-tour-guide-availability"
        />
        {t("daysAvailable")}
      </p>
      <Calendar
        format="MM/DD/YYYY"
        className="purple"
        multiple
        value={availability}
        readOnly
        locale={calendarLocales}
      />
      <div className="availability-label flex-wrapper-ten">
        <div className="today-label"></div> {t("today")}
        <div className="available-label"></div> {t("available")}
      </div>
      {!user?.uid && (
        <p className="request">
          <Image
            height={15}
            width={15}
            src="/img/icon-info2.svg"
            alt="create-dekitabi-account-to-request-tour-guide-availability"
          ></Image>
          {t("createToRequest")}
        </p>
      )}
      {profile?.availabilityUpdatedOn && (
        <p className="availability-update">
          {t("lastUpdatedOn")}:{" "}
          <b>
            {dayjs(profile?.availabilityUpdatedOn * 1000).format(
              "MM/DD/YYYY, h:mm:ss a"
            )}
          </b>
        </p>
      )}
    </ProfileAvailabilityStyles>
  );
};
export default React.memo(ProfileAvailability);
