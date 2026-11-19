import { CancelTourStyles } from "./styles/CancelTourStyles";
import CancelTourForm from "./CancelTourForm";
import { useTranslation } from "next-i18next";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import { useCallback, useEffect, useState } from "react";
import Spinner from "../../UI/Spinner";
import NoTour from "./NoTour";
import CancelComplete from "./CancelComplete";
import useTour from "../../../lib/useTour";
import Head from "next/head";
import { useLeavePageConfirmation } from "../../../lib/useLeavePageConfirmation";
import { useSelector } from "react-redux";
const CancelTour = ({ id }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.app.user);
  const customizedDialog = async (msg) => {
    const confirmationValue = window.confirm(msg);
    return confirmationValue;
  };
  const { cancelTour, loading } = useTour();
  useLeavePageConfirmation(loading, t("leavePage"), customizedDialog);
  const [tour, setTour] = useState();
  const [showModal, setShowModal] = useState(true);
  const [isGuide, setIsGuide] = useState(false);
  const getTour = useCallback(async () => {
    if (id?.slice(20) === "PyCaRABa") {
      setIsGuide(true);
    }
    const itineraryRef = doc(
      getFirestore(),
      "itineraries",
      id?.split("PyCaRABa")[0]
    );
    const tourSnap = await getDoc(itineraryRef);
    setTour(tourSnap.data() || "noTour");
  }, [id]);
  useEffect(() => {
    if (id) {
      getTour();
    }
  }, [getTour, id]);
  if (!tour || !user) return <Spinner />;
  if (
    (tour.status !== "pending" && tour.status !== "confirmed") ||
    tour === "noTour"
  )
    return <NoTour tour={tour} t={t} />;
  return (
    <CancelTourStyles>
      <Head>
        <title>{t("cancelTour")}</title>
      </Head>
      <div className="cancel-wrapper">
        <CancelTourForm
          t={t}
          tour={tour}
          setShowModal={setShowModal}
          isGuide={isGuide}
          loading={loading}
          cancelTour={cancelTour}
          user={user}
        />
        {!showModal && (
          <CancelComplete t={t} tour={tour} isGuide={isGuide} user={user} />
        )}
      </div>
    </CancelTourStyles>
  );
};
export default CancelTour;
