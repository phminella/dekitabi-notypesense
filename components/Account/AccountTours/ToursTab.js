import { ToursTabStyles } from "./styles/ToursTabStyles";
const ToursTab = ({ t, setTab, tab }) => {
  return (
    <ToursTabStyles className="tours-tab">
      <li className={tab === "pending" ? "active" : ""}>
        <button onClick={() => setTab("pending")}>{t("pending")}</button>
      </li>
      <li className={tab === "waitingPay" ? "active" : ""}>
        <button onClick={() => setTab("waitingPay")}>{t("waitingPay")}</button>
      </li>
      <li className={tab === "confirmed" ? "active" : ""}>
        <button onClick={() => setTab("confirmed")}>{t("confirmed")}</button>
      </li>
      <li className={tab === "waitingReview" ? "active" : ""}>
        <button onClick={() => setTab("waitingReview")}>
          {t("waitingReview")}
        </button>
      </li>
      <li className={tab === "completed" ? "active" : ""}>
        <button onClick={() => setTab("completed")}>{t("completed")}</button>
      </li>
    </ToursTabStyles>
  );
};
export default ToursTab;
