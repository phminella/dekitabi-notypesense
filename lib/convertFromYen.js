import getDiscountedPrice from "./getDiscountedPrice";
const convertFromYen = (
  currency,
  value,
  conversionType,
  cancelationPercentage,
  people,
  coupon,
  likesCounter
) => {
  let totalAmount = 0;
  const fixIt = (amount) => {
    let fixedAmount = 0;
    if (
      currency?.code === "USD" ||
      currency?.code === "EUR" ||
      currency?.code === "CNY" ||
      currency?.code === "HKD" ||
      currency?.code === "MYR" ||
      currency?.code === "SGD" ||
      currency?.code === "CAD" ||
      currency?.code === "GBP" ||
      currency?.code === "BRL" ||
      currency?.code === "AUD" ||
      currency?.code === "DKK" ||
      currency?.code === "MXN" ||
      currency?.code === "NZD" ||
      currency?.code === "SAR" ||
      currency?.code === "SEK" ||
      currency?.code === "AED" ||
      currency?.code === "CHF" ||
      currency?.code === "NOK" ||
      currency?.code === "TRY"
    ) {
      fixedAmount = amount.toFixed(2);
    } else {
      if (currency?.code === "KRW") {
        fixedAmount = Math.ceil(amount / 10) * 10;
      } else {
        fixedAmount = Math.ceil(amount);
      }
    }
    return parseFloat(fixedAmount);
  };
  if (conversionType === "stripe") {
    totalAmount = fixIt(
      fixIt((coupon ? value - 1000 : value) * currency?.rate) +
        fixIt((coupon ? value - 1000 : value) * 0.1 * currency?.rate)
    );
    if (
      currency?.code !== "KRW" &&
      currency?.code !== "VND" &&
      currency?.code !== "JPY"
    ) {
      return Math.trunc(totalAmount * 100);
    } else {
      return totalAmount;
    }
  } else if (conversionType === "priceWithoutFee") {
    totalAmount = fixIt(
      getDiscountedPrice(value, coupon, likesCounter) * currency?.rate
    );
  } else if (conversionType === "priceFee") {
    totalAmount = fixIt(
      getDiscountedPrice(value, coupon, likesCounter) * 0.1 * currency?.rate
    );
  } else if (conversionType === "priceWithFee") {
    totalAmount = fixIt(
      fixIt(getDiscountedPrice(value, coupon, likesCounter) * currency?.rate) +
        fixIt(
          getDiscountedPrice(value, coupon, likesCounter) * 0.1 * currency?.rate
        )
    );
  } else if (conversionType === "pricePerPerson") {
    totalAmount = fixIt(
      fixIt(getDiscountedPrice(value, coupon, likesCounter) * currency?.rate) /
        people
    );
  } else if (conversionType === "cancelationFee") {
    totalAmount = fixIt(
      getDiscountedPrice(value, coupon, likesCounter) *
        (cancelationPercentage / 100) *
        currency?.rate
    );
  } else if (conversionType === "refund") {
    totalAmount = fixIt(
      fixIt(getDiscountedPrice(value, coupon, likesCounter) * currency?.rate) -
        fixIt(
          getDiscountedPrice(value, coupon, likesCounter) *
            (cancelationPercentage / 100) *
            currency?.rate
        )
    );
  } else if (conversionType === "totalWithoutFee") {
    totalAmount = value?.reduce((total, tour) => {
      let tourPrice = tour?.priceWithDiscount
        ? tour?.priceWithDiscount
        : getDiscountedPrice(
            tour?.price ? tour?.price : tour?.priceBeforeFee,
            coupon,
            likesCounter
          );
      return fixIt(total + fixIt(tourPrice * currency?.rate));
    }, 0);
  } else if (conversionType === "totalWithCancelationFee") {
    totalAmount = value?.reduce((total, tour) => {
      let tourPrice = tour?.priceWithDiscount
        ? tour?.priceWithDiscount
        : getDiscountedPrice(
            tour?.price ? tour?.price : tour?.priceBeforeFee,
            coupon,
            likesCounter
          );
      return tour?.cancelationFee || tour?.cancelationFee === 0
        ? fixIt(
            total +
              fixIt(tourPrice * (tour.cancelationFee / 100) * currency?.rate) +
              fixIt(tourPrice * 0.1 * currency?.rate)
          )
        : fixIt(
            total +
              fixIt(
                fixIt(tourPrice * currency?.rate) +
                  fixIt(tourPrice * 0.1 * currency?.rate)
              )
          );
    }, 0);
  } else if (conversionType === "totalWithFee") {
    totalAmount = value?.reduce((total, tour) => {
      let tourPrice = tour?.priceWithDiscount
        ? tour?.priceWithDiscount
        : getDiscountedPrice(
            tour?.price ? tour?.price : tour?.priceBeforeFee,
            coupon,
            likesCounter
          );
      return fixIt(
        total +
          fixIt(
            fixIt(tourPrice * currency?.rate) +
              fixIt(tourPrice * 0.1 * currency?.rate)
          )
      );
    }, 0);
  } else if (conversionType === "totalFee") {
    totalAmount = value?.reduce((total, tour) => {
      let tourPrice = tour?.priceWithDiscount
        ? tour?.priceWithDiscount
        : getDiscountedPrice(
            tour?.price ? tour?.price : tour?.priceBeforeFee,
            coupon,
            likesCounter
          );
      return fixIt(total + fixIt(tourPrice * 0.1 * currency?.rate));
    }, 0);
  }
  return totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default convertFromYen;
