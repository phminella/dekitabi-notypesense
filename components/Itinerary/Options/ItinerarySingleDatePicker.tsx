import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-dates/initialize";
import moment from "moment";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../../store/store";

const SingleDatePicker = dynamic<any>(
  () => import("react-dates").then((mod) => mod.SingleDatePicker),
  { ssr: false }
);

interface ItinerarySingleDatePickerProps {
  itineraryDate: moment.Moment | null;
  setItineraryDate: (date: moment.Moment | null) => void;
}

const ItinerarySingleDatePicker = ({ itineraryDate, setItineraryDate }: ItinerarySingleDatePickerProps) => {
  const language = useSelector((state: RootState) => state.app.language, shallowEqual);
  const [dateInputFocus, setDateInputFocus] = useState(false);
  
  const langCode = language?.code.toLowerCase() || "en";
  moment.locale(langCode);

  return (
    <>
      <SingleDatePicker
        withPortal={true}
        numberOfMonths={1}
        date={itineraryDate ? itineraryDate.locale(langCode) : null}
        onDateChange={(date: moment.Moment | null) => {
          setItineraryDate(date);
        }}
        focused={dateInputFocus}
        onFocusChange={({ focused }: { focused: boolean }) => {
          setDateInputFocus(focused);
        }}
        readOnly
        isDayBlocked={(date: moment.Moment) => {
          return (
            moment(date).format("MM/DD/YYYY") ===
            moment(new Date()).format("MM/DD/YYYY")
          );
        }}
        id="itinerary-date"
      />
    </>
  );
};
export default React.memo(ItinerarySingleDatePicker);
