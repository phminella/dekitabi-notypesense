import { CancelCompleteStyles } from "./styles/CancelCompleteStyles";
import Image from "next/image";
import { useEffect, useState } from "react";
const CancelComplete = ({ tour, t, isGuide, user }) => {
  const [cancelationFee, setCancelationFee] = useState();
  useEffect(() => {
    if (!tour?.date || !tour?.startTime) {
      return;
    }
    const [month, day, year] = tour.date.split("/");
    const isoJSTString = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}T${tour.startTime}:00+09:00`; // JST timezone

    const tourDateJST = new Date(isoJSTString);
    const now = new Date();

    // Calculate hours remaining
    const hoursLeft = Math.max(
      0,
      (tourDateJST - now) / (1000 * 60 * 60) // Convert milliseconds to hours
    );

    // Determine cancellation fee based on hours left
    let cancelationFee = 0;

    if (hoursLeft < 24) {
      cancelationFee = 100; // No refund
    } else if (hoursLeft < 48) {
      cancelationFee = 50; // 50% refund
    } else {
      cancelationFee = 0; // Full refund
    }

    setCancelationFee(cancelationFee);
  }, [tour?.date, tour?.startTime]);
  return (
    <CancelCompleteStyles>
      <div className="cancel-complete">
        <Image
          src="/img/logo.png"
          height={46}
          width={150}
          alt="logo"
          className="logo"
          style={{ marginBottom: "15px" }}
        />
        <Image height={75} width={75} src="/img/icon-check.svg" alt="checked" />
        <br />
        <h2>
          {tour?.name} {t("wasCanceled")}
        </h2>
        {isGuide && user?.guide === "true" ? (
          <p className="cancel-message">{t("travelerInformed")}</p>
        ) : (
          <p className="cancel-message">{t("guideInformed")}</p>
        )}
        {tour?.refundId && (
          <>
            <div className="cancelation-fee two-columns-wrapper">
              <p>{t("cancelationFee")}</p>
              <p style={{ textAlign: "right" }}>
                <b>{cancelationFee}%</b>
              </p>
              <p>{t("refund")}</p>
              <p style={{ textAlign: "right" }}>
                <b>
                  {tour?.currency?.symbol}
                  {tour?.price - (tour?.price * cancelationFee) / 100}
                </b>
              </p>
              <p>{t("refundedTo")}</p>
              <p
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <Image
                  src={`/img/payment-methods/icon-${tour?.paymentMethod?.card?.brand}.svg`}
                  alt="visa"
                  height={10}
                  width={30}
                />
                <b>••••-••••-••••-{tour?.paymentMethod?.card?.last4}</b>
              </p>
            </div>
            <p className="refund-info">{t("refundTime")}</p>
          </>
        )}
        <h2 className="thanks">
          {isGuide ? (
            <>{t("thanksUsingDekitabi")}</>
          ) : (
            <>{t("thanksBooking")}</>
          )}
          <br />
          {!isGuide && <>{t("andHopeToSeeYou")}</>}
        </h2>
        <h1 className="thankyou">ありがとうございます。</h1>
      </div>
    </CancelCompleteStyles>
  );
};
export default CancelComplete;
