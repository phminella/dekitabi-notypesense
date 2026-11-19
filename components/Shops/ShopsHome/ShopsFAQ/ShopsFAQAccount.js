import ShopsFAQQuestion from "./ShopsFAQQuestion";
const ShopsFAQAccount = ({ t }) => {
  return (
    <>
      <ShopsFAQQuestion
        question={t("shops:accountQ1")}
        answer={t("shops:accountA1")}
      />
      <ShopsFAQQuestion
        question={t("shops:accountQ2")}
        answer={t("shops:accountA2")}
      />
      <ShopsFAQQuestion
        question={t("shops:accountQ3")}
        answer={t("shops:accountA3")}
      />
    </>
  );
};
export default ShopsFAQAccount;
