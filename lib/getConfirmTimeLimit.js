const getConfirmTimeLimit = (tour) => {
  const tourStartTime = tour.startTime;
  const hours = tourStartTime.split(":")[0] * 60 * 60;
  const minutes = tourStartTime.split(":")[1] * 60;
  let tourDate = Math.round(new Date(tour.date).getTime() / 1000);
  const confirmLimitTime = tourDate + hours + minutes - 2 * 60 * 60;
  return {
    time: confirmLimitTime,
    isComingSoon:
      Math.ceil(Date.now() / 1000) + 48 * 60 * 60 >
      confirmLimitTime + 2 * 60 * 60,
  };
};
export default getConfirmTimeLimit;
