import { useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
const TimeLeftToTour = ({ tourDate, tourStartTime }) => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(
    <Image
      src="/img/icon-spinner-white.svg"
      alt="spinner"
      height={19}
      width={19}
      style={{ margin: "0 !important" }}
    />
  );
  const getTimeLeft = () => {
    var d = new Date(`${tourDate} ${tourStartTime} +9:00`);
    if (tourDate) {
      const futureDate = d.getTime();
      const now = new Date().getTime();
      const timeLeft = futureDate - now;
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      if (days > -1 && hours > -1 && minutes > -1) {
        setTimeLeft(
          `${days} ${t("days")} ${hours < 10 ? "0" + hours : hours} ${t(
            "hours"
          )} ${minutes < 10 ? "0" + minutes : minutes} ${t("minutes")}`
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
  return <div className="time-left-to-tour">{timeLeft}</div>;
};
export default TimeLeftToTour;
