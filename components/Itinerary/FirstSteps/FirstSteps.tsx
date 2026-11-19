import { FirstStepsStyles } from "./styles/FirstStepsStyles";
import { FirstStepsResponsiveStyles } from "./styles/responsive/FirstStepsResponsiveStyles";
import React, { useState } from "react";
import BasicModal from "../../UI/BasicModal";
import FirstStepWarning from "./FirstStepWarning";
import Image from "next/image";
import useLocalStorage from "../../../lib/useLocalStorage";
import { User } from "../../../types/user";

interface FirstStepsProps {
  user: User;
  t: (key: string) => string;
  partialSteps?: boolean;
}

const FirstSteps = ({ user, t, partialSteps }: FirstStepsProps) => {
  const [showModal, setShowModal] = useState(true);
  const { setItem } = useLocalStorage();

  const closeModal = async () => {
    setItem("firstItineraryVisit", true);
    setShowModal(false);
  };

  return (
    <FirstStepsResponsiveStyles>
      <FirstStepsStyles>
        <BasicModal showModal={showModal} setShowModal={closeModal}>
          <div className="main-title">
            <Image
              height={65}
              width={65}
              src="/img/icon-settings.svg"
              alt="settings"
            />
            {!partialSteps && <h2>{t("startSetting")}</h2>}
          </div>
          <div className="steps-wrapper">
            <FirstStepWarning t={t} user={user} closeModal={closeModal} />
          </div>
        </BasicModal>
      </FirstStepsStyles>
    </FirstStepsResponsiveStyles>
  );
};
export default FirstSteps;
