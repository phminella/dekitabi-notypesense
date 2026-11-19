import { HeaderSettingsBalanceStyles } from "./styles/HeaderSettingsBalanceStyles";
import Image from "next/image";
import { getFunctions, httpsCallable } from "firebase/functions";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";
const HeaderSettingsBalance = ({ user, t, setShowSettings }) => {
  const retrieveStripeAccountBalance = useMemo(() => {
    try {
      const functions = getFunctions(undefined, "asia-northeast1");
      return httpsCallable(functions, "retrieveStripeAccountBalance");
    } catch (err) {
      console.error("Failed to initialize stripe balance callable:", err);
      return null;
    }
  }, []);
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState(true);
  const getBalance = useCallback(async () => {
    if (!retrieveStripeAccountBalance || !user?.stripeAccountId) {
      setBalance(0);
      setLoading(false);
      return;
    }
    try {
      const res = await retrieveStripeAccountBalance(user?.stripeAccountId);
      setBalance(res?.data?.available?.[0]?.amount ?? 0);
    } catch (err) {
      console.error("Failed to fetch stripe balance:", err);
      setBalance(0);
    } finally {
      setLoading(false);
    }
  }, [retrieveStripeAccountBalance, user?.stripeAccountId]);
  useEffect(() => {
    if (user?.stripeAccountId) {
      setLoading(true);
      getBalance();
    } else {
      setLoading(false);
    }
  }, [getBalance, user?.stripeAccountId]);
  return (
    <HeaderSettingsBalanceStyles>
      <Link
        prefetch={false}
        onClick={() => setShowSettings(false)}
        href={`/account/payments-and-payouts`}
      >
        <div className="balance">
          <div className="balance-label">
            <Image
              height={24}
              width={24}
              src="/img/icon-balance.svg"
              alt="dekitabi-tour-guide-balance"
              className="white-filter"
            />
            {t("balance")}:
          </div>
          <div className="balance-value">
            {loading ? (
              <Image
                src="/img/icon-spinner.svg"
                alt="loading-dekitabi-tour-guide-balance"
                height={30}
                width={30}
              />
            ) : (
              <>¥{balance?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</>
            )}
          </div>
        </div>
        <Image
          src="/img/icon-arrow-right.svg"
          height={13}
          width={13}
          alt="go-to-dekitabi-tour-guide-balance-details"
          className="white-filter"
        />
      </Link>
    </HeaderSettingsBalanceStyles>
  );
};
export default React.memo(HeaderSettingsBalance);
