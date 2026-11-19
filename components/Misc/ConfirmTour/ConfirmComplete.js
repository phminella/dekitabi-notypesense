import { ConfirmCompleteStyles } from "./styles/ConfirmCompleteStyles";
import Image from "next/image";
const ConfirmComplete = ({ tour, t }) => {
  return (
    <ConfirmCompleteStyles>
      <div className="confirm-complete">
        <Image
          src="/img/logo.png"
          height={46}
          width={150}
          alt="logo"
          className="logo"
          style={{ marginBottom: "15px" }}
        />
        <Image height={75} width={75} src="/img/icon-check.svg" alt="checked" />
        <br />
        <h2>
          {tour.name} {t("wasConfirmed2")}
        </h2>
        <ul>
          <li>{t("confirmationInfo1")}</li>
          <li>{t("confirmationInfo2")}</li>
          <li>{t("confirmationInfo3")}</li>
        </ul>
        <h2 className="thank-you">
          {t("thanksUsingDekitabi")}
          <br /> {t("haveNiceTour")}
        </h2>
      </div>
    </ConfirmCompleteStyles>
  );
};
export default ConfirmComplete;
