import { ItineraryStatusStyles } from "./styles/ItineraryStatusStyles";
import Image from "next/image";
import React from "react";

interface ItineraryStatusProps {
  itineraryStatus: string;
  t: (key: string) => string;
}

const ItineraryStatus = ({ itineraryStatus, t }: ItineraryStatusProps) => {
  return (
    <ItineraryStatusStyles
      className={`flex-wrapper-five ${
        itineraryStatus === "pending" || itineraryStatus === "waitingPay"
          ? "pending"
          : ""
      } ${itineraryStatus === "completed" ? "completed" : ""} ${
        itineraryStatus === "confirmed" ? "confirmed" : ""
      } ${itineraryStatus === "canceled" ? "canceled" : ""} ${
        itineraryStatus === "waitingReview" ? "waiting-review" : ""
      }`}
    >
      {(itineraryStatus === "pending" ||
        itineraryStatus === "waitingReview" ||
        itineraryStatus === "waitingPay") && (
        <Image
          height={15}
          width={15}
          src="/img/icon-clock.svg"
          alt="clock"
        ></Image>
      )}
      {itineraryStatus === "canceled" && (
        <Image
          height={15}
          width={15}
          src="/img/icon-close.svg"
          alt="clock"
        ></Image>
      )}
      {(itineraryStatus === "confirmed" || itineraryStatus === "completed") && (
        <Image
          height={15}
          width={15}
          src="/img/icon-check.svg"
          alt="check"
        ></Image>
      )}
      {t(itineraryStatus)}
    </ItineraryStatusStyles>
  );
};
export default React.memo(ItineraryStatus);
