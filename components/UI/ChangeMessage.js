import { ChangeMessageStyles } from "./styles/ChangeMessageStyles";
import Image from "next/image";
import { useTranslation } from "next-i18next";
const ChangeMessage = ({ message, showMsg }) => {
  const { t } = useTranslation();
  return (
    <ChangeMessageStyles className={`${showMsg ? "status-changed" : ""}`}>
      <p>
        <Image
          height={20}
          width={20}
          src={`/img/icon-${
            message === "removedFromItinerary" ? "delete" : "check"
          }.svg`}
          alt="checked"
        />
        {t(message)}
      </p>
    </ChangeMessageStyles>
  );
};
export default ChangeMessage;
