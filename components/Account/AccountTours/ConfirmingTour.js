import { useEffect, useState } from "react";
import { ConfirmingTourStyles } from "./styles/ConfirmingTourStyles.js";
import Image from "next/image";
const ConfirmingTour = ({ t }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((previous) => (previous === 4 ? 0 : previous + 1));
    }, 3500);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <ConfirmingTourStyles>
      <div className="loading-modal">
        <div className="loading-bg"></div>
        <div className="loading-wrapper">
          <Image
            src="/img/logo.png"
            height={45}
            width={141}
            alt="logo"
            className="logo"
            style={{ marginBottom: "15px" }}
          />
          <p className="progress-default-message">
            {t("updatingTourStatus")} <br />
            {t("mayTakeSeconds")}
            <br />
            {t("dontClosePage")}
          </p>
          <ul className="progress-list">
            <li className={progress === 0 ? "show" : ""}>
              <Image
                height={100}
                width={100}
                src="/img/icon-refresh.svg"
                alt="refresh"
              />
              {t("confirmProgress2")}
            </li>
            <li className={progress === 1 ? "show" : ""}>
              <Image
                height={100}
                width={100}
                src="/img/icon-send.svg"
                alt="send"
              />
              {t("confirmProgress4")}
            </li>
            <li className={progress === 2 ? "show" : ""}>
              <Image
                height={100}
                width={100}
                src="/img/icon-refresh.svg"
                alt="refresh"
              />
              {t("confirmProgress3")}
            </li>
            <li className={progress === 3 ? "show" : ""}>
              <Image
                height={100}
                width={100}
                src="/img/icon-send.svg"
                alt="send"
              />
              {t("confirmProgress5")}
            </li>
            <li className={progress === 4 ? "show" : ""}>
              <Image
                height={100}
                width={100}
                src="/img/icon-checkout.svg"
                alt="checkout"
              />
              {t("confirmProgress1")}
            </li>
          </ul>
          <div className="progress"></div>
        </div>
      </div>
    </ConfirmingTourStyles>
  );
};
export default ConfirmingTour;
