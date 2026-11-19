import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import ScheduledTour from "./ScheduledTour";
import CancelTourForm from "../../Misc/CancelTour/CancelTourForm";
import BasicModal from "../../UI/BasicModal";
import useTour from "../../../lib/useTour";
import LoadingTours from "./LoadingTours";
import { useLeavePageConfirmation } from "../../../lib/useLeavePageConfirmation";
import ConfirmingTour from "./ConfirmingTour";
import NotFound from "../../UI/NotFound";
import TourError from "../../Misc/TourError";
import { ToursStyles } from "./styles/ToursStyles";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  orderBy,
  limit,
  getFirestore,
  startAfter,
  doc,
} from "firebase/firestore/lite";
const Tours = ({
  user,
  t,
  currency,
  order,
  tab,
  tourStatusChanged,
  setTab,
}) => {
  const customizedDialog = async (msg) => {
    const confirmationValue = window.confirm(msg);
    return confirmationValue;
  };
  const [selectedTour, setSelectedTour] = useState();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [tours, setTours] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { cancelTour, confirmTour, acceptTour } = useTour();
  const [loadingTours, setLoadingTours] = useState(true);
  const [hasSameDate, setHasSameDate] = useState(false);
  useLeavePageConfirmation(loading, t("leavePage"), customizedDialog);
  const getMoreTours = async () => {
    setLoadingMore(true);
    let dateArray = [];
    const queryCursor = await getDoc(
      doc(getFirestore(), "itineraries", tours[tours?.length - 1]?.id)
    );
    let q;
    q = query(
      collection(getFirestore(), "itineraries"),
      where("status", "==", tab),
      where(user?.guide === "true" ? "guide" : "createdBy", "==", user?.uid),
      orderBy(order?.value, order?.order),
      startAfter(queryCursor),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    let tempToursWithoutAttractions = [];
    querySnapshot.forEach((data) => {
      tempToursWithoutAttractions.push(data.data());
    });
    if (tempToursWithoutAttractions?.length === 6) {
      setHasMore(true);
      tempToursWithoutAttractions.pop();
    } else {
      setHasMore(false);
    }
    let tempTours = await Promise.all(
      tempToursWithoutAttractions.map(async (tour) => {
        const attractionRef = doc(
          getFirestore(),
          "attractions",
          tour?.attractions[0]
        );
        const attractionSnap = await getDoc(attractionRef);
        let traveler = "guest";
        if (tour.createdBy !== "guest") {
          const userRef = doc(getFirestore(), "users", tour?.createdBy);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            traveler = {
              avatar:
                userSnap?.data().avatar !== "/img/avatar.png" ||
                userSnap?.data()?.photos?.length === 0
                  ? userSnap?.data()?.avatar
                  : userSnap?.data()?.photos?.length > 0
                  ? userSnap?.data()?.photos[0]
                  : "/img/avatar.png",
              firstname: userSnap?.data().firstname,
              lastname: userSnap?.data().lastname,
              username: userSnap?.data().username,
            };
          }
        }
        dateArray.push(tour?.date);
        return {
          ...tour,
          attractions: [attractionSnap?.data()],
          traveler,
        };
      })
    );
    if (dateArray?.length !== [...new Set(dateArray)]?.length) {
      setHasSameDate(true);
    }
    setLoadingMore(false);
    setTours([...tours, ...tempTours]);
  };
  const getTours = useCallback(async () => {
    setHasSameDate(false);
    let dateArray = [];
    let q;
    q = query(
      collection(getFirestore(), "itineraries"),
      where("status", "==", tab),
      where(user?.guide === "true" ? "guide" : "createdBy", "==", user?.uid),
      orderBy(order?.value, order?.order),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    let tempToursWithoutAttractions = [];
    querySnapshot.forEach((data) => {
      tempToursWithoutAttractions.push(data.data());
    });
    if (tempToursWithoutAttractions?.length === 6) {
      setHasMore(true);
      tempToursWithoutAttractions.pop();
    } else {
      setHasMore(false);
    }
    let tempTours = await Promise.all(
      tempToursWithoutAttractions.map(async (tour) => {
        let attractionSnap;
        if (tour?.attractions?.length > 0) {
          const attractionRef = doc(
            getFirestore(),
            "attractions",
            tour?.attractions[0]
          );
          attractionSnap = await getDoc(attractionRef);
        }
        dateArray.push(tour?.date);
        let traveler = "guest";
        if (tour.createdBy !== "guest") {
          const userRef = doc(getFirestore(), "users", tour?.createdBy);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            traveler = {
              avatar:
                userSnap?.data().avatar !== "/img/avatar.png" ||
                userSnap?.data()?.photos?.length === 0
                  ? userSnap?.data()?.avatar
                  : userSnap?.data()?.photos?.length > 0
                  ? userSnap?.data()?.photos[0]
                  : "/img/avatar.png",
              firstname: userSnap?.data().firstname,
              lastname: userSnap?.data().lastname,
              username: userSnap?.data().username,
            };
          }
        }
        return {
          ...tour,
          ...(attractionSnap?.data() && {
            attractions: [attractionSnap?.data()],
          }),
          traveler,
        };
      })
    );
    setHasSameDate(
      dateArray?.length === [...new Set(dateArray)]?.length ? false : true
    );
    setTours(tempTours);
    setLoadingTours(false);
  }, [order?.order, order?.value, tab, user?.guide, user?.uid]);
  const accountCancelTour = useCallback(async (tour, reason) => {
    setLoading(true);
    return cancelTour(tour, reason, user?.guide === "true")
      .then((res) => {
        if (res) {
          getTours();
          setLoading(false);
          return res;
        }
        setLoading(false);
        return false;
      })
      .catch(() => {
        setLoading(false);
        return false;
      });
  }, [cancelTour, getTours, user?.guide]);
  useEffect(() => {
    if (user?.uid) {
      setLoadingTours(true);
      setTours([]);
      setHasMore(false);
      getTours();
    }
  }, [getTours, order, tab, user?.uid]);
  return (
    <ToursStyles>
      {loading && <ConfirmingTour t={t} />}
      <BasicModal setShowModal={setError} showModal={error}>
        <TourError t={t} />
      </BasicModal>
      <BasicModal setShowModal={setShowCancelModal} showModal={showCancelModal}>
        <CancelTourForm
          setShowModal={setShowCancelModal}
          showModal={showCancelModal}
          user={user}
          tour={selectedTour}
          t={t}
          cancelTour={accountCancelTour}
          loading={loading}
          tourStatusChanged={tourStatusChanged}
          getTours={getTours}
          setError={setError}
        />
      </BasicModal>
      {tab === "pending" && (
        <>
          {user?.guide === "true" ? (
            <h2>{t("waitingYourConfirmation")}</h2>
          ) : (
            <h2>{t("waitingGuideConfirmation")}</h2>
          )}
          {tours.length === 0 && !loadingTours && (
            <NotFound message={`${t("noPendingTours")}`} />
          )}
        </>
      )}
      {tab === "waitingPay" && (
        <>
          <h2>{t("waitingPay")}</h2>
          {tours.length === 0 && !loadingTours && (
            <NotFound message={`${t("noWaitingPayTours")}`} />
          )}
        </>
      )}
      {tab === "confirmed" && (
        <>
          <h2>{t("confirmedTours")}</h2>
          {tours.length === 0 && !loadingTours && (
            <NotFound message={`${t("noConfirmedTours")}`} />
          )}
        </>
      )}
      {tab === "waitingReview" && (
        <>
          <h2>
            {user.guide === "true" ? (
              <>{t("waitingTravelerReview")}</>
            ) : (
              <>{t("waitingYourReview")}</>
            )}
          </h2>
          {tours.length === 0 && !loadingTours && (
            <NotFound message={`${t("noWaitingReviewTours")}`} />
          )}
        </>
      )}
      {tab === "completed" && (
        <>
          <h2>{t("completedTours")}</h2>
          {tours.length === 0 && !loadingTours && (
            <NotFound message={`${t("noCompletedTours")}`} />
          )}
        </>
      )}
      {hasSameDate &&
        (tab === "pending" || tab === "confirmed" || tab === "waitingPay") && (
          <div className="same-date">
            <Image
              height={20}
              width={20}
              src="/img/icon-alert.svg"
              alt="spinner"
            ></Image>
            {user?.guide === "true" ? t("sameDate") : t("sameDateTraveler")}
          </div>
        )}
      {loadingTours && <LoadingTours t={t} />}
      <ul>
        {tours.map((tour, i) => (
          <ScheduledTour
            user={user}
            tour={tour}
            key={i}
            t={t}
            currency={currency}
            setShowCancelModal={setShowCancelModal}
            setSelectedTour={setSelectedTour}
            setLoading={setLoading}
            loading={loading}
            confirmTour={confirmTour}
            acceptTour={acceptTour}
            tourStatusChanged={tourStatusChanged}
            setTab={setTab}
            setError={setError}
            getTours={getTours}
          />
        ))}
      </ul>
      {hasMore && (
        <div className="show-more-wrapper">
          {loadingMore ? (
            <div className="loading-more show-more">
              <Image
                height={30}
                width={30}
                src="/img/icon-spinner.svg"
                alt="spinner"
              ></Image>
            </div>
          ) : (
            <button className="show-more" onClick={getMoreTours}>
              <Image
                height={15}
                width={15}
                src="/img/icon-arrow-down.svg"
                alt="clock"
              ></Image>{" "}
              {t("showMore")}
            </button>
          )}
        </div>
      )}
    </ToursStyles>
  );
};
export default Tours;
