import { useTranslation } from "next-i18next";
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
import { useCallback, useEffect, useRef, useState } from "react";
import { ConfirmingTourStyles } from "./styles/ConfirmingTourStyles";
import NoTour from "./NoTour";
import useTour from "../../../lib/useTour";
import ConfirmComplete from "./ConfirmComplete";
import ConfirmingTour from "../../Account/AccountTours/ConfirmingTour";
import { useSelector, shallowEqual } from "react-redux";
import Head from "next/head";
import Spinner from "../../UI/Spinner";
import { getFunctions, httpsCallable } from "firebase/functions";
import TourError from "../TourError";
const ConfirmTour = ({ id }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.app.user, shallowEqual);
  const { confirmTour, acceptTour } = useTour();
  const [complete, setComplete] = useState(false);
  const [tour, setTour] = useState();
  const [confirmingTour, setConfirmingTour] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const confirmingRef = useRef();
  const getTour = useCallback(async () => {
    let functions;
    let sendEmail;
    try {
      functions = getFunctions(undefined, "asia-northeast1");
      sendEmail = httpsCallable(functions, "sendEmail");
    } catch (err) {
      console.log(err);
    }
    const itineraryRef = doc(getFirestore(), "itineraries", id);
    const tourSnap = await getDoc(itineraryRef);
    const tempTour = tourSnap.data();
    setTour(tempTour);
    if (tempTour?.id) {
      if (tempTour?.guide === user?.uid) {
        if (tempTour.status === "pending") {
          setConfirmingTour(false);
          setLoading(true);
          if (tempTour?.paymentMethod?.type === "card") {
            confirmTour(user, tempTour)
              .then((ok) => {
                if (ok) {
                  setLoading(false);
                  setComplete(true);
                } else {
                  setLoading(false);
                  setError("error");
                }
              })
              .catch(async (err) => {
                if (sendEmail) {
                  await sendEmail({
                    to: "contact@dekitabi.com",
                    sender: "contact@dekitabi.com",
                    subject: `dekitabi | Confirm error`,
                    body: `itineraryId: ${tempTour?.id} error: ${JSON.stringify(
                      err
                    )} time: ${new Date()}`,
                  });
                }
                setLoading(false);
                setError("error");
              });
          } else {
            acceptTour(user, tempTour)
              .then((ok) => {
                if (ok) {
                  setLoading(false);
                  setComplete(true);
                } else {
                  setLoading(false);
                  setError("error");
                }
              })
              .catch(async (err) => {
                if (sendEmail) {
                  await sendEmail({
                    to: "contact@dekitabi.com",
                    sender: "contact@dekitabi.com",
                    subject: `dekitabi | Confirm error`,
                    body: `itineraryId: ${tempTour?.id} error: ${JSON.stringify(
                      err
                    )} time: ${new Date()}`,
                  });
                }
                setLoading(false);
                setError("error");
              });
          }
        } else {
          setError("notPending");
          setConfirmingTour(false);
        }
      } else {
        setError("loggedOut");
        setConfirmingTour(false);
      }
    } else {
      setError("doesNotExist");
      setConfirmingTour(false);
    }
  }, [acceptTour, confirmTour, id, user]);
  useEffect(() => {
    if (id && user?.uid && !confirmingRef.current) {
      confirmingRef.current = true;
      getTour();
    } else {
      if (id && !user?.uid && user) {
        setError("loggedOut");
        setConfirmingTour(false);
      }
    }
  }, [getTour, id, user]);
  if (confirmingTour || !user) return <Spinner />;
  if (loading)
    return (
      <ConfirmingTourStyles>
        <Head>
          <title>{t("confirmTour")}</title>
        </Head>
        <ConfirmingTour t={t} />
      </ConfirmingTourStyles>
    );
  if (error === "error") return <TourError t={t} />;
  if (!complete && !confirmingTour)
    return <NoTour tour={tour} user={user} t={t} error={error} />;
  if (complete) return <ConfirmComplete t={t} tour={tour} />;
  return <></>;
};
export default ConfirmTour;
