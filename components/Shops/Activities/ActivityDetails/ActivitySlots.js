import dynamic from "next/dynamic";
const SingleDatePicker = dynamic(
  () => import("react-dates").then((mod) => mod.SingleDatePicker),
  { ssr: false }
);
import "react-dates/initialize";
import { useSelector, shallowEqual } from "react-redux";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import React, { useState, useEffect, useMemo } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

const ActivitySlots = ({
  activity,
  t,
  date,
  timeOptions,
  setDate,
  setTimeOptions,
  setTimeSlot,
}) => {
  const language = useSelector((state) => state?.app?.language, shallowEqual);
  const [dateInputFocus, setDateInputFocus] = useState(false);

  // Only calculate today's date once
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  // Helper to calculate time intervals based on activity's hours
  const calculateTimes = (activity, date) => {
    const weekday = date.day();
    const interval = activity?.duration;
    let timeSlots = [];

    if (activity?.activityHours[weekday]?.length > 0) {
      activity?.activityHours[weekday].forEach((time, i) => {
        if (i % 2 === 0) {
          let currentTime = time;
          let start = Date.parse(`01/01/2011 ${time}`);
          const closingTime = Date.parse(
            `01/01/2011 ${activity?.activityHours[weekday][i + 1]}`
          );

          while (start < closingTime) {
            let [hours, minutes] = currentTime.split(":").map(Number);
            minutes += interval;
            if (minutes >= 60) {
              hours = (hours + Math.trunc(minutes / 60)) % 24;
              minutes %= 60;
            }

            const formattedTime = `${hours < 10 ? `0${hours}` : hours}:${
              minutes < 10 ? `0${minutes}` : minutes
            }`;
            timeSlots.push(`${currentTime}-${formattedTime}`);
            currentTime = formattedTime;
            start = Date.parse(`01/01/2011 ${formattedTime}`);
          }
        }
      });
    }

    return timeSlots;
  };

  // Fetch times whenever the date changes
  useEffect(() => {
    if (activity && date) {
      const times = calculateTimes(activity, date);
      setTimeOptions(times);
    }
  }, [date, activity, setTimeOptions]);

  // Function to highlight days with availability
  const isDayHighlighted = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const availableTimes = activity?.availability[formattedDate];
    const hasAvailability =
      availableTimes &&
      Object.keys(availableTimes).some((time) => availableTimes[time] > 0);
    return (
      (activity?.withAvailability &&
        hasAvailability &&
        new Date(date).getTime() > today.getTime()) ||
      (!activity?.withAvailability &&
        activity.shop.openingHours[date.day()] &&
        activity.shop.openingHours[date.day()].length > 0 &&
        new Date(date).getTime() > today.getTime())
    );
  };

  // Function to block days in the past
  const isDayBlocked = (date) => {
    return dayjs(date).isSame(dayjs(today), "day");
  };

  return (
    <div className="activity-slots">
      <SingleDatePicker
        withPortal
        numberOfMonths={1}
        date={date?.locale(language?.code)}
        onDateChange={setDate}
        focused={dateInputFocus}
        onFocusChange={({ focused }) => setDateInputFocus(focused)}
        readOnly
        isDayHighlighted={isDayHighlighted}
        isDayBlocked={isDayBlocked}
        renderCalendarInfo={() => (
          <div className="label-wrapper">
            <div className="label">
              <div className="square"></div>
              {t(
                activity?.withAvailability
                  ? "shops:hasAvailability"
                  : "shops:open"
              )}
            </div>
          </div>
        )}
        id="itinerary-date"
      />
      <select
        onChange={(e) => setTimeSlot?.(e.target.value.split(" ")[0])}
        className="select-time-options"
        disabled={!date || !activity?.activityHours[date?.day()]?.length}
      >
        {timeOptions.length === 0 ? (
          <option value="">{t("closed")}</option>
        ) : (
          <option value="">{t("shops:selectTime")}</option>
        )}
        {timeOptions.map((time, i) => (
          <option key={i} value={time}>
            {" "}
            {/* Explicitly set the value prop */}
            {time}{" "}
            {activity?.withAvailability && (
              <>
                (
                {activity?.availability[date?.format("YYYY-MM-DD")] &&
                activity?.availability[date?.format("YYYY-MM-DD")][time] > 0
                  ? activity?.availability[date?.format("YYYY-MM-DD")][time]
                  : 0}
                )
              </>
            )}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ActivitySlots;
