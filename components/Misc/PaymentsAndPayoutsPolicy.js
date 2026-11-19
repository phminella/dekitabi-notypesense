import Link from "next/link";
import { useTranslation } from "next-i18next";
import { PaymentsAndPayoutsPolicyStyles } from "./styles/PaymentsAndPayoutsPolicyStyles";
import { useSelector } from "react-redux";
import isMobile from "../../lib/isMobile";
import PoweredByStripe from "./PoweredByStripe";
const PaymentsAndPayoutsPolicy = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.app.user);
  return (
    <PaymentsAndPayoutsPolicyStyles>
      <h1>
        {t("becomeGuide")} <span>@dekitabi</span>
      </h1>
      <PoweredByStripe />
      <h2>{t("receivingPayments")}</h2>
      <p className="payment-message">
        {t("receivingPaymentsMsg")}
        <br />
        <b>{t("receivingPaymentsMsg2")}</b>
      </p>
      <h2>{t("receivingPayouts")}</h2>
      <h3>{t("setupBank")}</h3>
      <p>
        {t("setupBankMsg")}{" "}
        {user?.guide === "true" && (
          <>
            {t("setupBankMsg2")}{" "}
            <Link
              prefetch={false}
              href={"/account/payouts-and-payments"}
              target={isMobile() ? "_self" : "_blank"}
              rel="noreferrer"
            >
              {t("viewPaymentsAndPayout")}
            </Link>
          </>
        )}
      </p>
      <h2>{t("addingBank")}</h2>
      <h3>{t("supportedBankTypes")}</h3>
      <p>{t("supportedBankTypesMsg")}</p>
      {user?.guide === "true" && (
        <Link
          prefetch={false}
          href={"/account/profile-info"}
          target={isMobile() ? "_self" : "_blank"}
          rel="noreferrer"
        >
          {t("addBank")}
        </Link>
      )}
      <ul>
        <li>
          <div>
            <b>{t("bankInfo")}</b>
          </div>
          <div>
            <b>{t("exampleData")}</b>
          </div>
        </li>
        <li>
          <div>{t("bankName")}</div>
          <div>いろは銀行</div>
        </li>
        <li>
          <div>{t("bankBranch")}</div>
          <div>456 (3 {t("characters")})</div>
        </li>
        <li>
          <div>{t("bankAccount")}</div>
          <div>1234567 (7-8 {t("characters")})</div>
        </li>
        <li>
          <div>{t("recipientName")}</div>
          <div>ヤマダハナコ</div>
        </li>
      </ul>
      <h2>{t("updatingBank")}</h2> <p>{t("updatingBankMsg")}</p>
      {user?.guide === "true" && (
        <Link
          prefetch={false}
          href={"/account/payments-and-payouts"}
          target={isMobile() ? "_self" : "_blank"}
          rel="noreferrer"
        >
          {t("addOrUpdateBank")}
        </Link>
      )}
      <h2>{t("payoutSchedule")}</h2>
      <p>{t("payoutScheduleMsg")}</p>
      <h2>{t("payoutFailures")}</h2>
      <p>{t("payoutFailuresMsg")}</p>
    </PaymentsAndPayoutsPolicyStyles>
  );
};
export default PaymentsAndPayoutsPolicy;
