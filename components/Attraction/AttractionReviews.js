import { AttractionReviewsStyles } from "./styles/AttractionReviewsStyles";
import Rating from "@mui/material/Rating";
import AttractionReview from "./AttractionReview";
import Image from "next/image";
import ShowOriginal from "../UI/ShowOriginal";
import { useState } from "react";
const AttractionReviews = ({ reviews, rating, ratingCounter, t, language }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  return (
    <AttractionReviewsStyles className="reviews">
      <h3>
        <Image
          height={18}
          width={18}
          src="/img/icon-google.svg"
          alt="google"
        ></Image>
        {t("reviews")}
      </h3>
      {/* {language?.code !== "en" && (
        <ShowOriginal
          t={t}
          showOriginal={showOriginal}
          setShowOriginal={setShowOriginal}
        />
      )} */}
      <div className="reviews-header">
        <div className="reviews-header-rating">{rating}</div>
        <div className="reviews-header-stars">
          <Rating
            name="half-rating-read"
            defaultValue={rating}
            precision={0.5}
            size={"large"}
            readOnly
          />
          {ratingCounter} {t("reviews")}
        </div>
      </div>
      <div className="reviews-comments">
        {reviews?.map((review, i) => (
          <AttractionReview key={i} review={review} />
        ))}
      </div>
    </AttractionReviewsStyles>
  );
};
export default AttractionReviews;
