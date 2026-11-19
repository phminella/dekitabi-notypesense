import { ReviewCompleteStyles } from "./styles/ReviewCompleteStyles";
import Image from "next/image";
const ReviewComplete = ({ t, reviewComplete }) => {
  return (
    <ReviewCompleteStyles className={reviewComplete ? "complete" : ""}>
      <div className="review-complete">
        <Image
          height={75}
          width={75}
          src="/img/icon-check.svg"
          alt="checked"
        />
        <br />
        <h1>{t("reviewSent")}</h1>
        <h3>{t("reviewSentMsg")}</h3>
        <h2>
          {t("thanksBooking")}
          <br />
          {t("andHopeToSeeYou")}
        </h2>
        <h1 className="thankyou">ありがとうございます。</h1>
      </div>
    </ReviewCompleteStyles>
  );
};
export default ReviewComplete;
