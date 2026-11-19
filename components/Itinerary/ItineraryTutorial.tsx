import { useEffect, useState } from "react";
import { ItineraryTutorialStyles } from "./styles/ItineraryTutorialStyles";
import Image from "next/image";
import useLocalStorage from "../../lib/useLocalStorage";
import React from "react";
import { User } from "../../types/user";

interface ItineraryTutorialProps {
  t: (key: string) => string;
  attractionsLength: number;
  travelModeLength: number;
  setShowTutorial: (show: boolean) => void;
  loading: boolean;
  loadingAttraction: boolean;
  user: User;
  lunchBreak: number;
}

const ItineraryTutorial = ({
  t,
  attractionsLength,
  travelModeLength,
  setShowTutorial,
  loading,
  loadingAttraction,
  user,
  lunchBreak,
}: ItineraryTutorialProps) => {
  const { setItem, getItem } = useLocalStorage();
  const [step, setStep] = useState(1);
  const onlyWithAttraction =
    !getItem("tutorialWithAttraction") && getItem("tutorialWithoutAttraction");
  const clearAllElements = () => {
    let elementsList = [];

    if (attractionsLength === 0) {
      elementsList = ["itinerary-name", "add-attraction"];
    } else if (travelModeLength === 0) {
      elementsList = [
        "itinerary-name",
        "itinerary-details",
        "duration",
        "transit-time",
        "lunch-break",
        "add-attraction",
        "meeting-place-component",
        "itinerary-attraction",
      ];
    } else {
      elementsList = [
        "itinerary-name",
        "itinerary-details",
        "duration",
        "transit-time",
        "lunch-break",
        "add-attraction",
        "meeting-place-component",
        "itinerary-attraction",
        "travel-mode",
      ];
    }

    elementsList.forEach((element) => {
      let itineraryElement = document.getElementsByClassName(element)[0] as HTMLElement | undefined;
      if (itineraryElement) {
        itineraryElement.style.zIndex = "unset";

        if (element === "itinerary-details") {
          const detailsContent = document.getElementsByClassName(
            "itinerary-details-content"
          )[0] as HTMLElement | undefined;
          if (detailsContent) {
            itineraryElement = detailsContent;
          }
        }

        if (element === "itinerary-attraction") {
          const dragDropWrapper =
            document.getElementsByClassName("drag-drop-wrapper")[0] as HTMLElement | undefined;
          const dragDrop = document.getElementsByClassName("drag-drop")[0] as HTMLElement | undefined;
          const attractionElement = document.getElementsByClassName(
            "itinerary-attraction"
          )[0] as HTMLElement | undefined;
          if (dragDropWrapper) dragDropWrapper.style.overflow = "hidden";
          if (dragDrop) dragDrop.style.overflow = "hidden";
          if (attractionElement) attractionElement.style.overflow = "hidden";
        }

        const tutorials = document.getElementsByClassName("itinerary-tutorial");
        while (tutorials.length > 0) {
          const tutorial = tutorials[0];
          if (tutorial && tutorial.parentNode) {
            tutorial.parentNode.removeChild(tutorial);
          }
        }
      }
    });
  };
  const getTutorialStep = (className: string, message: string, title: string) => {
    clearAllElements();
    console.log(className, message, step);

    const fragment = document.createDocumentFragment();
    const divElement = document.createElement("div");
    divElement.className = "itinerary-tutorial";

    const h3Element = document.createElement("h3");
    h3Element.textContent = title;
    divElement.appendChild(h3Element);

    if (className === "itinerary-attraction") {
      const ulElement = document.createElement("ul");
      divElement.appendChild(ulElement);

      const createListItem = (imgSrc: string, textKey: string) => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "marker";
        img.height = 20;
        img.width = 20;
        li.appendChild(img);

        const p = document.createElement("p");
        p.textContent = t(textKey);
        li.appendChild(p);
        return li;
      };

      ulElement.appendChild(
        createListItem("/img/icon-marker2.svg", "AttractionTutorialMsg1")
      );
      ulElement.appendChild(
        createListItem("/img/icon-calendar.svg", "AttractionTutorialMsg2")
      );
      ulElement.appendChild(
        createListItem("/img/icon-clock.svg", "AttractionTutorialMsg3")
      );
    } else {
      const pElement = document.createElement("p");
      const img = document.createElement("img");
      let icon = "";

      switch (className) {
        case "itinerary-name":
          icon = "edit2";
          break;
        case "itinerary-details":
          icon = user?.guide === "true" ? "publish" : "edit2";
          break;
        case "duration":
          icon = "hourglass";
          break;
        case "transit-time":
          icon = "train";
          break;
        case "lunch-break":
          icon = "food2";
          break;
        case "add-attraction":
          icon = "map-pin2";
          break;
        case "meeting-place-component":
          icon = "marker";
          break;
        case "travel-mode":
          icon = "train";
          break;
      }

      img.src = `/img/icon-${icon}.svg`;
      img.alt = "marker";
      img.height = 20;
      img.width = 20;

      pElement.appendChild(img);
      pElement.appendChild(document.createTextNode(message));
      divElement.appendChild(pElement);
    }

    fragment.appendChild(divElement);

    const targetElement =
      className === "itinerary-details"
        ? (document.getElementsByClassName("itinerary-details-content")[0] as HTMLElement | undefined)
        : (document.getElementsByClassName(className)[0] as HTMLElement | undefined);

    if (targetElement) {
      targetElement.appendChild(fragment);
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      targetElement.style.zIndex = "10";
    }

    if (className === "itinerary-attraction" || className === "travel-mode") {
      const dragDropWrapper =
        document.getElementsByClassName("drag-drop-wrapper")[0] as HTMLElement | undefined;
      const dragDrop = document.getElementsByClassName("drag-drop")[0] as HTMLElement | undefined;
      const attraction = document.getElementsByClassName(
        "itinerary-attraction"
      )[0] as HTMLElement | undefined;

      if (dragDropWrapper) dragDropWrapper.style.overflow = "visible";
      if (dragDrop) dragDrop.style.overflow = "visible";
      if (attraction) attraction.style.overflow = "visible";
    }
  };
  useEffect(() => {
    if (!loading) {
      setStep(1);
    }
  }, [loading]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (onlyWithAttraction && attractionsLength === 0) {
      setShowTutorial(false);
    } else {
      if (onlyWithAttraction) {
        if (step === 1) {
          setTimeout(() => {
            getTutorialStep(
              "duration",
              t("durationTutorialMsg"),
              t("duration")
            );
          }, 500);
        }
        if (step === 2) {
          getTutorialStep(
            "transit-time",
            t("transitTutorialMsg"),
            t("transit")
          );
        }
        if (step === 3 && lunchBreak > -1) {
          getTutorialStep("lunch-break", t("lunchBreak1"), t("lunchBreak"));
        }
        if (
          (step === 3 && lunchBreak === -1) ||
          (step === 4 && lunchBreak > -1)
        ) {
          getTutorialStep(
            "meeting-place-component",
            user?.guide === "true"
              ? t("meetingPlaceTutorialMsgGuide")
              : t("meetingPlaceTutorialMsg"),
            t("meetingPlace")
          );
        }
        if (
          (step === 4 && lunchBreak === -1) ||
          (step === 5 && lunchBreak > -1)
        ) {
          getTutorialStep("itinerary-attraction", "", t("attraction"));
        }
      } else {
        if (step === 1) {
          getTutorialStep(
            "itinerary-name",
            t("itineraryNameTutorialMsg"),
            t("itineraryName")
          );
        }
        if (step === 2) {
          getTutorialStep(
            "add-attraction",
            t("addAttractionTutorialMsg"),
            t("addAttractions")
          );
        }
        if (step === 3) {
          getTutorialStep(
            "itinerary-details",
            user?.guide === "true"
              ? t("itineraryDetailsTutorialMsgGuide")
              : t("itineraryDetailsTutorialMsg"),
            t("itineraryDetailsTutorialTitle")
          );
        }
        if (step === 4) {
          getTutorialStep("duration", t("durationTutorialMsg"), t("duration"));
        }
        if (step === 5) {
          getTutorialStep(
            "transit-time",
            t("transitTutorialMsg"),
            t("transit")
          );
        }
        if (step === 6 && lunchBreak > -1) {
          getTutorialStep("lunch-break", t("lunchBreak1"), t("lunchBreak"));
        }
        if (
          (step === 6 && lunchBreak === -1) ||
          (step === 7 && lunchBreak > -1)
        ) {
          getTutorialStep(
            "meeting-place-component",
            user?.guide === "true"
              ? t("meetingPlaceTutorialMsgGuide")
              : t("meetingPlaceTutorialMsg"),
            t("meetingPlace")
          );
        }
        if (
          (step === 7 && lunchBreak === -1) ||
          (step === 8 && lunchBreak > -1)
        ) {
          getTutorialStep("itinerary-attraction", "", t("attraction"));
        }
        if (
          (step === 8 && lunchBreak === -1) ||
          (step === 9 && lunchBreak > -1)
        ) {
          getTutorialStep(
            "travel-mode",
            t("travelModeMsg"),
            t("travelModeAndLunch")
          );
        }
      }
    }
  }, [step, attractionsLength]); // eslint-disable-line react-hooks/exhaustive-deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (step === 2 && attractionsLength > 0) {
      setTimeout(() => {
        setStep(3);
      }, 500);
    }
  }, [attractionsLength]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <ItineraryTutorialStyles>
      <div className="buttons">
        <div className="buttons-wrapper">
          {step > 1 && (
            <button
              className="back"
              onClick={() => {
                setStep(step - 1);
              }}
            >
              <Image
                height={15}
                width={15}
                src="/img/icon-arrow-left.svg"
                alt="back"
              ></Image>
            </button>
          )}
          <div className="steps">
            {step} /{" "}
            {attractionsLength === 0 ? (
              <>2</>
            ) : onlyWithAttraction ? (
              <>
                {lunchBreak > -1
                  ? travelModeLength < 1
                    ? "5"
                    : "6"
                  : travelModeLength < 1
                  ? "4"
                  : "5"}
              </>
            ) : (
              <>
                {lunchBreak > -1
                  ? travelModeLength < 1
                    ? "8"
                    : "9"
                  : travelModeLength < 1
                  ? "7"
                  : "8"}
              </>
            )}
          </div>
          {((attractionsLength === 0 && step < 2) ||
            (travelModeLength > 0 &&
              step < 9 &&
              !onlyWithAttraction &&
              lunchBreak > -1) ||
            (travelModeLength > 0 &&
              step < 8 &&
              !onlyWithAttraction &&
              lunchBreak < 0) ||
            (attractionsLength > 0 &&
              step < 8 &&
              !onlyWithAttraction &&
              lunchBreak > -1) ||
            (attractionsLength > 0 &&
              step < 7 &&
              !onlyWithAttraction &&
              lunchBreak === -1) ||
            (attractionsLength > 0 &&
              onlyWithAttraction &&
              step < 4 &&
              lunchBreak === -1) ||
            (attractionsLength > 0 &&
              onlyWithAttraction &&
              step < 5 &&
              lunchBreak > -1)) && (
            <button
              className="next"
              onClick={() => {
                if (step === 0) {
                  setStep(step + 2);
                } else {
                  setStep(step + 1);
                }
              }}
            >
              <Image
                height={15}
                width={15}
                src="/img/icon-arrow-right.svg"
                alt="next"
              ></Image>
            </button>
          )}
          {((attractionsLength === 0 && step === 2) ||
            (attractionsLength > 0 &&
              travelModeLength < 1 &&
              step === 7 &&
              lunchBreak === -1) ||
            (attractionsLength > 0 &&
              travelModeLength < 1 &&
              step === 8 &&
              lunchBreak > -1) ||
            (travelModeLength > 0 &&
              !onlyWithAttraction &&
              step === 9 &&
              lunchBreak > -1) ||
            (travelModeLength > 0 &&
              !onlyWithAttraction &&
              step === 8 &&
              lunchBreak === -1) ||
            (attractionsLength > 0 &&
              onlyWithAttraction &&
              travelModeLength < 1 &&
              step === 4 &&
              lunchBreak === -1) ||
            (attractionsLength > 0 &&
              onlyWithAttraction &&
              travelModeLength < 1 &&
              step === 5 &&
              lunchBreak > -1)) && (
            <button
              className="next"
              onClick={() => {
                clearAllElements();
                if (attractionsLength > 0) {
                  setItem("tutorialWithAttraction", true);
                  setItem("tutorialWithoutAttraction", true);
                } else {
                  setItem("tutorialWithoutAttraction", true);
                }
                setShowTutorial(false);
              }}
            >
              <Image
                height={15}
                width={15}
                src="/img/icon-close.svg"
                alt="close"
              ></Image>
            </button>
          )}
        </div>
        <button
          className="skip"
          onClick={() => {
            clearAllElements();
            if (attractionsLength > 0) {
              setItem("tutorialWithAttraction", true);
              setItem("tutorialWithoutAttraction", true);
            } else {
              setItem("tutorialWithoutAttraction", true);
            }
            setShowTutorial(false);
          }}
        >
          {t("skipTutorial")}
        </button>
      </div>
    </ItineraryTutorialStyles>
  );
};
export default React.memo(ItineraryTutorial);
