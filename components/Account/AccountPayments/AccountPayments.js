import { AccountPaymentsStyles } from "./styles/AccountPaymentsStyles";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useState, useEffect, useCallback, useMemo } from "react";
import Spinner from "../../UI/Spinner";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
const AccountPayments = ({ t, user, topRef, stripeAccountError }) => {
  const language = useSelector((state) => state.app.language);
  const accountTransfersList = useMemo(() => {
    try {
      const functions = getFunctions(undefined, "asia-northeast1");
      return httpsCallable(functions, "accountTransfersList");
    } catch (error) {
      return null;
    }
  }, []);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startingAfter, setStartingAfter] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [hasBack, setHasBack] = useState(false);
  const [endingBefore, setEndingBefore] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const getTransactions = useCallback(async (from) => {
    if (!accountTransfersList || !user?.stripeAccountId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setRequestError(false);
    try {
      const res = await accountTransfersList({
        destination: user?.stripeAccountId,
        limit: 30,
        ...(from === "next" && {
          startingAfter,
        }),
        ...(from === "back" && {
          endingBefore,
        }),
      });
      const data = Array.isArray(res?.data?.data) ? res.data.data : [];
      if (from === "firstTime" || from === "next") {
        setHasNext(Boolean(res?.data?.has_more));
      }
      if (from === "back") {
        setHasBack(Boolean(res?.data?.has_more));
      }
      setStartingAfter(data[data.length - 1]?.id || false);
      setEndingBefore(data[0]?.id || false);
      setPayments(data);
    } catch (error) {
      setPayments([]);
      setHasNext(false);
      setHasBack(false);
      setRequestError(true);
    } finally {
      setLoading(false);
    }
  }, [accountTransfersList, endingBefore, startingAfter, user?.stripeAccountId]);
  useEffect(() => {
    setPayments([]);
    setHasNext(false);
    setHasBack(false);
    setStartingAfter(false);
    setEndingBefore(false);
    setRequestError(false);
    setLoading(true);
  }, [user?.stripeAccountId]);
  useEffect(() => {
    if (
      !stripeAccountError &&
      user?.stripeAccountId &&
      !startingAfter &&
      !endingBefore &&
      !requestError
    ) {
      getTransactions("firstTime");
    } else if (!user?.stripeAccountId || stripeAccountError) {
      setLoading(false);
    }
  }, [
    endingBefore,
    getTransactions,
    requestError,
    startingAfter,
    stripeAccountError,
    user?.stripeAccountId,
  ]);
  const nextPage = () => {
    if (loading) return;
    setHasBack(true);
    setEndingBefore(false);
    getTransactions("next");
    topRef?.current?.scrollIntoView();
  };
  const backPage = () => {
    if (loading) return;
    setHasNext(true);
    setStartingAfter(false);
    getTransactions("back");
    topRef?.current?.scrollIntoView();
  };
  return (
    <AccountPaymentsStyles>
      {loading && <Spinner />}
      {payments.length === 0 && !loading && (
        <p>
          <b>{requestError || stripeAccountError ? t("errorMsgStripe") : t("noPaymentsHappened")}</b>
        </p>
      )}
      {!loading && (
        <>
          {payments.map((payment, i) => (
            <li key={i}>
              <span className="amount">
                {payment.currency.toUpperCase()}
                {payment.amount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
              <span className="succeeded">
                {t("succeeded")}
                <svg
                  aria-hidden="true"
                  className="SVGInline-svg SVGInline--cleaned-svg SVG-svg Icon-svg Icon--check-svg Icon-color-svg Icon-color--green500-svg"
                  height="12"
                  width="12"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>succeeded</title>
                  <path
                    d="M5.297 13.213.293 8.255c-.39-.394-.39-1.033 0-1.426s1.024-.394 1.414 0l4.294 4.224 8.288-8.258c.39-.393 1.024-.393 1.414 0s.39 1.033 0 1.426L6.7 13.208a.994.994 0 0 1-1.402.005z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </span>

              <div className="created">
                {dayjs(payment.created * 1000)
                  .locale(language?.code)
                  .format("MM/DD, hh:mma")}
              </div>
            </li>
          ))}
        </>
      )}
      {(hasBack || hasNext) && (
        <div className="pagination">
          {hasBack && (
            <button className="normal-button" onClick={backPage}>
              {t("back")}
            </button>
          )}
          {hasNext && (
            <button className="normal-button next" onClick={nextPage}>
              {t("next")}
            </button>
          )}
        </div>
      )}
    </AccountPaymentsStyles>
  );
};
export default AccountPayments;
