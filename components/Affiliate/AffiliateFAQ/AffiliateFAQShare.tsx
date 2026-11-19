import AffiliateFAQQuestion from "./AffiliateFAQQuestion";
const AffiliateFAQShare: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
}> = ({ t }) => {
  return (
    <>
      <AffiliateFAQQuestion
        question={t("affiliate:shareQ1")}
        answer={t("affiliate:shareA1")}
      />
      <AffiliateFAQQuestion
        question={t("affiliate:shareQ2")}
        answer={t("affiliate:shareA2")}
      />
      <AffiliateFAQQuestion
        question={t("affiliate:shareQ3")}
        answer={t("affiliate:shareA3")}
      />
    </>
  );
};
export default AffiliateFAQShare;
