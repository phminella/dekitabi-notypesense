import ShopsFAQQuestion from "./ShopsFAQQuestion";
const ShopsFAQJoin = ({ t }) => {
  return (
    <>
      <ShopsFAQQuestion
        question={t("shops:joinQ1")}
        answer={t("shops:joinA1")}
      />
      <ShopsFAQQuestion
        question={t("shops:joinQ2")}
        answer={t("shops:joinA2")}
      />
    </>
  );
};
export default ShopsFAQJoin;
