import { ReviewFormStyles } from "../../../Reviews/styles/ReviewFormStyles";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  updateDoc,
  increment,
} from "firebase/firestore/lite";
import { useSelector, shallowEqual } from "react-redux";
import TextField from "@mui/material/TextField";
import { useTranslation } from "next-i18next";
import Rating from "@mui/material/Rating";
import Spinner from "../../../UI/Spinner";
import ReviewComplete from "./ReviewComplete";
import ReviewAlreadyCompleted from "./ReviewAlreadyCompleted";
const ReviewForm = ({ id }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.app.user, shallowEqual);
  const language = useSelector((state) => state.app.language, shallowEqual);
  const [reviewComplete, setReviewComplete] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [activityRating, setActivityRating] = useState(5);
  const [message, setMessage] = useState("");
  const [activity, setActivity] = useState();
  const [signIn, setSignIn] = useState(false);
  const getReviewItems = async () => {
    const orderRef = doc(getFirestore(), "orders", id);
    const orderSnap = await getDoc(orderRef);
    if (orderSnap.exists()) {
      const order = orderSnap.data();
      if(order?.customerId !== user?.uid) {
        setSignIn(true);
        setLoading(false);
      } else {
      if (!order?.reviewed) {
        const activityRef = doc(
          getFirestore(),
          "activities",
          order?.activityId
        );
        const activitySnap = await getDoc(activityRef);
        setActivity(activitySnap.data());
        setLoading(false);
      } else {
        setAlreadyReviewed(true);
        setLoading(false);
      }
    }}
  };
  const reviewExists = async () => {
    const reviewRef = doc(getFirestore(), "activityReviews", id);
    const reviewSnap = await getDoc(reviewRef);
    return reviewSnap.exists();
  };
  useEffect(() => {
    if (id && user) {
      reviewExists()
        .then((exists) => {
          if (exists) {
            setAlreadyReviewed(true);
            setLoading(false);
          } else {
            setName(user?.firstname ? `${user?.firstname} ${user?.lastname}` : "");
            getReviewItems();
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id, user]);
  const sendReview = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    const activityRef = doc(getFirestore(), "activities", activity?.id);
    let activityRatingArray;
    let activityRatingScore = 0;
    activityRatingArray = activity.ratings ? [...activity.ratings] : [];
    activityRatingArray.push(activityRating);
    activityRatingScore =
      activityRatingArray.reduce((a, b) => a + b) / activityRatingArray.length;
    updateDoc(activityRef, {
      ratings: activityRatingArray,
      ratingScore: activityRatingScore,
      ratingCounter: increment(1),
    })
      .then(() => {
        setDoc(doc(getFirestore(), "activityReviews", id), {
          id: id,
          name,
          ...(user?.uid && { userId: user?.uid }),
          activityId: activity?.id,
          activityRating,
          message: message,
          createdAt: new Date().getTime(),
        })
          .then(() => {
            setReviewComplete(true);
          })
          .catch((err) => {
            console.log(err);
            setError(true);
          });
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  if (loading) return <Spinner />;
  if (alreadyReviewed || signIn) return <ReviewAlreadyCompleted t={t} signIn={signIn}/>;
  return (
    <ReviewFormStyles>
      <div className="review-wrapper">
        <ReviewComplete t={t} reviewComplete={reviewComplete} />
        <form onSubmit={sendReview}>
          <div className="review-title">
            <h1>{t("shops:reviewActivity")}</h1>
            <p>{t("shops:reviewActivityMsg")}</p>
          </div>
          <div className="review-intro">
            <h3>
              {activity?.translatedName
                ? activity?.translatedName[language?.code]
                : activity?.name}
            </h3>
          </div>
          <div className="mui-input-wrapper">
            <TextField
              required
              name="name"
              label={t("name")}
              placeholder={t("namePlaceholder")}
              variant="filled"
              color="secondary"
              value={name}
              minLength={2}
              maxLength={25}
              onChange={(e) => {
                const regex = /[^0-9]/;
                if (
                  e.target.value.length < 25 &&
                  (regex.test(e.target.value) || e.target.value === "")
                ) {
                  setName(e.target.value);
                }
              }}
            />
          </div>
          <div className="ratings">
            <div className="two-columns-wrapper rating">
              <p>{t("shops:reviewActivity")}</p>
              <div className="rating-stars">
                <Rating
                  name="half-rating-read"
                  value={activityRating || 5}
                  onChange={(e) => setActivityRating(parseInt(e.target.value))}
                  precision={0.5}
                  size={"large"}
                  defaultValue={5}
                  required
                />
              </div>
            </div>
          </div>
          <div className="review-message">
            <textarea
              value={message}
              placeholder={t("shops:reviewActivityPlaceholder")}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              autoFocus
              required
              minLength={10}
            ></textarea>
            <p className="review-counter">
              {1000 - message.length} {t("charRemaining")}
            </p>
          </div>
          <div className="submit-button">
            {sending ? (
              <div className="normal-button">
                <Image
                  src="/img/icon-spinner.svg"
                  height={40}
                  width={40}
                  alt="icon-spinner"
                />
              </div>
            ) : (
              <button className="normal-button">{t("sendReview")}</button>
            )}
            {error && (
              <p className="error-message">
                <Image
                  height={20}
                  width={20}
                  src="/img/icon-alert.svg"
                  alt="alert"
                ></Image>
                {t("errorMsg")}
              </p>
            )}
          </div>
        </form>
      </div>
    </ReviewFormStyles>
  );
};
export default ReviewForm;
