import React, { useState } from "react";
import { ItineraryNameStyles } from "./styles/ItineraryNameStyles";
import Image from "next/image";
import useItinerary from "../../../lib/useItinerary";
import Error from "../../UI/Error";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore/lite";
import { useRouter } from "next/router";
import { User } from "../../../types/user";

import { Itinerary } from "../../../types/itinerary";

interface ItineraryNameProps {
  itineraryName?: string;
  itineraryTranslatedName?: Record<string, string>;
  itineraryCreatedBy: string;
  itineraryId: string;
  itineraryStatus: boolean;
  itineraryGuide?: string;
  itineraryLocale?: string;
  itineraryPublished?: boolean;
  user: User;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  t: (key: string, options?: any) => string;
}

const ItineraryName = ({
  itineraryName = "",
  itineraryTranslatedName,
  itineraryCreatedBy,
  itineraryId,
  itineraryStatus,
  itineraryGuide,
  itineraryLocale = "en",
  itineraryPublished,
  user,
  updateItineraryHandler,
  t,
}: ItineraryNameProps) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showError, setShowError] = useState<string | false>(false);
  const { hasItinerary } = useItinerary();

  const nameHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name?.length < 21 && itineraryPublished) {
      setShowError("tourNameError");
    } else {
      if (itineraryName === name) {
        setName("");
        setShowInput(false);
        setShowError(false);
      } else {
        const usersRef = collection(getFirestore(), "itineraries");
        const q = query(
          usersRef,
          where("url", "==", name.toLowerCase().split(" ").join("-"))
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          updateItineraryHandler({
            name: name,
            ...(/^[ A-Za-z0-9]*$/.test(name) && {
              url: name.trim().toLowerCase().split(" ").join("-"),
            }),
            ...(!/^[ A-Za-z0-9]*$/.test(name) && {
              url: "",
            }),
          }).then(() => {
            router
              .push({
                query: {
                  id: /^[ A-Za-z0-9]*$/.test(name)
                    ? name.trim().toLowerCase().split(" ").join("-")
                    : itineraryId,
                },
              })
              .then(() => {
                setName("");
                setShowInput(false);
                setShowError(false);
              });
          });
        } else {
          setShowError("tourNameError2");
        }
      }
    }
  };

  const isCreator =
    itineraryCreatedBy === "Guest" ||
    user?.uid === itineraryCreatedBy ||
    hasItinerary(itineraryId);

  const displayName =
    itineraryTranslatedName &&
    !hasItinerary(itineraryId) &&
    itineraryGuide !== user?.uid &&
    itineraryCreatedBy !== user?.uid &&
    itineraryCreatedBy !== "Guest"
      ? itineraryTranslatedName[itineraryLocale]
      : itineraryName;

  return (
    <ItineraryNameStyles className="itinerary-name">
      <Error
        errorMsg={showError ? t(showError) : ""}
        showError={showError}
        setShowError={setShowError}
      />
      <div className="itinerary-name-container">
        {!showInput && user && (
          <h1
            className={
              isCreator && !itineraryStatus && !showInput
                ? "creator"
                : ""
            }
          >
            {displayName}{" "}
            {isCreator && !itineraryStatus && !showInput && (
              <button
                onClick={() => {
                  setName(itineraryName);
                  setShowInput(true);
                  setTimeout(() => {
                    const input = document?.getElementById("edit-name");
                    if (input) input.focus();
                  }, 500);
                }}
                className="edit-name-button"
              >
                <Image
                  height={30}
                  width={30}
                  src="/img/icon-edit2.svg"
                  alt="edit"
                  className="icon"
                />
              </button>
            )}
          </h1>
        )}
        {showInput && (
          <form onSubmit={nameHandler}>
            <div className="form-wrapper">
              <input
                id="edit-name"
                name="edit-name"
                className="edit-name"
                value={name}
                onChange={(e) => {
                  if (showError) {
                    setShowError(false);
                  }
                  setName(e.target.value);
                }}
                minLength={10}
                maxLength={45}
                type="text"
                required
              />
              <button className="normal-button" type="submit">
                <Image
                  height={20}
                  width={20}
                  src="/img/icon-edit2.svg"
                  alt="edit"
                  className="icon"
                />
              </button>
              <button
                className="normal-button"
                type="button"
                onClick={() => {
                  setName("");
                  setShowError(false);
                  setShowInput(false);
                }}
              >
                <Image
                  height={20}
                  width={20}
                  src="/img/icon-close.svg"
                  alt="close"
                  className="icon"
                />
              </button>
            </div>
            {21 - name?.length > 0 && (
              <p>{t("remainingCharToShare", { counter: 21 - name?.length })}</p>
            )}
          </form>
        )}{" "}
      </div>
    </ItineraryNameStyles>
  );
};
export default React.memo(ItineraryName);
