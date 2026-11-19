import { AccountPaymentsTabsStyles } from "./styles/AccountPaymentsTabsStyles";
import dynamic from "next/dynamic";
const StripeLink = dynamic(() => import("../../UI/StripeLink"), { ssr: false });
const AccountPaymentsTabs = ({ t, setTab, tab, topRef }) => {
  return (
    <AccountPaymentsTabsStyles ref={topRef}>
      <li className={tab === "payments" ? "active" : ""}>
        <button onClick={() => setTab("payments")}>{t("payments")}</button>
      </li>
      <li className={tab === "payouts" ? "active" : ""}>
        <button onClick={() => setTab("payouts")}> {t("payouts")}</button>
      </li>
      <li>
        <StripeLink buttonText={t("viewAll")} />
      </li>
    </AccountPaymentsTabsStyles>
  );
};
export default AccountPaymentsTabs;
