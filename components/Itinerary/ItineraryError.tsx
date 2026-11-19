import { ItineraryErrorStyles } from "./styles/ItineraryErrorStyles";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect } from "react";
import React from "react";

interface ItineraryErrorProps {
  t: (key: string, options?: any) => string;
  userId: string;
  userEmail: string;
  itineraryId: string;
  itineraryAttractions: any[];
}

const ItineraryError = ({
  t,
  userId,
  userEmail,
  itineraryId,
  itineraryAttractions,
}: ItineraryErrorProps) => {
  let functions;
  let sendEmail: any;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    sendEmail = httpsCallable(functions, "sendEmail");
  } catch (err) {
    console.log(err);
  }
  useEffect(() => {
    if (itineraryAttractions?.length > 0 && sendEmail) {
      sendEmail({
        to: "contact@dekitabi.com",
        sender: "contact@dekitabi.com",
        subject: `dekitabi | Itinerary Error`,
        body: `userId: ${userId}, itineraryId: ${itineraryId}, itinerary attractions: ${itineraryAttractions?.map(
          (attraction) => attraction
        )}`,
      });
    }
  }, [userId, itineraryAttractions, itineraryId, sendEmail]);
  return (
    <ItineraryErrorStyles>
      <div className="error-wrapper">
        <h2 className="error-title">{t("error")}</h2>
        <h3>{t("errorMsg1")}</h3>
        <div className="error-message">
          <p>{t("errorMsg2")}</p>
          {!userEmail && <p>{t("errorMsgGuest")}</p>}
          {userEmail && <p>{t("errorMsgUser", { userEmail })}</p>}
        </div>
        <h3>{t("errorMsg3")}</h3>
        <h4>{t("sorryInconvenience")}</h4>
      </div>
    </ItineraryErrorStyles>
  );
};
export default React.memo(ItineraryError);
