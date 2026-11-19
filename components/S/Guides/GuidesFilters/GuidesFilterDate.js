import { AttractionsFilterDateStyles } from "../../Attractions/AttractionsFilter/styles/AttractionsFilterDateStyles";
import dynamic from "next/dynamic";
const SingleDatePicker = dynamic(
  () => import("react-dates").then((mod) => mod.SingleDatePicker),
  { ssr: false }
);
import CustomYearReactDates from "../../../UI/CustomYearReactDates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { useState } from "react";
import moment from "dayjs";
import { useSelector } from "react-redux";
const GuidesFilterDate = ({
  date,
  setDate,
  disabled,
  t,
  placeholder = "date",
}) => {
  const [dateInputFocus, setDateInputFocus] = useState(false);
  let today = new Date();
  today?.setHours(0, 0, 0, 0);
  const language = useSelector((state) => state.app.language);
  moment.locale(language?.code.toLowerCase());
  return (
    <AttractionsFilterDateStyles>
      <SingleDatePicker
        disabled={disabled}
        readOnly
        numberOfMonths={1}
        date={date}
        withPortal={true}
        onDateChange={(date) => {
          setDate(date);
        }}
        renderMonthElement={
          placeholder === "date"
            ? ({ month }) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ textTransform: "capitalize" }}>
                    {month.format("MMMM")}
                  </span>
                </div>
              )
            : CustomYearReactDates
        }
        isOutsideRange={(date) => {
          const today = moment();
          const momentDate = moment(date);
          return placeholder === "date"
            ? today?.diff(momentDate) > 0
            : today?.diff(momentDate, "years") < 13;
        }}
        placeholder={t(placeholder)}
        focused={dateInputFocus}
        onFocusChange={({ focused }) => {
          setDateInputFocus(focused);
        }}
        isDayBlocked={(date) => {
          if (
            placeholder === "date" &&
            moment(date)?.format("MM/DD/YYYY") ===
              moment(new Date())?.format("MM/DD/YYYY")
          ) {
            return true;
          }
        }}
        id="itinerary-date"
      />
    </AttractionsFilterDateStyles>
  );
};
export default GuidesFilterDate;
