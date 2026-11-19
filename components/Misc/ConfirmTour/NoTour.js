import { NoTourStyles } from "./styles/NoTourStyles";
import Image from "next/image";
const NoTour = ({ tour, t, error }) => {
  return (
    <NoTourStyles>
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
        {error === "notPending" && tour?.status === "canceled" && (
          <h2>{t("cantConfirmCanceled")}</h2>
        )}
        {error === "notPending" &&
          (tour?.status === "confirmed" ||
            tour?.status === "waitingReview" ||
            tour?.status === "completed") && (
            <h2>{t("cantConfirmConfirmed")}</h2>
          )}
        {error === "notPending" && tour?.status === "complete" && (
          <h2>{t("cantConfirmHappened")}</h2>
        )}
        {error === "doesNotExist" && <h2>{t("tourDoesntExist")}</h2>}
        {error === "loggedOut" && <h2>{t("signInToConfirm")}</h2>}
      </div>
    </NoTourStyles>
  );
};
export default NoTour;
