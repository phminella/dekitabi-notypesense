import React, { useState } from "react";
import Image from "next/image";
import getConfirmTimeLimit from "../../lib/getConfirmTimeLimit";
const TimeLeft = ({ tour }) => {
  const [timeLeft, setTimeLeft] = useState(
    <Image
      src="/img/icon-spinner-white.svg"
      alt="spinner"
      height={19}
      width={19}
      style={{ margin: "0 !important" }}
      className="time-left-spinner"
    />
  );
  const getTimeLeft = () => {
    if (tour?.createdAt) {
      const futureDate = getConfirmTimeLimit(tour).isComingSoon
        ? getConfirmTimeLimit(tour).time * 1000
        : new Date(tour?.createdAt).getTime() + 2 * 86400 * 1000;
      const now = new Date().getTime();
      const timeLeft = futureDate - now;
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      if (hours > -1 && minutes > -1 && seconds > -1) {
        setTimeLeft(
          `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
          }:${seconds < 10 ? "0" + seconds : seconds}`
        );
      } else {
        setTimeLeft("");
      }
    }
  };
  var x = setInterval(function () {
    getTimeLeft();
    clearInterval(x);
  }, 1000);
  return <div className="time-left">{timeLeft}</div>;
};
export default React.memo(TimeLeft);
