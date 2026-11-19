import { ItineraryPersonNumberStyles } from "./styles/ItineraryPersonNumberStyles";
import Image from "next/image";
import React, { useMemo } from "react";

import { Itinerary } from "../../../types/itinerary";

interface ItineraryPersonNumberProps {
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  itineraryMainPerson?: number;
  itineraryStatus: boolean;
  maxPeople?: number;
  maxPeopleTransport?: number;
  includeTransport?: boolean;
}

const ItineraryPersonNumber = ({
  updateItineraryHandler,
  itineraryMainPerson = 1,
  itineraryStatus,
  maxPeople,
  maxPeopleTransport,
  includeTransport,
}: ItineraryPersonNumberProps) => {
  const itineraryPersonNumberRange = useMemo(
    () =>
      Array.from(
        {
          length: maxPeople
            ? includeTransport
              ? maxPeopleTransport || maxPeople
              : maxPeople
            : 10,
        },
        (_, i) => i + 1
      ),
    [maxPeople, maxPeopleTransport, includeTransport]
  );

  const updateItineraryPerson = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateItineraryHandler({
      person: parseInt(e.target.value),
    });
  };

  return (
    <ItineraryPersonNumberStyles className="itinerary-person-number">
      <Image
        height={itineraryStatus ? 17 : 20}
        width={itineraryStatus ? 15 : 20}
        src="/img/icon-signin.svg"
        alt="login"
      />
      {!itineraryStatus ? (
        <select
          id="itinerary-person"
          value={itineraryMainPerson}
          onChange={(e) => {
            updateItineraryPerson(e);
          }}
        >
          {itineraryPersonNumberRange.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <span className="person-amount">{itineraryMainPerson}</span>
      )}
    </ItineraryPersonNumberStyles>
  );
};

export default React.memo(ItineraryPersonNumber);
