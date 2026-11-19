const getFixedAmount = (amount, currency, stripe) => {
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
    if (currency.code === "KRW") {
      fixedAmount = Math.ceil(amount / 10) * 10;
    } else {
      fixedAmount = Math.ceil(amount);
    }
  }
  if (
    currency?.code !== "KRW" &&
    currency?.code !== "VND" &&
    currency?.code !== "JPY" &&
    stripe
  ) {
    fixedAmount = Math.ceil(fixedAmount * 100);
  }
  return parseFloat(fixedAmount);
};
export default getFixedAmount;
