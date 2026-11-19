import { NoTourStyles } from "./styles/NoTourStyles";
import Image from "next/image";
const NoTour = ({ tour, t }) => {
  return (
    <NoTourStyles>
      <div className="cancel-wrapper">
        <div className="wrapper">
          <Image
            src="/img/logo.png"
            height={46}
            width={150}
            alt="logo"
            className="logo"
            style={{ marginBottom: "15px" }}
          />
          <Image
            width={340}
            height={180}
            src="/img/pageNotFound.webp"
            alt="not-found"
            style={{ width: "100%", height: "auto" }}
          />
          {(tour.status === "canceled" || (tour?.id && !tour?.status)) && (
            <h2>{t("tourAlreadyCanceled")}</h2>
          )}
          {tour.status === "complete" && <h2>{t("tourAlreadyHappened")}</h2>}
          {tour === "noTour" && <h2>{t("tourDoesntExist")}</h2>}
        </div>
      </div>
    </NoTourStyles>
  );
};
export default NoTour;
