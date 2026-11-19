import React from "react";
import AffiliateFAQQuestion from "./AffiliateFAQQuestion";
const AffiliateFAQPayment: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
}> = ({ t }) => {
  return (
    <>
      <AffiliateFAQQuestion
        question={t("affiliate:paymentQ1")}
        answer={t("affiliate:paymentA1")}
      />
      <AffiliateFAQQuestion
        question={t("affiliate:paymentQ2")}
        answer={t("affiliate:paymentA2")}
      />
      <AffiliateFAQQuestion
        question={t("affiliate:paymentQ3")}
        answer={t("affiliate:paymentA3")}
      />
    </>
  );
};
export default AffiliateFAQPayment;
