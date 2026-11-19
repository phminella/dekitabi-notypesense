import ShopsFAQJoin from "./ShopsFAQJoin";
import ShopsFAQPayment from "./ShopsFAQPayment";
import ShopsFAQAccount from "./ShopsFAQAccount";
import { ShopsFAQStyles } from "./styles/ShopsFAQStyles";
import { useState } from "react";
const ShopsFAQ = ({ t }) => {
  const [tab, setTab] = useState("join");
  return (
    <ShopsFAQStyles>
      <p className="title">{t("shops:faq")}</p>
      <div className="faq-tabs">
        <button
          onClick={() => setTab("join")}
          className={tab === "join" ? "active" : ""}
        >
          {t("shops:join")}
        </button>
        <button
          onClick={() => setTab("account")}
          className={tab === "account" ? "active" : ""}
        >
          {t("shops:account")}
        </button>
        <button
          onClick={() => setTab("payment")}
          className={tab === "payment" ? "active" : ""}
        >
          {t("shops:payment")}
        </button>
      </div>
      {tab === "join" && <ShopsFAQJoin t={t} />}
      {tab === "account" && <ShopsFAQAccount t={t} />}
      {tab === "payment" && <ShopsFAQPayment t={t} />}
    </ShopsFAQStyles>
  );
};
export default ShopsFAQ;
