import { useEffect, useState } from "react";
import Price from "./Price";
const Discounts = ({ currency, tours, likesCounter, coupon }) => {
  const [discount, setDiscount] = useState(0);
  useEffect(() => {
    if (tours?.length > 0 && (coupon || likesCounter > 9)) {
      let likeDiscount = 0;
      if (likesCounter > 9 && likesCounter < 20) {
        likeDiscount = 0.01;
      } else if (likesCounter > 19 && likesCounter < 30) {
        likeDiscount = 0.02;
      } else if (likesCounter > 29 && likesCounter < 40) {
        likeDiscount = 0.03;
      } else if (likesCounter > 39 && likesCounter < 50) {
        likeDiscount = 0.04;
      } else if (likesCounter > 49 && likesCounter < 60) {
        likeDiscount = 0.05;
      } else if (likesCounter > 59 && likesCounter < 70) {
        likeDiscount = 0.06;
      } else if (likesCounter > 69 && likesCounter < 80) {
        likeDiscount = 0.07;
      } else if (likesCounter > 79 && likesCounter < 90) {
        likeDiscount = 0.08;
      } else if (likesCounter > 89 && likesCounter < 100) {
        likeDiscount = 0.09;
      } else if (likesCounter > 99) {
        likeDiscount = 0.1;
      }
      const getDiscount = (amount) => {
        let tempDiscount = 0;
        let price = amount;
        price = price - price * likeDiscount;
        tempDiscount = amount * likeDiscount;
        if (coupon) {
          if (price - 1000 < amount - amount * 0.1) {
            tempDiscount = amount * 0.1;
          } else {
            tempDiscount = tempDiscount + 1000;
          }
        }
        return tempDiscount;
      };
      let totalDiscount = tours?.reduce(
        (total, tour) => total + getDiscount(tour?.price),
        0
      );
      setDiscount(totalDiscount);
    }
  }, [currency, tours, likesCounter, coupon]);
  return (
    <Price
      currency={currency}
      value={discount}
      conversionType={"priceWithoutFee"}
    />
  );
};
export default Discounts;
