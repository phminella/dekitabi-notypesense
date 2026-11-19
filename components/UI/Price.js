import convertFromYen from "../../lib/convertFromYen";
const Price = ({
  currency,
  value,
  conversionType,
  cancelationFee,
  people,
  coupon,
  likesCounter,
}) => {
  if (value === 0) {
    return <>{currency?.symbol}0</>;
  }
  if (!value) {
    return <></>;
  }
  return (
    <>
      {currency?.symbol}
      {convertFromYen(
        currency,
        value,
        conversionType,
        cancelationFee,
        people,
        coupon,
        likesCounter
      )}
    </>
  );
};
export default Price;
