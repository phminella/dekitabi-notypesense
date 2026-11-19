import AffiliateFAQQuestion from "./AffiliateFAQQuestion";
const AffiliateFAQJoin: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
}> = ({ t }) => {
  return (
    <>
      <AffiliateFAQQuestion
        question={t("affiliate:joinQ1")}
        answer={t("affiliate:joinA1")}
      />
      <AffiliateFAQQuestion
        question={t("affiliate:joinQ2")}
        answer={t("affiliate:joinA2")}
      />
      <AffiliateFAQQuestion
        question={t("affiliate:joinQ3")}
        answer={t("affiliate:joinA3")}
      />
      <AffiliateFAQQuestion
        question={t("affiliate:joinQ4")}
        answer={t("affiliate:joinA4")}
      />
    </>
  );
};
export default AffiliateFAQJoin;
