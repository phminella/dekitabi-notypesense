import { ReviewAlreadyCompletedStyles } from "../../../Reviews/styles/ReviewAlreadyCompletedStyles";
import Image from "next/image";
const ReviewAlreadyCompleted = ({ t, signIn }) => {
  return (
    <ReviewAlreadyCompletedStyles>
      <div className="review-already-completed-wrapper">
        <div className="logo">
          <Image
            src="/img/logo-short.png"
            height={100}
            width={100}
            alt="logo"
            priority={true}
          />
        </div>
        <h2>{t(signIn ? "shops:signInToReview" : "shops:activityAlreadyReviewed")}</h2>
      </div>
    </ReviewAlreadyCompletedStyles>
  );
};
export default ReviewAlreadyCompleted;
