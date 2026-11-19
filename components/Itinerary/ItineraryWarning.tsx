import { ItineraryWarningStyles } from "./styles/ItineraryWarningStyles";
import Image from "next/image";
import React from "react";
import { User } from "../../types/user";
import { Itinerary, ItineraryError } from "../../types/itinerary";

interface ItineraryWarningProps {
  user: User;
  itinerary: Itinerary;
  t: (key: string) => string;
  errors: ItineraryError[];
  setShowErrorModal: (show: boolean) => void;
  hasItinerary?: (id: string) => boolean;
}

const ItineraryWarning = ({
  user,
  itinerary,
  t,
  errors,
  setShowErrorModal,
}: ItineraryWarningProps) => {
  return (
    <ItineraryWarningStyles
      className={user?.guide === "true" ? "guide-style" : ""}
    >
      {errors && errors?.length > 0 && (
        <>
          {user?.guide === "true" && user?.uid === itinerary?.createdBy && (
            <p className="itinerary-info">
              <Image
                height={20}
                width={20}
                src="/img/icon-alert2.svg"
                alt="alert"
              ></Image>
              <span>
                {t("errorAlertGuide")}{" "}
                <button
                  onClick={() => {
                    setShowErrorModal(true);
                  }}
                >
                  {t("seeErrors")}
                </button>
              </span>
            </p>
          )}
          <>
            {user?.guide !== "true" && (
              <p className="itinerary-info">
                <Image
                  height={20}
                  width={20}
                  src="/img/icon-alert2.svg"
                  alt="alert"
                ></Image>
                <span>
                  {t("errorAlertTraveler")}{" "}
                  <button
                    onClick={() => {
                      setShowErrorModal(true);
                    }}
                  >
                    {t("seeErrors")}
                  </button>
                </span>
              </p>
            )}
          </>
        </>
      )}
    </ItineraryWarningStyles>
  );
};
export default React.memo(ItineraryWarning);
