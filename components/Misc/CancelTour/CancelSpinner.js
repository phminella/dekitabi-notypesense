import { CancelSpinnerStyles } from "./styles/CancelSpinnerStyles";
import Image from "next/image";
const CancelSpinner = ({ t }) => {
  return (
    <CancelSpinnerStyles>
      <div className="loading-modal">
        <div className="loading-bg"></div>
        <div className="loading-wrapper">
          <p className="progress-default-message">
            {t("updatingTourStatus")} <br /> {t("mayTakeSeconds")}
            <br />
            {t("dontClosePage")}
          </p>
          <div className="progress"></div>
        </div>
      </div>
    </CancelSpinnerStyles>
  );
};
export default CancelSpinner;
