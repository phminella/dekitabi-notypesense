import { FirstStepWarningStyles } from "./styles/FirstStepWarningStyles";
import React from "react";
import { User } from "../../../types/user";

interface FirstStepWarningProps {
  t: (key: string) => string;
  closeModal: () => void;
  user: User;
}

const FirstStepWarning = ({ t, closeModal, user }: FirstStepWarningProps) => {
  return (
    <FirstStepWarningStyles>
      <ul>
        <li>
          <h3>{t("firstStepWarning1")}</h3>
        </li>
        <li>
          <div className="circle"></div>
          {t("firstStepWarning2")}
        </li>
        <li>
          <div className="circle"></div>
          {t("firstStepWarning3")}
        </li>
        <li>
          <div className="circle"></div>
          {t("firstStepWarning4")}
        </li>
        <li className="division">
          {user?.guide !== "true" && <h3>{t("firstStepWarning5")}</h3>}
        </li>
        <li>
          <div className="circle"></div>
          {t("completedItem0")}
        </li>
        <li>
          <div className="circle"></div>
          {t("completedItem2")}
        </li>
        {user?.guide === "true" ? (
          <>
            <li>
              <div className="circle"></div>
              {t("completedGuideItem1")}
            </li>
            <li>
              <div className="circle"></div>
              {t("completedGuideItem2")}
            </li>
          </>
        ) : (
          <>
            <li>
              <div className="circle"></div>
              {t("completedTravelerItem1")}
            </li>
          </>
        )}
      </ul>
      <button className="normal-button" onClick={closeModal}>
        {t("startSetting")}
      </button>
    </FirstStepWarningStyles>
  );
};
export default FirstStepWarning;
