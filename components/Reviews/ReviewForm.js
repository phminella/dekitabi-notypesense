import { ReviewFormStyles } from "./styles/ReviewFormStyles";
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
import Spinner from "../UI/Spinner";
import ReviewComplete from "./ReviewComplete";
import axios from "axios";
import Head from "next/head";
import ReviewAlreadyCompleted from "./ReviewAlreadyCompleted";
import { useLeavePageConfirmation } from "../../lib/useLeavePageConfirmation";
const ReviewForm = ({ id }) => {
  const customizedDialog = async (msg) => {
    const confirmationValue = window.confirm(msg);
    return confirmationValue;
  };
  const { t } = useTranslation();
  const user = useSelector((state) => state.app.user, shallowEqual);
  const [reviewComplete, setReviewComplete] = useState(false);
  const [error, setError] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [tourRating, setTourRating] = useState(5);
  const [guideRating, setGuideRating] = useState(5);
  const [message, setMessage] = useState("");
  const [tour, setTour] = useState("");
  const [guide, setGuide] = useState("");
  useLeavePageConfirmation(loading, t("leavePage"), customizedDialog);
  const getReviewItems = async () => {
    const itineraryRef = doc(
      getFirestore(),
      "itineraries",
      id?.split("PyCaRABa")[0]
    );
    const itinerarySnap = await getDoc(itineraryRef);
    if (itinerarySnap.exists()) {
      const itinerary = itinerarySnap.data();
      if (!itinerary?.reviewed) {
        setTour(itinerarySnap.data());
        const guideRef = doc(getFirestore(), "users", itinerary?.guide);
        const guideSnap = await getDoc(guideRef);
        setGuide(guideSnap.data());
      } else {
        setAlreadyReviewed(true);
      }
    }
  };
  const reviewExists = async (id) => {
    const reviewRef = doc(getFirestore(), "reviews", id?.split("PyCaRABa")[0]);
    const reviewSnap = await getDoc(reviewRef);
    return reviewSnap.exists();
  };
  useEffect(() => {
    if (id) {
      reviewExists(id?.split("PyCaRABa")[0])
        .then((exists) => {
          if (exists) {
            setAlreadyReviewed(true);
          } else {
            getReviewItems();
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id]);
  useEffect(() => {
    if (user) {
      setName(user?.firstname ? `${user?.firstname} ${user?.lastname}` : "");
    }
  }, [user]);
  const sendReview = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (tour?.status === "waitingReview") {
      return axios({
        method: "post",
        url: `https://asia-northeast1-dekitabi.cloudfunctions.net/completeTour`,
        data: {
          tour,
          review: {
            id,
            name,
            guideRating,
            guideId: tour.guide,
            itineraryId: tour.tourBaseItinerary,
            tourRating,
            message,
            createdAt: new Date().getTime(),
          },
        },
      })
        .then((data) => {
          setLoading(false);
          const itineraryRef = doc(
            getFirestore(),
            "itineraries",
            id?.split("PyCaRABa")[0]
          );
          updateDoc(itineraryRef, { reviewed: true });
          setReviewComplete(true);
          return data;
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      const itineraryRef = doc(
        getFirestore(),
        "itineraries",
        id?.split("PyCaRABa")[0]
      );
      const updateGuideDb = async () => {
        let guideRatingArray;
        let guideRatingScore;
        guideRatingArray = [...guide.ratings];
        guideRatingArray.push(guideRating);
        guideRatingScore =
          guideRatingArray.reduce((a, b) => a + b) / guideRatingArray.length;
        const guideRef = doc(getFirestore(), "users", tour?.guide);
        return updateDoc(guideRef, {
          ratings: guideRatingArray,
          ratingScore: guideRatingScore,
          ratingCounter: increment(1),
        })
          .then(() => {
            return true;
          })
          .catch((err) => console.log(err));
      };
      return setDoc(doc(getFirestore(), "reviews", id?.split("PyCaRABa")[0]), {
        id: id?.split("PyCaRABa")[0],
        name,
        ...(user?.uid && { userId: user?.uid }),
        ...(user?.username && { username: user?.username }),
        ...(user?.avatar && { avatar: user?.avatar }),
        guideId: tour.guide,
        guideRating,
        ...(tour.tourBaseItinerary &&
          tour?.status &&
          tour?.status !== "canceled" && {
            itineraryId: tour.tourBaseItinerary,
          }),
        tourRating: tourRating,
        message: message,
        createdAt: new Date().getTime(),
      })
        .then(async () => {
          updateDoc(itineraryRef, { reviewed: true });
          updateGuideDb().then(async () => {
            if (
              tour?.tourBaseItinerary &&
              tour?.status &&
              tour?.status !== "canceled"
            ) {
              const tourRef = doc(
                getFirestore(),
                "tours",
                tour.tourBaseItinerary
              );
              const tourBaseData = await getDoc(tourRef);
              if (tourBaseData.exists()) {
                const tourBase = tourBaseData.data();
                let tourRatingArray = [...tourBase.ratings];
                tourRatingArray.push(tourRating);
                let tourRatingScore =
                  tourRatingArray.reduce((a, b) => a + b) /
                  tourRatingArray.length;
                return updateDoc(tourRef, {
                  ratingScore: tourRatingScore,
                  ratingCounter: increment(1),
                  ratings: tourRatingArray,
                })
                  .then(() => {
                    const tourBaseItineraryRef = doc(
                      getFirestore(),
                      "itineraries",
                      tour.tourBaseItinerary
                    );
                    return updateDoc(tourBaseItineraryRef, {
                      ratingScore: tourRatingScore,
                      ratingCounter: increment(1),
                      ratings: tourRatingArray,
                    })
                      .then(() => {
                        updateDoc(itineraryRef, { reviewed: true });
                        setReviewComplete(true);
                        setLoading(false);
                        return true;
                      })
                      .catch((err) => {
                        console.log(err);
                        setLoading(false);
                        return false;
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    setLoading(false);
                    return false;
                  });
              } else {
                updateDoc(itineraryRef, { reviewed: true });
                setReviewComplete(true);
                setLoading(false);
                return true;
              }
            } else {
              updateDoc(itineraryRef, { reviewed: true });
              setReviewComplete(true);
              setLoading(false);
              return true;
            }
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          return false;
        });
    }
  };
  if ((!tour || !guide) && !alreadyReviewed) return <Spinner />;
  if (alreadyReviewed) return <ReviewAlreadyCompleted t={t} />;
  return (
    <ReviewFormStyles>
      <Head>
        <title>
          {guide?.firstname || guide?.lastname
            ? t("reviewGuide", {
                name: `${guide?.firstname} ${guide?.lastname}`,
              })
            : t("reviewGuide", { name: guide?.username })}
        </title>
      </Head>
      <div className="review-wrapper">
        <ReviewComplete t={t} reviewComplete={reviewComplete} />
        <form>
          <div className="review-title">
            <h1>{t("reviewTitle")}</h1>
            <p>{t("reviewSubtitle")}</p>
          </div>
          <div className="review-intro">
            <h3>{tour.name}</h3>
            <p>
              {t("guide")}:{" "}
              {guide?.firstname
                ? `${guide?.firstname} ${guide?.lastname}`
                : guide?.username}
            </p>
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
              <p>{t("guideRating")}</p>
              <div className="rating-stars">
                <Rating
                  name="half-rating-read"
                  value={guideRating || 5}
                  onChange={(e) => setGuideRating(parseInt(e.target.value))}
                  precision={0.5}
                  size={"large"}
                  defaultValue={5}
                />
              </div>
            </div>{" "}
            {tour.tourBaseItinerary &&
              tour.status &&
              tour.status !== "canceled" && (
                <div className="two-columns-wrapper rating">
                  <p>{t("tourRating")}</p>
                  <div className="rating-stars">
                    <Rating
                      name="half-rating-read"
                      value={tourRating || 5}
                      onChange={(e) => setTourRating(parseInt(e.target.value))}
                      precision={0.5}
                      size={"large"}
                      defaultValue={5}
                    />
                  </div>
                </div>
              )}
          </div>
          <div className="review-message">
            <textarea
              value={message}
              placeholder={t("reviewPlaceholder")}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              autoFocus
            ></textarea>
            <p className="review-counter">
              {1000 - message.length} {t("charRemaining")}
            </p>
          </div>
          <div className="submit-button">
            {loading ? (
              <div className="normal-button">
                <Image
                  src="/img/icon-spinner.svg"
                  height={40}
                  width={40}
                  alt="icon-spinner"
                />
              </div>
            ) : (
              <button className="normal-button" onClick={sendReview}>
                {t("sendReview")}
              </button>
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
