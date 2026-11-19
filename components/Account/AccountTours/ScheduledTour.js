import { ScheduledTourStyles } from "./styles/ScheduledTourStyles";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import TimeLeft from "../../UI/TimeLeft";
import TimeLeftToTour from "../../UI/TimeLeftToTour";
import useNetwork from "../../../lib/useNetwork";
import AttractionImage from "../../S/Attractions/AttractionImage";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import { getLanguageFlagSrc } from "../../../lib/languageFlags";
const ScheduledTour = ({
  user,
  tour,
  t,
  setError,
  setShowCancelModal,
  setSelectedTour,
  setLoading,
  loading,
  confirmTour,
  tourStatusChanged,
  acceptTour,
  setTab,
  getTours,
}) => {
  const language = useSelector((state) => state.app.language);
  const { isOnline } = useNetwork();
  return (
    <ScheduledTourStyles
      className={`scheduled-tour ${
        tour?.status === "pending" ? "pending" : ""
      } ${tour?.status === "completed" ? "completed" : ""} ${
        tour?.status === "confirmed" ? "confirmed" : ""
      } ${tour?.status === "waitingReview" ? "waiting-review" : ""}`}
    >
      <div className="tour-image">
        {tour?.attractions?.length > 0 && (
          <AttractionImage
            attraction={tour?.attractions[0]?.url}
            size={500}
            sizes={"(max-width:460px) 100vw, 200px"}
          />
        )}
      </div>
      <div className="tour">
        {tour?.status === "pending" && (
          <div className="auto-cancel">
            <Image
              height={15}
              width={15}
              src="/img/icon-clock.svg"
              alt="time"
            ></Image>
            {t("timeUntilAutoCancel")}
            <TimeLeft tour={tour} />
          </div>
        )}
        {tour?.status === "confirmed" && (
          <div className="auto-cancel time-to-tour">
            <Image
              height={15}
              width={15}
              src="/img/icon-clock.svg"
              alt="time"
            ></Image>
            {t("timeUntilTour")}{" "}
            <TimeLeftToTour
              tourDate={tour?.date}
              tourStartTime={tour?.startTime}
            />
          </div>
        )}
        {tour?.status === "waitingReview" && (
          <div className="auto-cancel time-to-tour time-to-transfer">
            <Image
              height={15}
              width={15}
              src="/img/icon-clock.svg"
              alt="time"
            ></Image>
            {t("timeUntilTransfer")}{" "}
            <TimeLeftToTour
              tourDate={dayjs(tour?.date).add(5, "day").format("MM/DD/YYYY")}
              tourStartTime={tour?.startTime}
            />
          </div>
        )}
        <div className="tour-wrapper">
          <div className="left-side">
            <div className="tour-details">
              <h4>{tour?.name}</h4>
              <Link prefetch={false} href={`/itinerary/${tour?.id}`}>
                {" "}
                {t("viewItinerary")}
              </Link>
            </div>
            {tour?.transportIncluded ? (
              <p className="tour-time">
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-car.svg"
                  alt="transport-included"
                ></Image>
                {t("transportationIncluded")}
              </p>
            ) : (
              <></>
            )}
            <p className="tour-time">
              <Image
                height={15}
                width={15}
                src="/img/icon-calendar.svg"
                alt="date"
              ></Image>
              <b>{dayjs(tour?.date).format("MM/DD/YYYY")}</b>
              <Image
                height={15}
                width={15}
                src="/img/icon-clock.svg"
                alt="clock"
              ></Image>{" "}
              <b>{tour?.startTime}</b>
              <Image
                height={15}
                width={15}
                src="/img/icon-login.svg"
                alt="clock"
              ></Image>{" "}
              <b>{tour?.person}</b>
              <Image
                src={getLanguageFlagSrc(tour?.primaryLanguage)}
                height={10}
                width={15}
                className="language"
                alt={tour?.primaryLanguage}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <b>{tour?.primaryLanguage}</b>
            </p>
            <p className="meeting-place">
              {t("meetingPlace")}:{" "}
              <b>
                {tour?.meetingPlace
                  ? tour?.meetingPlace?.translatedName
                    ? tour?.meetingPlace?.translatedName[language?.code]
                    : tour?.meetingPlace?.name
                  : tour?.attractions[0]?.translatedName[user?.language?.code]}
              </b>{" "}
              <a
                href={
                  tour?.meetingPlace
                    ? `${tour?.meetingPlace?.mapUrl}&hl=${language?.code}`
                    : `${tour?.attractions[0]?.mapUrl}&hl=${language?.code}`
                }
                target="_blank"
                rel="noreferrer"
              >
                {t("viewWithGoogleMaps")}
              </a>
            </p>
            <p className="tour-time">
              <b> {t("order")}</b> {tour?.orderId}
            </p>
            {user?.guide === "true" && (
              <Link
                href={`/${tour?.traveler?.username}`}
                target="_blank"
                className="flex-wrapper-five traveler"
              prefetch={false}
              >
                {t("by")}{" "}
                <Avatar
                  sx={{
                    width: 20,
                    height: 20,
                  }}
                  alt="avatar"
                  src={
                    tour?.traveler?.avatar
                      ? tour?.traveler?.avatar
                      : "/img/avatar.png"
                  }
                />
                {tour?.traveler === "guest"
                  ? t("guest")
                  : `${tour?.traveler?.firstname} ${tour?.traveler?.lastname}`}
              </Link>
            )}
          </div>
          <div className="right-side">
            <div className={`tour-status flex-wrapper-ten`}>
              <p
                className={`${
                  tour?.status === "pending" || tour?.status === "waitingPay"
                    ? "pending"
                    : ""
                } ${tour?.status === "completed" ? "completed" : ""} ${
                  tour?.status === "confirmed" ? "confirmed" : ""
                } ${tour?.status === "waitingReview" ? "waiting-review" : ""}`}
              >
                {(tour?.status === "pending" ||
                  tour?.status === "waitingReview" ||
                  tour?.status === "waitingPay") && (
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-clock.svg"
                    alt="clock"
                  ></Image>
                )}
                {(tour?.status === "confirmed" ||
                  tour?.status === "completed") && (
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-check.svg"
                    alt="check"
                  ></Image>
                )}
                {t(tour?.status).charAt(0).toUpperCase() +
                  t(tour?.status).slice(1)}
              </p>
            </div>
            <div className="tour-details flex-wrapper-ten">
              {(tour?.status === "confirmed" ||
                tour?.status === "pending" ||
                tour?.status === "waitingPay") &&
                isOnline && (
                  <button
                    className="normal-button"
                    onClick={() => {
                      setSelectedTour(tour);
                      setShowCancelModal(true);
                    }}
                  >
                    <Image
                      height={15}
                      width={15}
                      src="/img/icon-close.svg"
                      alt="close"
                    ></Image>{" "}
                    {user?.guide === "true" && tour?.status === "pending" ? (
                      <> {t("rejectTour")}</>
                    ) : (
                      <> {t("cancelTour")}</>
                    )}
                  </button>
                )}
              {user?.guide === "false" &&
                tour?.status === "waitingPay" &&
                isOnline && (
                  <Link
                    className="normal-button accept-tour"
                    href={`/payment/${tour.id}`}
                    style={{
                      minWidth: 0,
                      color: "white",
                      justifyContent: "center",
                      display: "inline-flex",
                    }}
              prefetch={false}
                  >
                    <Image
                      height={15}
                      width={15}
                      src="/img/icon-check.svg"
                      alt="check"
                    ></Image>
                    {t("pay")}
                  </Link>
                )}
              {tour?.status === "pending" &&
                user?.guide === "true" &&
                isOnline && (
                  <>
                    {!loading ? (
                      <button
                        className="normal-button accept-tour"
                        onClick={async () => {
                          const tourSnap = await getDoc(
                            doc(getFirestore(), "itineraries", tour?.id)
                          );
                          if (tourSnap?.data().status === "pending") {
                            setLoading(true);
                            if (tour?.paymentMethod?.type === "card") {
                              confirmTour(user, tour)
                                .then((ok) => {
                                  if (ok) {
                                    tourStatusChanged();
                                    setTab("confirmed");
                                    setLoading(false);
                                  } else {
                                    setError(true);
                                    setLoading(false);
                                  }
                                })
                                .catch(() => {
                                  setError(true);
                                  setLoading(false);
                                });
                            } else {
                              acceptTour(user, tour)
                                .then((ok) => {
                                  if (ok) {
                                    tourStatusChanged();
                                    setTab("waitingPay");
                                    setLoading(false);
                                  } else {
                                    setError(true);
                                    setLoading(false);
                                  }
                                })
                                .catch(() => {
                                  setError(true);
                                  setLoading(false);
                                });
                            }
                          } else {
                            getTours();
                          }
                        }}
                      >
                        <Image
                          height={15}
                          width={15}
                          src="/img/icon-check.svg"
                          alt="check"
                        ></Image>
                        {t("confirmTour")}
                      </button>
                    ) : (
                      <div className="normal-button accept-tour loading">
                        <Image
                          height={30}
                          width={30}
                          src="/img/icon-spinner.svg"
                          alt="spinner"
                        ></Image>
                      </div>
                    )}
                  </>
                )}
            </div>
            {user?.guide === "false" &&
              tour?.status === "waitingReview" &&
              isOnline && (
                <Link
                  className="normal-button review-tour"
                  href={`/review/${tour.id}`}
              prefetch={false}
                >
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-check.svg"
                    alt="check"
                  ></Image>
                  {t("reviewTour")}
                </Link>
              )}
          </div>
        </div>
      </div>
    </ScheduledTourStyles>
  );
};
export default ScheduledTour;
