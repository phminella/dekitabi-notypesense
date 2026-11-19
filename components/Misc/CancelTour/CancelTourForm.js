import { CancelTourFormStyles } from "./styles/CancelTourFormStyles";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import CancelSpinner from "./CancelSpinner";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import TourError from "../TourError";
const CancelTourForm = ({
  setShowModal,
  user,
  tour,
  t,
  isGuide,
  loading,
  cancelTour,
  tourStatusChanged,
  getTours,
}) => {
  let functions;
  let sendEmail;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    sendEmail = httpsCallable(functions, "sendEmail");
  } catch (err) {
    console.log(err);
  }
  const [reason, setReason] = useState("");
  const [reasonDetails, setReasonDetails] = useState("");
  const [error, setError] = useState(false);
  const [firebaseError, setFirebaseError] = useState(false);
  const [cancelationMsg, setCancelationMsg] = useState("");
  const handleCancelTour = async () => {
    if (reason + reasonDetails === "") {
      setError(true);
    } else {
      cancelTour(tour, reason + "." + reasonDetails, isGuide)
        .then(async (data) => {
          console.log(data);
          if (data) {
            setFirebaseError(false);
            if (setShowModal) {
              setReasonDetails("");
              setShowModal(false);
            }
            if (tourStatusChanged) {
              tourStatusChanged();
            }
          } else {
            const tourSnap = await getDoc(
              doc(getFirestore(), "itineraries", tour?.id)
            );
            if (tourSnap.data().status === "canceled") {
              setFirebaseError(false);
              if (setShowModal) {
                setReasonDetails("");
                setShowModal(false);
              }
              if (tourStatusChanged) {
                tourStatusChanged();
              }
              if (getTours) {
                getTours();
              }
            } else {
              setFirebaseError(true);
              const sentEmail = await sendEmail({
                to: "contact@dekitabi.com",
                sender: "contact@dekitabi.com",
                subject: `dekitabi | Cancel error`,
                body: `itineraryId: ${tour?.id} error: ${JSON.stringify(
                  data
                )} time: ${new Date()}`,
              });
            }
          }
        })
        .catch(async (err) => {
          const sentEmail = await sendEmail({
            to: "contact@dekitabi.com",
            sender: "contact@dekitabi.com",
            subject: `dekitabi | Cancel error`,
            body: `itineraryId: ${tour?.id} error: ${JSON.stringify(
              err
            )} time: ${new Date()}`,
          });
          console.log(err);
        });
    }
  };
  useEffect(() => {
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
    setCancelationMsg(
      `${t("hoursUntilTour")} ${Math.floor(
        (tourDateJST - now) / (1000 * 60 * 60)
      )}. ${t("cancelationFee")}: ${cancelationFee}%.`
    );
  }, [t, tour?.date, tour?.startTime]);
  return (
    <CancelTourFormStyles>
      {loading && <CancelSpinner t={t} />}
      <div className="modal-title">
        <h2>
          {user?.guide === "true" && tour?.status === "pending" ? (
            <>{t("rejectTour")}</>
          ) : (
            <>{t("cancelTour")}</>
          )}{" "}
          {tour?.name && <>({tour?.name})</>}
        </h2>
        {(user?.guide === "false" || !user?.uid) &&
          !isGuide &&
          tour?.status === "confirmed" && (
            <p className="cancelation-msg">{cancelationMsg}</p>
          )}
        <Link prefetch={false} href={"/cancelation-policy"} target="_blank">
          {t("cancelationPolicy")}
        </Link>
      </div>
      <div className="modal-body">
        {!firebaseError && (
          <>
            <h3>
              {(user?.guide === "true" || isGuide) &&
              tour?.status === "pending" ? (
                <> {t("letUsKnowReject")}</>
              ) : (
                <> {t("letUsKnowCancel")}</>
              )}
            </h3>
            {tour?.createdBy !== "Guest" &&
              user?.uid !== tour?.createdBy &&
              user?.uid !== tour?.guide && (
                <p className="error-message signin-to-cancel">
                  &#9940;{t("signInToCancel")}
                </p>
              )}
            <ul>
              {(user?.guide === "false" || !user?.uid) && !isGuide && (
                <>
                  {tour?.status === "pending" && (
                    <li>
                      <input
                        name="slow-reply"
                        type="radio"
                        checked={reason === "Slow reply"}
                        onChange={() => setReason("Slow reply")}
                      />{" "}
                      {t("cancelReason1")}
                    </li>
                  )}
                  <li>
                    <input
                      name="price"
                      type="radio"
                      checked={reason === "Price"}
                      onChange={() => setReason("Price")}
                    />{" "}
                    {t("cancelReason2")}
                  </li>
                  <li>
                    <input
                      name="itinerary-changed"
                      type="radio"
                      checked={reason === "Itinerary changed"}
                      onChange={() => setReason("Itinerary changed")}
                    />{" "}
                    {t("cancelReason3")}
                  </li>
                  <li>
                    <input
                      name="plans-changed"
                      type="radio"
                      checked={reason === "Travel plans changed"}
                      onChange={() => setReason("Travel plans changed")}
                    />{" "}
                    {t("cancelReason4")}
                  </li>{" "}
                  <li>
                    <input
                      name="found-better"
                      type="radio"
                      checked={reason === "Found better elsewhere"}
                      onChange={() => setReason("Found better elsewhere")}
                    />{" "}
                    {t("cancelReason5")}
                  </li>
                </>
              )}
              {(user?.guide === "true" || isGuide) && (
                <>
                  <li>
                    <input
                      name="not-available"
                      type="radio"
                      checked={reason === "Not available"}
                      onChange={() => setReason("Not available")}
                    />{" "}
                    {t("cancelReason6")}
                  </li>
                  <li>
                    <input
                      name="not-responding"
                      type="radio"
                      checked={reason === "Traveler not responding"}
                      onChange={() => setReason("Traveler not responding")}
                    />{" "}
                    {t("cancelReason7")}
                  </li>
                  <li>
                    <input
                      name="issues"
                      type="radio"
                      checked={reason === "Itinerary issues"}
                      onChange={() => setReason("Itinerary issues")}
                    />{" "}
                    {t("cancelReason8")}
                  </li>
                </>
              )}
              <li>
                <input
                  name="other"
                  type="radio"
                  checked={reason === "Other"}
                  onChange={() => setReason("Other")}
                />{" "}
                {t("other")}
              </li>
              <textarea
                value={reasonDetails}
                placeholder={`${t("letKnowDetails")} (${t("optional")})`}
                onChange={(e) => setReasonDetails(e.target.value)}
                maxLength={1000}
              ></textarea>
              <p className="reason-counter">
                {t("charRemaining")}: {500 - reasonDetails.length}
              </p>
            </ul>
          </>
        )}
        {error && reason + reasonDetails === "" && (
          <p className="error-message">&#9940;{t("selectItem")}</p>
        )}{" "}
        {firebaseError && <TourError t={t} />}
        {!firebaseError && (
          <div className="cancel-buttons">
            {loading ? (
              <div className="cancel-button-spinner">
                <Image
                  src="/img/icon-spinner-white.svg"
                  alt="spinner"
                  height={40}
                  width={40}
                />
              </div>
            ) : (
              <button
                className="normal-button"
                onClick={handleCancelTour}
                disabled={
                  tour?.createdBy !== "Guest" &&
                  user?.uid !== tour?.createdBy &&
                  user?.uid !== tour?.guide
                }
              >
                {user?.guide === "true" && tour?.status === "pending" ? (
                  <>{t("rejectTour")}</>
                ) : (
                  <>{t("cancelTour")}</>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </CancelTourFormStyles>
  );
};
export default CancelTourForm;
