import { AttractionReviewStyles } from "./styles/AttractionReviewStyles";
import Avatar from "../UI/Avatar";
import Rating from "@mui/material/Rating";
import isMobile from "../../lib/isMobile";
const AttractionReview = ({ review }) => {
  return (
    <AttractionReviewStyles>
      <Avatar width={60} height={60} src={review.profile_photo_url} />
      <div className="review-details">
        <p className="review-author">
          <a
            href={review.author_url}
            target={isMobile() ? "_self" : "_blank"}
            rel="noreferrer"
          >
            {review.author_name}
          </a>{" "}
          <span>{review.relative_time_description}</span>
        </p>
        <div className="review-rating">
          <Rating
            name="half-rating-read"
            defaultValue={review.rating}
            precision={0.5}
            size={"large"}
            readOnly
          />
        </div>
        <p>{review.text}</p>
      </div>
    </AttractionReviewStyles>
  );
};
export default AttractionReview;
