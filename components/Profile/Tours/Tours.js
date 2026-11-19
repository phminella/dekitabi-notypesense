import { ToursStyles } from "./styles/ToursStyles";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import Tour from "../../S/Tours/Tour";
import { useSelector, shallowEqual } from "react-redux";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  limit,
  getFirestore,
  startAfter,
  doc,
} from "firebase/firestore/lite";
const Tours = ({ profile, user, t, currency, tours, setTours }) => {
  const language = useSelector((state) => state.app.language, shallowEqual);
  const [loading, setLoading] = useState();
  const [loadingMore, setLoadingMore] = useState();
  const [hasMore, setHasMore] = useState(false);
  const getMoreTours = async () => {
    setLoadingMore(true);
    const queryCursor = await getDoc(
      doc(getFirestore(), "tours", tours[tours?.length - 1]?.id)
    );
    let q;
    q = query(
      collection(getFirestore(), "tours"),
      where("createdBy", "==", profile?.uid),
      startAfter(queryCursor),
      limit(7)
    );
    const querySnapshot = await getDocs(q);
    let tempTours = [];
    querySnapshot.forEach((doc) => {
      tempTours?.push(doc.data());
    });
    if (tempTours?.length === 7) {
      tempTours?.pop();
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    let mergedTours = await Promise.all(
      tempTours?.map(async (tour) => {
        return { ...tour };
      })
    );
    setLoadingMore(false);
    setTours([...tours, ...mergedTours]);
  };
  const getTours = async () => {
    setLoading(true);
    let q;
    q = query(
      collection(getFirestore(), "tours"),
      where("createdBy", "==", profile?.uid),
      limit(7)
    );
    const querySnapshot = await getDocs(q);
    let tempTours = [];
    querySnapshot.forEach((doc) => {
      tempTours?.push(doc.data());
    });
    if (tempTours?.length === 7) {
      tempTours?.pop();
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    let mergedTours = await Promise.all(
      tempTours?.map(async (tour) => {
        return { ...tour };
      })
    );
    setTours(mergedTours);
    setLoading(false);
  };
  useEffect(() => {
    if (profile?.uid) {
      getTours();
    }
  }, [profile?.uid]);
  return (
    <ToursStyles>
      {profile?.guide === "true" && (
        <p className="profile-title">{t("tours")}</p>
      )}
      <div className="tours-section">
        {loading && (
          <div className={profile?.guide === "false" ? "spinner-wrapper" : ""}>
            <Image
              height={30}
              width={30}
              src="/img/icon-spinner.svg"
              alt="loading-dekitabi-tour-guides-tours"
            ></Image>{" "}
          </div>
        )}
        {tours?.length === 0 && !loading && (
          <p
            className={`no-itineraries ${
              profile?.guide === "false" ? "traveler-no-itineraries" : ""
            }`}
          >
            {t("noItineraries")}
          </p>
        )}
        {tours?.length > 0 && (
          <div className="tours-wrapper">
            {tours?.map((tour, i) => (
              <Tour
                language={language}
                tour={tour}
                key={i}
                t={t}
                currency={currency}
              />
            ))}
          </div>
        )}
        {hasMore && !loading && (
          <div className="show-more-wrapper">
            {loadingMore ? (
              <div className="loading-more show-more">
                <Image
                  height={30}
                  width={30}
                  src="/img/icon-spinner.svg"
                  alt="loading-more-dekitabi-tour-guides-tours"
                ></Image>
              </div>
            ) : (
              <button className="show-more" onClick={getMoreTours}>
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-arrow-down.svg"
                  alt="load-more-dekitabi-tour-guides-tours"
                ></Image>{" "}
                {t("showMore")}
              </button>
            )}
          </div>
        )}
      </div>
    </ToursStyles>
  );
};
export default React.memo(Tours);
