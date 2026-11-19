import { AccountPaymentsAndPayoutsStyles } from "./styles/AccountPaymentsAndPayoutsStyles";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Link from "next/link";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Spinner from "../../UI/Spinner";
import AccountPaymentsBank from "./AccountPaymentsBank";
import AccountPaymentsTabs from "./AccountPaymentsTabs";
import AccountPayments from "./AccountPayments";
import AccountPayouts from "./AccountPayouts";
import Image from "next/image";
const AccountPaymentsAndPayouts = () => {
  const user = useSelector((state) => state.app.user, shallowEqual);
  const { t } = useTranslation();
  const topRef = useRef(null);
  const retrieveStripeAccount = useMemo(() => {
    try {
      const functions = getFunctions(undefined, "asia-northeast1");
      return httpsCallable(functions, "retrieveStripeAccount");
    } catch (error) {
      return null;
    }
  }, []);
  const [tab, setTab] = useState("payments");
  const [bankAccount, setBankAccount] = useState(false);
  const [stripeAccountError, setStripeAccountError] = useState(false);
  const [bankAccountLoading, setBankAccountLoading] = useState(true);
  const getTransactions = useCallback(async () => {
    if (!retrieveStripeAccount) {
      setBankAccountLoading(false);
      return;
    }
    setStripeAccountError(false);
    try {
      const data = await retrieveStripeAccount(user?.stripeAccountId);
      if (data?.data?.external_accounts?.data?.[0]?.account_holder_name) {
        setBankAccount({
          id: data.data.external_accounts.data[0].id,
          bankAccountHolder: data.data.external_accounts.data[0].account_holder_name,
          bankName: data.data.external_accounts.data[0].bank_name,
          bankLast4: data.data.external_accounts.data[0].last4,
        });
      } else {
        setBankAccount(false);
      }
    } catch (error) {
      setBankAccount(false);
      setStripeAccountError(true);
    } finally {
      setBankAccountLoading(false);
    }
  }, [retrieveStripeAccount, user?.stripeAccountId]);
  useEffect(() => {
    if (user?.stripeAccountId) {
      setBankAccountLoading(true);
      getTransactions();
    } else {
      setBankAccount(false);
      setStripeAccountError(false);
      setBankAccountLoading(false);
    }
  }, [getTransactions, user?.stripeAccountId]);
  if (bankAccountLoading) return <Spinner />;
  return (
    <AccountPaymentsAndPayoutsStyles>
      <Head>
        <title>{`${t("account")}/${t("paymentsAndPayouts")}`}</title>
      </Head>
      <div className="page-header">
        <p className="breadcrumbs">
          <Link href="/account" prefetch={false}>
            {" "}
            {t("account")}
          </Link>{" "}
          <span>&gt;</span> <span> {t("paymentsAndPayouts")}</span>
        </p>
        <h1 className="title">{t("paymentsAndPayouts")}</h1>
        <div className="sub-title">
          <p>{t("paymentsAndPayoutsDesc")}</p>
        </div>
      </div>
      <div className="payments-wrapper">
        <AccountPaymentsBank t={t} bankAccount={bankAccount} />
        {stripeAccountError && (
          <p className="payouts-info">
            <span>{t("errorMsgStripe")}</span>
          </p>
        )}
        <p className="payouts-info">
          <Image
            height={15}
            width={15}
            src="/img/icon-info2.svg"
            alt="payout-info"
          ></Image>
          <span>
            {t("payoutInfo")}{" "}
            <Link prefetch={false} href="/payments-and-payouts-policy">
              {t("viewPaymentsAndPayoutsPolicy")}
            </Link>
          </span>
        </p>
        <AccountPaymentsTabs t={t} tab={tab} setTab={setTab} topRef={topRef} />
        {tab === "payments" && (
          <AccountPayments
            t={t}
            user={user}
            topRef={topRef}
            stripeAccountError={stripeAccountError}
          />
        )}
        {tab === "payouts" && (
          <AccountPayouts
            t={t}
            user={user}
            bankAccount={bankAccount}
            topRef={topRef}
            stripeAccountError={stripeAccountError}
          />
        )}
      </div>
    </AccountPaymentsAndPayoutsStyles>
  );
};
export default AccountPaymentsAndPayouts;
