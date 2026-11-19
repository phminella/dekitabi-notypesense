import { CancelationPolicyStyles } from "./styles/CancelationPolicyStyles";
import { useTranslation } from "next-i18next";
const CancelationPolicy = () => {
  const { t } = useTranslation();
  return (
    <CancelationPolicyStyles>
      <h1>{t("cancelationPolicy")}</h1>
      <p>
        <b>{t("importantNotes1")}.</b> {t("cancelationPolicyMsg1")}
      </p>
      <p>{t("cancelationPolicyMsg2")}</p>
      <p>
        <b>{t("cancelationPolicyMsg4")}</b>
      </p>
      <h3>{t("cancelationFee")}</h3>
      <ul>
        <li>
          <div className="cancelation-days">{t("cancelationPolicy2")}</div>
          <div className="cancelation-fee">0%</div>
        </li>
        <li>
          <div className="cancelation-days">{t("cancelationPolicy3")}</div>
          <div className="cancelation-fee">50%</div>
        </li>
        <li>
          <div className="cancelation-days">{t("cancelationPolicy4")}</div>
          <div className="cancelation-fee">100%</div>
        </li>
      </ul>
      <p>{t("cancelationPolicyMsg3")}</p>
    </CancelationPolicyStyles>
  );
};
export default CancelationPolicy;
