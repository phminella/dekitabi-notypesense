import Image from "next/image";
import React from "react";
import { ItineraryAlertStyles } from "./styles/ItineraryAlertStyles";
import { useEffect } from "react";
import isPwa from "../../lib/isPwa";
import BasicModal from "../UI/BasicModal";
import useItinerary from "../../lib/useItinerary";
import { User } from "../../types/user";
import { Itinerary, ItineraryTime, ItineraryError } from "../../types/itinerary";

interface ItineraryAlertProps {
  showErrorModal: boolean;
  setShowErrorModal: (show: boolean) => void;
  user: User;
  errors: ItineraryError[];
  setErrors: (errors: ItineraryError[]) => void;
  itinerary: Itinerary;
  itineraryTime: ItineraryTime;
  setUnpublished: (unpub: boolean) => void;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  closedAttractions: string[];
  t: (key: string, options?: any) => string;
}

const ItineraryAlert = ({
  showErrorModal,
  setShowErrorModal,
  user,
  errors,
  setErrors,
  itinerary,
  itineraryTime,
  setUnpublished,
  updateItineraryHandler,
  closedAttractions,
  t,
}: ItineraryAlertProps) => {
  const { unpublishItinerary } = useItinerary();

  const getItineraryErrors = () => {
    const tempErrors = [];
    const totalTime = itineraryTime?.duration + itineraryTime?.transitTime;

    if (totalTime < 120) {
      tempErrors.push({
        code: 1,
        title: t("minimumTime"),
        message: t("minimumTime2"),
      });
    }

    if (totalTime > 840) {
      tempErrors.push({
        code: 2,
        title: t("maximumTime"),
        message: t("maximumTime2"),
      });
    }

    if (closedAttractions?.length > 0) {
      const closedList = closedAttractions
        .map((attraction, i) => {
          const isSecondLast = closedAttractions.length - 2 === i;
          const isBeforeLast = closedAttractions.length - 2 > i;
          return ` ${attraction}${isSecondLast ? ` ${t("and")} ` : ""}${isBeforeLast ? ", " : ""}`;
        })
        .join("");

      tempErrors.push({
        code: 6,
        title: t("attractionsClosed"),
        message: `${closedList} ${t("attractionsClosed2")}`,
      });
    }

    if (
      itinerary?.createdBy === user?.uid &&
      !itinerary?.status &&
      itinerary?.name?.length < 21
    ) {
      tempErrors.push({
        code: 10,
        title: t("tourNameErrorTitle"),
        message: t("tourNameError"),
      });
    }

    return tempErrors;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!itineraryTime?.duration) return;

    const tempErrors = getItineraryErrors();
    setErrors(tempErrors);

    const shouldUnpublish =
      ((tempErrors.length > 0 &&
        !(tempErrors[0]?.code === 9 && tempErrors.length === 1)) ||
        itinerary?.attractions?.length === 0) &&
      itinerary?.published &&
      itinerary?.createdBy === user?.uid;

    if (shouldUnpublish) {
      unpublishItinerary(itinerary)
        .then(() => {
          updateItineraryHandler({ published: false });
          setUnpublished(true);
          setTimeout(() => setUnpublished(false), 2000);
        })
        .catch(console.log);
    }
  }, [ // eslint-disable-line react-hooks/exhaustive-deps
    itineraryTime?.duration,
    itineraryTime?.transitTime,
    itinerary?.date,
    itinerary?.name,
    itinerary?.createdBy,
    itinerary?.published,
    itinerary?.status,
    itinerary?.attractions?.length,
    user?.uid,
    closedAttractions,
  ]);

  return (
    <ItineraryAlertStyles
      className={user?.guide === "true" ? "guide-styles" : ""}
    >
      <button
        className={`error-icon ${errors?.length > 0 ? "show-alert" : ""} ${
          isPwa() ? "pwa-position" : ""
        }`}
        onClick={() => setShowErrorModal(true)}
      >
        <span className="error-number">{errors?.length}</span>
        <Image
          height={25}
          width={25}
          src="/img/icon-alert2.svg"
          alt="alert"
        />
      </button>

      <BasicModal setShowModal={setShowErrorModal} showModal={showErrorModal}>
        <h2>{t("toFix")}...</h2>
        <ul>
          {errors?.map((error, i) => (
            <li key={i}>
              <h3>
                <Image
                  height={25}
                  width={25}
                  src="/img/icon-alert2.svg"
                  alt="alert"
                />
                {error?.title}
              </h3>
              <p>{error?.message}</p>
            </li>
          ))}
        </ul>
      </BasicModal>
    </ItineraryAlertStyles>
  );
};

export default React.memo(ItineraryAlert);
