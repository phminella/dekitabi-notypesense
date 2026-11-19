import ShopsFAQQuestion from "./ShopsFAQQuestion";
const ShopsFAQPayment = ({ t }) => {
  return (
    <>
      <ShopsFAQQuestion
        question={t("shops:paymentQ1")}
        answer={t("shops:paymentA1")}
      />
      <ShopsFAQQuestion
        question={t("shops:paymentQ2")}
        answer={t("shops:paymentA2")}
      />
      <ShopsFAQQuestion
        question={t("shops:paymentQ3")}
        answer={t("shops:paymentA3")}
      />
    </>
  );
};
export default ShopsFAQPayment;
