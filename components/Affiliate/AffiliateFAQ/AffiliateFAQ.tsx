import AffiliateFAQJoin from "./AffiliateFAQJoin";
import AffiliateFAQPayment from "./AffiliateFAQPayment";
import AffiliateFAQShare from "./AffiliateFAQShare";
import { AffiliateFAQStyles } from "./styles/AffiliateFAQStyles";
import { useState } from "react";
const AffiliateFAQ: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
}> = ({ t }) => {
  const [tab, setTab] = useState("join");
  return (
    <AffiliateFAQStyles>
      <p className="title">{t("affiliate:faq")}</p>
      <div className="faq-tabs">
        <button
          onClick={() => setTab("join")}
          className={tab === "join" ? "active" : ""}
        >
          {t("affiliate:join")}
        </button>
        <button
          onClick={() => setTab("share")}
          className={tab === "share" ? "active" : ""}
        >
          {t("affiliate:share")}
        </button>
        <button
          onClick={() => setTab("payment")}
          className={tab === "payment" ? "active" : ""}
        >
          {t("affiliate:payment")}
        </button>
      </div>
      {tab === "join" && <AffiliateFAQJoin t={t} />}
      {tab === "share" && <AffiliateFAQShare t={t} />}
      {tab === "payment" && <AffiliateFAQPayment t={t} />}
    </AffiliateFAQStyles>
  );
};
export default AffiliateFAQ;
