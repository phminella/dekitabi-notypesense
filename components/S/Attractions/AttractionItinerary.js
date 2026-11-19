import { AttractionItineraryStyles } from "./styles/AttractionItineraryStyles";
import Image from "next/legacy/image";
import AttractionItineraryItem from "./AttractionItineraryItem";
import useItinerary from "../../../lib/useItinerary";
import React, { useState } from "react";
import { useSelector } from "react-redux";
const AttractionItinerary = ({ attraction, setShowItinerary, t }) => {
  let {
    itineraries,
    newItinerary,
    setAttractionToItinerary,
    removeAttraction,
  } = useItinerary();
  const [added, setAdded] = useState();
  const [removed, setRemoved] = useState();
  const [newItineraryLoading, setNewItineraryLoading] = useState(false);
  const language = useSelector((state) => state.app.language);
  return (
    <>
      <AttractionItineraryStyles>
        <div className="attraction-itinerary">
          <div className={`attraction-added ${added ? "added" : ""}`}>
            <div className="attraction-added-content">
              <Image
                height={85}
                width={85}
                src="/img/icon-check.svg"
                alt="check-icon"
              />
              <h2>{t("addedToItinerary")}</h2>
            </div>
          </div>
          <div className={`attraction-added ${removed ? "added" : ""}`}>
            <div className="attraction-added-content">
              <Image
                height={55}
                width={55}
                src="/img/icon-delete.svg"
                alt="delete-icon"
              />
              <h2>{t("removedFromItinerary")}</h2>
            </div>
          </div>
          <p className="attraction-itinerary-title">
            <Image
              height={18}
              width={18}
              src="/img/icon-plus.svg"
              alt="plus"
            ></Image>
            {t("addToYourItinerary")}
          </p>{" "}
          <div className="add-to-itinerary-wrapper">
            <p className="add-to-itinerary-msg">
              {t("chooseItinerary")} (
              <b>
                {attraction?.translatedName
                  ? attraction?.translatedName[language?.code]
                  : attraction?.name}
              </b>
              )
            </p>
            {newItineraryLoading ? (
              <div className="new-itinerary-loading">
                <Image
                  height={90}
                  width={90}
                  src="/img/icon-spinner.svg"
                  alt="plus"
                ></Image>
              </div>
            ) : (
              <ul>
                {itineraries?.map((itinerary, i) => {
                  if (!itinerary?.status) {
                    return (
                      <AttractionItineraryItem
                        key={i}
                        attraction={attraction}
                        itinerary={itinerary}
                        setShowItinerary={setShowItinerary}
                        setAdded={setAdded}
                        setRemoved={setRemoved}
                        setAttractionToItinerary={setAttractionToItinerary}
                        removeAttraction={removeAttraction}
                      />
                    );
                  }
                })}
              </ul>
            )}
            <button
              className="new-itinerary"
              onClick={() => {
                setNewItineraryLoading(true);
                newItinerary().then(() => {
                  setNewItineraryLoading(false);
                });
              }}
            >
              <Image
                height={25}
                width={25}
                src="/img/icon-map-pin.svg"
                alt="plus"
              ></Image>
              {t("newItinerary")}
            </button>
          </div>
        </div>
      </AttractionItineraryStyles>
    </>
  );
};
export default React.memo(AttractionItinerary);
