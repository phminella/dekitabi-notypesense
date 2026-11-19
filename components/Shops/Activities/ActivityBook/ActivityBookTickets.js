import Price from "../../../UI/Price";
import ActivityBookPersons from "./ActivityBookPersons";
const ActivityBookTickets = ({
  tickets,
  setTickets,
  category,
  timeSlot,
  activity,
  t,
  currency,
  date,
  totalPersons,
}) => {
  return (
    <div className="book-tickets">
      <div className="book-tickets-category">
        <span>
          <Price
            value={activity?.price[category]}
            conversionType={"priceWithoutFee"}
            currency={currency}
          />
        </span>{" "}
        / {t(`shops:${category}`)}
      </div>
      <ActivityBookPersons
        activity={activity}
        timeSlot={timeSlot}
        category={category}
        tickets={tickets}
        setTickets={setTickets}
        date={date}
        totalPersons={totalPersons}
      />
    </div>
  );
};
export default ActivityBookTickets;
