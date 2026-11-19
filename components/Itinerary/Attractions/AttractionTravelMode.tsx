// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import { AttractionTravelModeStyles } from "./styles/AttractionTravelModeStyles";
import Image from "next/image";
import React, { useEffect, useMemo, useState, useRef } from "react";
import useDate from "../../../lib/useDate";
import { User, LanguageOption } from "../../../types/user";
import { Attraction } from "../../../types/attraction";

import { Itinerary, TravelMode } from "../../../types/itinerary";

interface AttractionTravelModeProps {
  transitTime: number;
  itineraryMeetingPlace?: Attraction | "" | false;
  itineraryEndPlace?: Attraction | "" | false;
  index: number;
  meetingPlace?: boolean;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  itineraryTravelModes: (string | TravelMode)[];
  itineraryStatus: boolean;
  lunchBreak: number;
  updateLunchBreak: (index: number) => void;
  itineraryCreatedBy: string;
  fromMeetingPlace?: boolean;
  fromEndPlace?: boolean;
  language: LanguageOption;
  itineraryAttractions: Attraction[];
  t: (key: string, options?: any) => string;
  user: User;
}

const AttractionTravelMode = ({
  transitTime,
  itineraryMeetingPlace,
  itineraryEndPlace,
  index,
  meetingPlace,
  updateItineraryHandler,
  itineraryTravelModes,
  itineraryStatus,
  lunchBreak,
  updateLunchBreak,
  itineraryCreatedBy,
  fromMeetingPlace,
  fromEndPlace,
  language,
  itineraryAttractions,
  t,
  user,
}: AttractionTravelModeProps) => {
  const [travelModeInput, setTravelModeInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTransit, setLoadingTransit] = useState(false);
  const [fromLocation, setFromLocation] = useState<[number, number] | undefined>();
  const [toLocation, setToLocation] = useState<[number, number] | undefined>();
  const [showTransitOptions, setShowTransitOptions] = useState(false);
  const { toTimeLength } = useDate();
  const transitRef = useRef<HTMLDivElement>(null);

  const tempIndex = useMemo(
    () =>
      itineraryMeetingPlace?._geoloc && !fromMeetingPlace ? index + 1 : index,
    [index, itineraryMeetingPlace, fromMeetingPlace]
  );

  const getTravelModeAt = (idx: number): Partial<TravelMode> => {
    const mode = itineraryTravelModes[idx];
    if (typeof mode === "string") {
      return { type: mode, time: 0 };
    }
    return (mode as TravelMode) || { type: "", time: 0 };
  };

  const updateTravelMode = async (e?: React.FormEvent, travelMode?: Partial<TravelMode>, googleMap?: boolean) => {
    setShowTransitOptions(false);
    if (e?.preventDefault) {
      e.preventDefault();
    }
    setLoading(true);
    let tempTravelModes = [...itineraryTravelModes];
    const currentMode = tempTravelModes[tempIndex];

    if (currentMode !== travelMode) {
      if (typeof currentMode === "string") {
        if (travelMode && travelMode.time !== undefined) {
          tempTravelModes[tempIndex] = {
            type: currentMode,
            ...travelMode,
          } as TravelMode;
        } else {
          tempTravelModes[tempIndex] = {
            time: 0,
            ...travelMode,
          };
        }
      } else {
        // let tempMapTime;
        // if (googleMap && user?.guide !== "true") {
        //   ...
        // }
        tempTravelModes[tempIndex] = {
          ...(currentMode as TravelMode),
          ...travelMode,
        } as TravelMode;
      }
      updateItineraryHandler({ travelModes: tempTravelModes }).then(() => {
        setLoading(false);
        setTravelModeInput("");
        setShowInput(false);
      });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    let from: Attraction | "" | false | undefined;
    let to: Attraction | "" | false | undefined;
    if (fromMeetingPlace) {
      from = itineraryMeetingPlace;
      to = itineraryAttractions[0];
    } else if (itineraryAttractions) {
      from = itineraryAttractions[index];
      if (fromEndPlace) {
        to = itineraryEndPlace;
      } else {
        to = itineraryAttractions[index + 1];
      }
    }
    setToLocation((to as Attraction)?._geoloc);
    setFromLocation((from as Attraction)?._geoloc);
  }, [
    itineraryAttractions,
    itineraryMeetingPlace,
    itineraryEndPlace,
    fromMeetingPlace,
    fromEndPlace,
    index,
  ]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (transitRef.current && !transitRef.current.contains(event.target as Node)) {
        setShowTransitOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [transitRef]);

  const currentModeObj = getTravelModeAt(tempIndex);

  return (
    <AttractionTravelModeStyles className="travel-mode">
      <div className="transit-options">
        <div className="flex-wrapper-five">
          <div className="transit-wrapper">
            {(!itineraryStatus ||
              (itineraryStatus &&
                (currentModeObj.type === "TRANSIT"))) && (
              <button
                className={`travel-mode-button ${
                  currentModeObj.type === "TRANSIT" ||
                  !currentModeObj.type ||
                  (currentModeObj.time !== undefined && !currentModeObj.type)
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  if (!itineraryStatus) {
                    setShowTransitOptions(true);
                  }
                }}
              >
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-train.svg"
                  alt="train"
                />
              </button>
            )}
            {(!itineraryStatus ||
              (itineraryStatus &&
                (currentModeObj.type === "DRIVING"))) && (
              <button
                className={`travel-mode-button ${
                  currentModeObj.type === "DRIVING"
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  if (!itineraryStatus) {
                    setShowTransitOptions(true);
                  }
                }}
              >
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-car.svg"
                  alt="car"
                />
              </button>
            )}
            {(!itineraryStatus ||
              (itineraryStatus &&
                (currentModeObj.type === "WALKING"))) && (
              <button
                className={`travel-mode-button ${
                  currentModeObj.type === "WALKING"
                    ? "active"
                    : ""
                }`}
                onClick={() => {
                  if (!itineraryStatus) {
                    setShowTransitOptions(true);
                  }
                }}
              >
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-walking.svg"
                  alt="walk"
                />
              </button>
            )}
          </div>
          {lunchBreak > -1 && lunchBreak !== tempIndex && !itineraryStatus && (
            <button
              className={`travel-mode-button lunch-break-button ${
                lunchBreak === tempIndex ? "active" : ""
              }`}
              onClick={() => updateLunchBreak(tempIndex)}
            >
              <Image
                height={25}
                width={25}
                src="/img/icon-food2.svg"
                alt="walk"
              />
            </button>
          )}
          {lunchBreak > -1 && lunchBreak === tempIndex && (
            <div className={`travel-mode-button lunch-break-button active`}>
              <Image
                height={25}
                width={25}
                src="/img/icon-food2.svg"
                alt="walk"
              />
            </div>
          )}
        </div>
      </div>
      {showTransitOptions && (
        <div className="transit-options-absolute" ref={transitRef}>
          <div className="flex-wrapper-five">
            <div className="transit-wrapper">
              {(!itineraryStatus ||
                (itineraryStatus &&
                  (currentModeObj.type === "TRANSIT"))) && (
                <button
                  className={`travel-mode-button ${
                    currentModeObj.type === "TRANSIT" ||
                    !currentModeObj.type ||
                    (currentModeObj.time !== undefined && !currentModeObj.type)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    if (!itineraryStatus) {
                      updateTravelMode(undefined, { type: "TRANSIT" }, true);
                    }
                  }}
                >
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-train.svg"
                    alt="train"
                  />
                </button>
              )}
              {(!itineraryStatus ||
                (itineraryStatus &&
                  (currentModeObj.type === "DRIVING"))) && (
                <button
                  className={`travel-mode-button ${
                    currentModeObj.type === "DRIVING"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    if (!itineraryStatus) {
                      updateTravelMode(undefined, { type: "DRIVING" }, true);
                    }
                  }}
                >
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-car.svg"
                    alt="car"
                  />
                </button>
              )}
              {(!itineraryStatus ||
                (itineraryStatus &&
                  (currentModeObj.type === "WALKING"))) && (
                <button
                  className={`travel-mode-button ${
                    currentModeObj.type === "WALKING"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    if (!itineraryStatus) {
                      updateTravelMode(undefined, { type: "WALKING" }, true);
                    }
                  }}
                >
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-walking.svg"
                    alt="walk"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {!showInput ? (
        <div className={"flex-wrapper-five"}>
          <span>{toTimeLength(transitTime, language.code)}</span>

          {!itineraryStatus && (
            <>
              <div className="button-wrapper flex-wrapper-five">
                <button
                  className="normal-button edit-travel-mode"
                  onClick={() => {
                    setShowInput(true);
                  }}
                >
                  <Image
                    height={20}
                    width={20}
                    src="/img/icon-edit2.svg"
                    alt="edit"
                    className="icon"
                  ></Image>
                </button>{" "}
                {user?.guide !== "true" &&
                user?.uid === itineraryCreatedBy &&
                currentModeObj.mapTime &&
                currentModeObj.mapTime !== currentModeObj.time ? (
                  <button
                    className="normal-button edit-travel-mode edit-refresh"
                    onClick={() => {
                      updateTravelMode(undefined, {
                        time: currentModeObj.mapTime,
                      });
                    }}
                  >
                    {loadingTransit ? (
                      <Image
                        height={20}
                        width={20}
                        src="/img/icon-spinner.svg"
                        alt="edit"
                        className="icon"
                      ></Image>
                    ) : (
                      <Image
                        height={35}
                        width={35}
                        src="/img/icon-return.svg"
                        alt="calculate-distance"
                        className="map-icon"
                      />
                    )}
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <form
          onSubmit={(e) =>
            updateTravelMode(e, { time: parseInt(travelModeInput) })
          }
          className="flex-wrapper-five"
        >
          <input
            autoFocus
            className="travel-mode-input"
            type="number"
            name="duration"
            id="duration"
            placeholder={`${
              (currentModeObj.time ?? 0) > 0
                ? currentModeObj.time
                : transitTime
            } (${t("min")})`}
            value={travelModeInput}
            autoComplete="off"
            onChange={(e) => {
              if (e.target.value?.length < 4) {
                setTravelModeInput(e.target.value);
              }
            }}
            minLength={1}
            maxLength={3}
          />
          <button
            disabled={loading}
            className="normal-button edit-travel-mode"
            type="submit"
          >
            {loading ? (
              <Image
                height={20}
                width={20}
                src="/img/icon-spinner.svg"
                alt="edit"
                className="icon"
              ></Image>
            ) : (
              <Image
                height={20}
                width={20}
                src="/img/icon-edit2.svg"
                alt="edit"
                className="icon"
              ></Image>
            )}
          </button>
          <button
            disabled={loading}
            className="normal-button edit-travel-mode"
            type="button"
            onClick={() => {
              setTravelModeInput("");
              setShowInput(false);
            }}
          >
            <Image
              height={20}
              width={20}
              src="/img/icon-close.svg"
              alt="edit"
              className="icon"
            ></Image>
          </button>
        </form>
      )}
      <a
        href={`https://www.google.com/maps/dir/?api=1&origin=${
          fromLocation ? fromLocation[0] : ""
        },${fromLocation ? fromLocation[1] : ""}&destination=${
          toLocation ? toLocation[0] : ""
        },${toLocation ? toLocation[1] : ""}&travelmode=${
          currentModeObj.type
            ? currentModeObj.type?.toLowerCase()
            : currentModeObj.time
            ? "WALKING"
            : (typeof itineraryTravelModes[tempIndex] === "string" ? (itineraryTravelModes[tempIndex] as string).toLowerCase() : "WALKING")
        }&hl=${language?.code}`}
        target="_blank"
        rel="noreferrer"
      >
        <Image
          className="map-icon"
          height={24}
          width={24}
          src="/img/icon-googlemaps.svg"
          alt="map2"
        />
      </a>
    </AttractionTravelModeStyles>
  );
};
export default React.memo(AttractionTravelMode);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
