import { useTranslation } from "next-i18next";
import dayjs from "dayjs";
const useDate = () => {
  const { t } = useTranslation();
  // Unix to Hour
  const formatGoogleTime = (time) => {
    if (!time || time === "0000") {
      return false;
    }
    let timeArr = time.split("");
    timeArr.splice(2, 0, ":");
    return timeArr.join("");
  };
  // To Time Length
  const toTimeLength = (time, language) => {
    if (isNaN(time)) {
      return "";
    }
    var hours = Math.trunc(time / 60);
    var minutes = Math.abs(time % 60);
    return `${hours.toString().padStart(2, "0")}${t("h")}${minutes
      .toString()
      .padStart(2, "0")}${t("m")}`;
  };
  // To Time
  const toTime = (timeMinutes) => {
    if (isNaN(timeMinutes)) {
      return "";
    }
    let hours = Math.trunc(timeMinutes / 60);
    let minutes = Math.abs(timeMinutes % 60);
    let time = `${(hours % 24).toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    let plus = "";
    if (hours > 24) plus = ` (+${Math.floor(hours / 24)})`;
    return time + plus;
  };
  // To Minutes
  const toMinutes = (time) => {
    return (
      parseInt(time?.substring(0, 2)) * 60 + parseInt(time?.substring(3, 5))
    );
  };
  // Format Date
  const formatDate = (date) => {
    const options = { month: "long" };
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.toLocaleDateString("default", options)?.substring(0, 3);
    let day = date.getDate();
    return `${month} ${day}, ${year}`;
  };
  // Format Comparing date
  const formatComparingDate = (date) => {
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${month}-${day}`;
  };
  //get time from date
  function getTimeFromDate(timestamp) {
    const pad = (num) => ("0" + num).slice(-2);
    const date = new Date(timestamp * 1000);
    let hours = date.getHours(),
      minutes = date.getMinutes();
    return pad(hours) + ":" + pad(minutes);
  }
  function createTourEndDate(tourDate, tourStartTime, tourDuration) {
    const newTourDate = new Date(tourDate);
    const newDate =
      new Date(
        `${
          newTourDate.getMonth() + 1
        }/${newTourDate.getDate()}/${newTourDate.getFullYear()}`
      ).getTime() / 1000;
    const durationInSeconds = tourDuration * 60;
    const hours = tourStartTime.split(":")[0] * 60 * 60;
    const minutes = tourStartTime.split(":")[1] * 60;
    return newDate + durationInSeconds + hours + minutes;
  }
  const removeAvailableDate = (availability, date) => {
    if (availability) {
      const tempAvailability = [...availability];
      const index = availability?.indexOf(
        dayjs(date, "MM/DD/YYYY").format("MM/DD/YYYY")
      );
      tempAvailability?.splice(index, 1);
      return tempAvailability;
    }
  };
  const isGuideAvailable = (availability, date) => {
    const index = availability?.indexOf(dayjs(date).format("MM/DD/YYYY"));
    return index === -1 ? false : true;
  };
  return {
    formatGoogleTime,
    formatComparingDate,
    formatDate,
    toMinutes,
    toTime,
    toTimeLength,
    getTimeFromDate,
    createTourEndDate,
    removeAvailableDate,
    isGuideAvailable,
  };
};
export default useDate;
