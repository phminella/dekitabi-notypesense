import { RequestAvailabilityCompletedStyles } from "./styles/RequestAvailabilityCompletedStyles";
import Image from "next/image";
const RequestAvailabilityCompleted = ({ t }) => {
  return (
    <RequestAvailabilityCompletedStyles>
      <p className="title">{t("requestCompleted")}</p>
      <div className="message-wrapper">
        <Image height={80} width={80} src="/img/icon-check.svg" alt="dekitabi-tour-guide-availability-requested" />
        <p className="message">{t("requestCompletedMsg")}</p>
        <p className="message">{t("requestCompletedMsg2")}</p>
        <div>
          <b>{t("requestCompletedMsg3")}</b>
        </div>
        <p className="thanks">{t("thanksUsingDekitabi")}</p>
      </div>
    </RequestAvailabilityCompletedStyles>
  );
};
export default RequestAvailabilityCompleted;
