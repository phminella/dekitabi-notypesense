import ActivitySlots from "../ActivityDetails/ActivitySlots";
import ActivityBookTickets from "./ActivityBookTickets";
import { ActivityBookStyles } from "./styles/ActivityBookStyles";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Price from "../../../UI/Price";
import Image from "next/image";
import { useRouter } from "next/router";
import { setDoc, doc, getFirestore } from "firebase/firestore/lite";
const ActivityBook = ({ activity, t, user }) => {
  const router = useRouter();
  let currency = useSelector((state) => state?.app?.currency);
  if (!activity?.withStripe) {
    currency = { code: "JPY", rate: 1, symbol: "¥" };
  }
  const categories = [
    "general",
    "adult",
    "universityStudent",
    "highSchoolStudent",
    "elementarySchoolStudent",
    "preSchooler",
    "infant",
    "senior",
    "disabledPerson",
  ];
  const [date, setDate] = useState(moment(new Date())?.add(1, "days"));
  const [timeOptions, setTimeOptions] = useState([]);
  const [timeSlot, setTimeSlot] = useState();
  const [tickets, setTickets] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState();
  const [totalPersons, setTotalPersons] = useState(0);
  useEffect(() => {
    setTickets({});
  }, [timeSlot, date]);
  useEffect(() => {
    if (tickets) {
      let tempTotalPrice = 0;
      let tempTotalPersons = 0;
      Object.entries(tickets).forEach(([category, persons]) => {
        tempTotalPrice = tempTotalPrice + activity?.price[category] * persons;
        tempTotalPersons = tempTotalPersons + persons;
      });
      setTotalPrice(tempTotalPrice);
      setTotalPersons(tempTotalPersons);
    }
  }, [tickets]);
  const book = async () => {
    setLoading(true);
    let tempTickets = [];
    Object.entries(tickets).forEach(([category, persons]) => {
      tempTickets.push({ category, amount: persons });
    });
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
      activityId: activity?.id,
      date: date.format("YYYY-MM-DD"),
      time: timeSlot,
      tickets: tempTickets,
      createdAt: new Date().getTime(),
      total: totalPrice,
      currency,
      type: "activity",
    };
    const orderRef = doc(getFirestore(), "orders", tempOrder?.id);
    setDoc(orderRef, tempOrder).then(() => {
      router
        .push(`/book/confirmation?booking=${orderId}`)
        .then(() => {
          router.reload();
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    });
  };
  return (
    <ActivityBookStyles>
      <div className="book-labels">
        <p>{t("shops:date")}</p>
        <p>{t("time")}</p>
      </div>
      <ActivitySlots
        setTimeSlot={setTimeSlot}
        timeOptions={timeOptions}
        setTimeOptions={setTimeOptions}
        activity={activity}
        date={date}
        setDate={setDate}
        t={t}
      />
      <div className="activity-price-categories">
        {categories?.map((category, i) => {
          if (activity?.price[category]) {
            return (
              <div key={i}>
                <ActivityBookTickets
                  t={t}
                  category={category}
                  activity={activity}
                  timeSlot={timeSlot}
                  tickets={tickets}
                  setTickets={setTickets}
                  currency={currency}
                  date={date.format("YYYY-MM-DD")}
                  totalPersons={totalPersons}
                />
              </div>
            );
          }
        })}
      </div>
      <div className="total-price-wrapper">
        <p className="total-price-label">
          {t("total")}{" "}
          {!activity?.withStripe && <>({t("shops:taxIncluded")})*</>}:
        </p>
        <p className="total-price-value">
          <Price
            value={totalPrice}
            conversionType={"priceWithoutFee"}
            currency={currency}
          />
        </p>
      </div>
      {!activity?.withStripe && (
        <p className="pay-on-site">*{t("shops:payOnSiteMsg")}</p>
      )}
      {((!activity?.withAvailability && totalPersons > activity?.persons?.to) ||
        (activity?.withAvailability &&
          activity?.availability[date.format("YYYY-MM-DD")] &&
          totalPersons >
            activity?.availability[date.format("YYYY-MM-DD")][timeSlot])) && (
        <p className="error-message">
          &#9940;
          {t(`shops:onlySpotsAvailable`, {
            amount: activity?.withAvailability
              ? activity?.availability[date.format("YYYY-MM-DD")][timeSlot]
              : activity?.persons?.to,
          })}
        </p>
      )}
      {totalPersons < activity?.persons?.from && totalPersons > 0 && (
        <p className="error-message">
          &#9940;
          {t(`shops:onlyMoreThanPersons`, { min: activity?.persons?.from })}
        </p>
      )}
      <button
        className="normal-button"
        disabled={
          totalPrice < 1 ||
          loading ||
          user?.guide === "true" ||
          totalPersons > activity?.persons?.to ||
          (activity?.withAvailability &&
            activity?.availability[date.format("YYYY-MM-DD")] &&
            totalPersons >
              activity?.availability[date.format("YYYY-MM-DD")][timeSlot]) ||
          (totalPersons < activity?.persons?.from && totalPersons > 0)
        }
        onClick={book}
      >
        {!loading ? (
          <>
            <Image
              height={22}
              width={22}
              src="/img/icon-calendar.svg"
              alt="date"
              className="icons"
            ></Image>
            {t("shops:continueToReservation")}
          </>
        ) : (
          <Image
            height={22}
            width={22}
            src="/img/icon-spinner-white.svg"
            alt="spinner"
            className="icons"
          ></Image>
        )}
      </button>
    </ActivityBookStyles>
  );
};
export default ActivityBook;
