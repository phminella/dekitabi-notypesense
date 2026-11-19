import React from "react";

interface ItineraryAttractionTimeProps {
  t: (key: string) => string;
  attractionOpeningTime: (date: string, hours: string[]) => string;
  itineraryDate: string;
  attractionOpeningHours: string[];
}

const ItineraryAttractionTime = ({
  t,
  attractionOpeningTime,
  itineraryDate,
  attractionOpeningHours,
}: ItineraryAttractionTimeProps) => {
  const result = attractionOpeningTime(itineraryDate, attractionOpeningHours);
  return <>{t(result)}</>;
};

export default ItineraryAttractionTime;
