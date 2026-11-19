import { DekitabiReviewsStyles } from "./styles/DekitabiReviewsStyles";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
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
import DekitabiReview from "./DekitabiReview";
import Spinner from "../../UI/Spinner";
import DekitabiReviewsSort from "./DekitabiReviewsSort";
const DekitabiReviews = ({
  user,
  t,
  id,
  guide = false,
  profile,
  reviewsLength,
  activity,
  shop,
}) => {
  const [reviews, setReviews] = useState(profile?.reviews);
  const [sortBy, setSortBy] = useState("newest");
  const [order, setOrder] = useState({ value: "createdAt", order: "desc" });
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const getMoreReviews = async () => {
    setLoadingMore(true);
    const queryCursor = await getDoc(
      doc(
        getFirestore(),
        activity ? "activityReviews" : "reviews",
        reviews[reviews?.length - 1]?.id
      )
    );
    let q;
    q = query(
      collection(getFirestore(), activity ? "activityReviews" : "reviews"),
      where(
        guide ? "guideId" : activity ? "activityId" : "itineraryId",
        "==",
        id
      ),
      orderBy(order?.value, order?.order),
      startAfter(queryCursor),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let tempReviews = [];
    querySnapshot.forEach((doc) => {
      tempReviews.push(doc.data());
    });
    setLoadingMore(false);
    setReviews([...reviews, ...tempReviews]);
  };
  const getReviews = async () => {
    setLoadingReviews(true);
    let q;
    q = query(
      collection(getFirestore(), activity ? "activityReviews" : "reviews"),
      where(
        guide ? "guideId" : activity ? "activityId" : "itineraryId",
        "==",
        id
      ),
      orderBy(order?.value, order?.order),
      limit(7)
    );
    const querySnapshot = await getDocs(q);
    let tempReviews = [];
    querySnapshot.forEach((doc) => {
      tempReviews.push(doc.data());
    });
    setReviews(tempReviews);
    setTimeout(() => {
      setLoadingReviews(false);
    }, 500);
  };
  useEffect(() => {
    if (id) {
      getReviews();
    }
  }, [id, sortBy]);
  return (
    <DekitabiReviewsStyles className="dekitabi-reviews">
      {reviewsLength > 0 && !shop && (
        <DekitabiReviewsSort
          t={t}
          setOrder={setOrder}
          setSortBy={setSortBy}
          sortBy={sortBy}
          reviewsLength={reviewsLength}
          guide={guide}
          activity={activity}
        />
      )}
      {loadingReviews && <Spinner />}
      {!loadingReviews && (
        <>
          {reviewsLength === 0 && <p>{t("noReviews")}</p>}
          {reviews?.map((review, i) => (
            <DekitabiReview
              key={i}
              review={review}
              guide={guide}
              user={user}
              t={t}
              profile={profile}
              activity={activity ? id : shop}
            />
          ))}
          {reviewsLength > reviews?.length && !shop && (
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
                <button className="show-more" onClick={getMoreReviews}>
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
        </>
      )}
    </DekitabiReviewsStyles>
  );
};
export default React.memo(DekitabiReviews);
