import { TourErrorStyles } from "./styles/TourErrorStyles";
import Image from "next/image";
const TourError = ({ t }) => {
  return (
    <TourErrorStyles>
      <h2>
        <Image height={60} width={60} src="/img/icon-alert.svg" alt="alert" />
        {t("error")}
      </h2>
      <p>
        {t("tourError1")} <br />
        {t("tourError2")} <br />
        {t("tourError3")}
      </p>
      <h3>{t("sorryInconvenience")}</h3>
    </TourErrorStyles>
  );
};
export default TourError;
