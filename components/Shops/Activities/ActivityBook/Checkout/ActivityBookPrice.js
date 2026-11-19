import Price from "../../../../UI/Price";
import { ActivityDetailsStyles } from "./styles/ActivityDetailsStyles";

const ActivityBookPrice = ({ t, booking }) => {
  return (
    <ActivityDetailsStyles className="price">
      <ul>
        {booking?.tickets?.map((ticket, i) => (
          <li key={i}>
            {" "}
            {/* Add a key here */}
            <div>
              {t(`shops:${ticket?.category}`)} x {ticket?.amount}
            </div>
            <div className="value">
              <Price
                currency={booking?.currency}
                value={
                  booking?.activity?.price[ticket?.category] * ticket?.amount
                }
                conversionType={"priceWithoutFee"}
              />
            </div>
          </li>
        ))}
      </ul>
      {booking?.activity?.withStripe && (
        <ul>
          <li className="service-fee">
            <div className="label">{t("serviceFee")}</div>
            <div className="value service-fee">
              <Price
                currency={booking?.currency}
                value={booking?.total}
                conversionType={"priceFee"}
              />
            </div>
          </li>
        </ul>
      )}
      <ul className="total-list">
        <li>
          <div className="label">{t("total")}</div>
          <div className="value total">
            <Price
              currency={booking?.currency}
              value={booking?.total}
              conversionType={
                booking?.activity?.withStripe
                  ? "priceWithFee"
                  : "priceWithoutFee"
              }
            />
          </div>
        </li>
      </ul>
    </ActivityDetailsStyles>
  );
};

export default ActivityBookPrice;
