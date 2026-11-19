import Image from "next/image";
import React, { useMemo, useState } from "react";
import { EditAttractionDurationStyles } from "./styles/EditAttractionDurationStyles";
import { User, LanguageOption } from "../../../types/user";

import { Itinerary } from "../../../types/itinerary";

interface EditAttractionDurationProps {
  user: User;
  updateItineraryHandler?: (data: Partial<Itinerary>) => Promise<boolean>;
  t: (key: string) => string;
  index: number;
  itineraryStatus: boolean;
  itineraryCreatedBy?: string;
  itineraryDurations?: number[];
  attractionDuration: number;
  language: LanguageOption;
  itineraryMeetingPlace?: any;
}

const EditAttractionDuration = ({
  user,
  updateItineraryHandler,
  t,
  index,
  itineraryStatus,
  itineraryCreatedBy,
  itineraryDurations = [],
  attractionDuration,
}: EditAttractionDurationProps) => {
  const [durationInput, setDurationInput] = useState<string | number>("");
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const tempIndex = useMemo(() => index, [index]);

  const updateDuration = (e?: React.FormEvent, duration?: number) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }
    const val = duration !== undefined ? duration : Number(durationInput);
    if (isNaN(val)) return;

    let tempDurations = [...itineraryDurations];
    setLoading(true);
    if (tempDurations[tempIndex] !== val) {
      tempDurations[tempIndex] = val;
      updateItineraryHandler?.({ durations: tempDurations }).then(() => {
        setLoading(false);
        setDurationInput("");
        setShowInput(false);
      });
    } else {
      setLoading(false);
      setDurationInput("");
      setShowInput(false);
    }
  };

  return (
    <EditAttractionDurationStyles>
      {!showInput ? (
        <div className={"flex-wrapper-five"}>
          {!itineraryStatus && (
            <>
              <div className="button-wrapper flex-wrapper-five">
                {itineraryDurations[tempIndex] > 0 &&
                  itineraryDurations[tempIndex] !== attractionDuration && (
                    <button
                      className="normal-button edit-duration-refresh"
                      onClick={() => {
                        updateDuration(undefined, 0);
                      }}
                    >
                      <Image
                        height={15}
                        width={15}
                        src="/img/icon-return.svg"
                        alt="edit"
                        className="icon"
                      ></Image>
                    </button>
                  )}
                <button
                  className="normal-button edit-duration"
                  onClick={() => {
                    setShowInput(true);
                  }}
                >
                  <Image
                    height={10}
                    width={10}
                    src="/img/icon-edit2.svg"
                    alt="edit"
                    className="icon"
                  ></Image>
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <form
          onSubmit={(e) => updateDuration(e)}
          className="flex-wrapper-five"
        >
          <input
            autoFocus
            className="travel-mode-input"
            type="number"
            name="duration"
            id="duration"
            placeholder={`${
              itineraryDurations[index] > 0
                ? itineraryDurations[index]
                : attractionDuration
            }(${t("min")})`}
            value={durationInput}
            autoComplete="off"
            onChange={(e) => {
              if (e.target.value?.length < 4) {
                setDurationInput(e.target.value);
              }
            }}
            minLength={1}
            maxLength={3}
          />
          <button
            disabled={loading}
            className="normal-button form-button"
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
            className="normal-button form-button"
            type="button"
            onClick={() => {
              setDurationInput("");
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
    </EditAttractionDurationStyles>
  );
};
export default EditAttractionDuration;
