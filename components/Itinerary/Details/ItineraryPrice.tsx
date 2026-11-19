// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import { ItineraryPriceStyles } from "./styles/ItineraryPriceStyles";
import React, { useEffect, useState } from "react";
import Price from "../../UI/Price";
import { useSelector } from "react-redux";
import { User } from "../../../types/user";

import { RootState } from "../../../store/store";

interface ItineraryPriceProps {
  guideFee?: number;
  itineraryPersons?: number;
  t: (key: string, options?: any) => string;
  itineraryPrice?: number;
  itineraryStatus: boolean;
  itineraryCurrency?: string;
  itineraryGuideData?: any;
  user: User;
  currency?: string;
  itineraryCreatedBy?: string;
}

const ItineraryPrice = ({
  guideFee = 0,
  itineraryPersons = 1,
  t,
  itineraryPrice = 0,
  itineraryStatus,
  itineraryCurrency,
  itineraryGuideData,
  user,
}: ItineraryPriceProps) => {
  const currency = useSelector((state: RootState) => state.app.currency);
  const [price, setPrice] = useState(itineraryPrice);

  useEffect(() => {
    if (itineraryStatus) {
      setPrice(itineraryPrice);
    } else {
      setPrice(guideFee);
    }
  }, [guideFee, itineraryPrice, itineraryPersons, itineraryCurrency, itineraryStatus]);

  return (
    <ItineraryPriceStyles
      className={`itinerary-price ${
        itineraryGuideData?.uid === user?.uid ? "align-left" : ""
      }`}
    >
      <div className="price-p">
        <b>
          <Price
            currency={itineraryCurrency ? itineraryCurrency : (currency as string)}
            value={price}
            conversionType="priceWithoutFee"
          />
        </b>
        {itineraryPersons > 1 && (
          <>
            <Price
              currency={itineraryCurrency ? itineraryCurrency : (currency as string)}
              value={price}
              people={itineraryPersons}
              conversionType="pricePerPerson"
            />
            {" / "}
          </>
        )}
        {t("perPerson")}
      </div>
    </ItineraryPriceStyles>
  );
};
export default React.memo(ItineraryPrice);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
