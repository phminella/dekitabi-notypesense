import ItineraryDate from "../ItineraryDate";
import { ItineraryOptionsStyles } from "./styles/ItineraryOptionsStyles";
import React from "react";
import { User } from "../../../types/user";

import { Itinerary } from "../../../types/itinerary";

interface ItineraryOptionsProps {
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  itineraryDate: string;
  itineraryStartTime: string;
  itineraryStatus: boolean;
  id: string;
  user: User;
  t: (key: string) => string;
}

const ItineraryOptions = ({
  updateItineraryHandler,
  itineraryDate,
  itineraryStartTime,
  itineraryStatus,
  id,
  user,
  t,
}: ItineraryOptionsProps) => {
  return (
    <ItineraryOptionsStyles>
      <ItineraryDate
        updateItineraryHandler={updateItineraryHandler}
        itineraryMainDate={itineraryDate}
        itineraryStartTime={itineraryStartTime}
        itineraryStatus={itineraryStatus}
        id={id}
        user={user}
        t={t}
      />
    </ItineraryOptionsStyles>
  );
};
export default React.memo(ItineraryOptions);
