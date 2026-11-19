import { ItineraryBookStyles } from "./styles/ItineraryBookStyles";
import Image from "next/image";
import useCart from "../../lib/useCart";
import DOMPurify from "isomorphic-dompurify";
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import {
  getDocs,
  getFirestore,
  collection,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore/lite";
import isPwa from "../../lib/isPwa";
import { STATES_MAPPING } from "../../lib/states";
import { User } from "../../types/user";
import { Itinerary } from "../../types/itinerary";
import { Attraction } from "../../types/attraction";

interface ItineraryBookProps {
  t: (key: string, options?: any) => string;
  itinerary: Itinerary;
  itineraryTime: any;
  itineraryAttractions: Attraction[];
  includeTransport: boolean;
  currency: any;
  setShowGuideList: (show: boolean) => void;
  checkedGuides: () => void;
}

const ItineraryBook = ({
  t,
  itinerary,
  itineraryTime,
  itineraryAttractions,
  includeTransport,
  currency,
  setShowGuideList,
  checkedGuides,
}: ItineraryBookProps) => {
  const router = useRouter();
  const { isAddedToCart, addToCart, removeFromCart } = useCart();
  const [guidesFrom, setGuidesFrom] = useState<number>(99999999);
  const [loading, setLoading] = useState(true);
  const getSuggestedGuides = useCallback(async () => {
    let tempStates: string[] = [];
    await Promise.all(
      itineraryAttractions?.map(async (attraction) => {
        if (attraction?.state) {
          const attractionState = attraction?.state;
          let stateToAdd = Object.keys(STATES_MAPPING).filter((key) =>
            key.includes(attractionState?.split(" ")[0]?.toLowerCase())
          );
          if (stateToAdd.length > 0 && !tempStates?.includes(STATES_MAPPING[stateToAdd[0]])) {
            tempStates.push(STATES_MAPPING[stateToAdd[0]]);
          }
        }
      })
    );
    // tempStates = "[" + tempStates?.slice(0, tempStates?.length - 2) + "]";
    try {
      const usersRef = collection(getFirestore(), "users");
      const q = query(
        usersRef,
        where("states", "array-contains-any", tempStates),
        where("verified", "==", "true"),
        limit(15),
        orderBy("avatar", "desc"),
        orderBy("fee.halfDay", "desc")
      );
      const querySnapshot = await getDocs(q);
      let tempGuidesFrom = 99999999;
      querySnapshot.forEach((doc) => {
        if (
          doc.data().avatar !== "/img/avatar.png" ||
          doc.data().photos?.length > 0
        ) {
          let currentGuideFee = 99999999;
          currentGuideFee = doc.data()?.fee?.halfDay
            ? doc.data()?.fee?.halfDay
            : doc.data()?.fee?.fullDay;
          tempGuidesFrom =
            tempGuidesFrom > currentGuideFee ? currentGuideFee : tempGuidesFrom;
        }
      });
      setGuidesFrom(tempGuidesFrom);
    } catch (err) {
      console.error("Failed to fetch suggested guides", err);
    } finally {
      setLoading(false);
    }
  }, [itineraryAttractions]);
  const firstAttractionState = itineraryAttractions?.[0]?.state;
  useEffect(() => {
    if (
      itineraryAttractions?.length > 0 &&
      firstAttractionState &&
      !isAddedToCart(itinerary?.id)
    ) {
      getSuggestedGuides();
    }
  }, [
    firstAttractionState,
    itineraryAttractions,
    itinerary?.id,
    isAddedToCart,
    getSuggestedGuides,
  ]);
  if (loading || isAddedToCart(itinerary?.id)) return <></>;
  return (
    <ItineraryBookStyles className={isPwa() ? "pwa" : ""}>
      {itinerary?.guideData && (itinerary.guideData as any)?.firstname ? (
        <div className="buttons">
          <button
            disabled={
              (!itinerary?.guideData || !itinerary?.primaryLanguage) &&
              !isAddedToCart(itinerary?.id)
            }
            className="normal-button footer-button"
            onClick={() => {
              if (!isAddedToCart(itinerary.id)) {
                addToCart(
                  {
                    ...itinerary,
                    attractions: itineraryAttractions,
                    duration:
                      itineraryTime.duration + itineraryTime.transitTime,
                  },
                  currency,
                  "tour",
                  includeTransport,
                  true
                )
                  .then(() => {
                    router.push("/checkout");
                  })
                  .catch((err) => console.log(err));
              } else {
                console.log("IS ADDED");
                router.push("/checkout");
              }
            }}
          >
            <Image height={17} width={17} src="/img/icon-book.svg" alt="save" />
            {t("bookNow")}
          </button>
          {!isAddedToCart(itinerary?.id) ? (
            <button
              disabled={!itinerary?.guideData || !itinerary?.primaryLanguage}
              className="normal-button"
              onClick={() => {
                const {
                  itineraryAttractions: _,
                  // @ts-ignore
                  itineraryPhotos: __,
                  durations: ___,
                  endPlace: ____,
                  description: _____,
                  notes: ______,
                  // @ts-ignore
                  translatedNotes: _______,
                  // @ts-ignore
                  translatedDescription: ________,
                  // @ts-ignore
                  lastVisit: _________,
                  lunch: __________,
                  travelModes: ___________,
                  ...tempItinerary
                } = itinerary;

                addToCart(
                  {
                    ...tempItinerary,
                    attractions: itineraryAttractions,
                    duration:
                      itinerary?.lunch < 0
                        ? itineraryTime?.duration + itineraryTime?.transitTime
                        : (itineraryTime?.duration || 0) +
                          (itineraryTime?.transitTime || 0) +
                          60,
                  },
                  currency,
                  "tour",
                  includeTransport
                );
              }}
            >
              <Image
                height={25}
                width={25}
                src="/img/icon-cart.svg"
                alt="save"
              />
              {t("addToCart")}
            </button>
          ) : (
            <button
              className="normal-button footer-button"
              onClick={() => {
                removeFromCart(itinerary?.id);
              }}
            >
              <Image
                height={25}
                width={25}
                src="/img/icon-cart.svg"
                alt="save"
              />
              {t("removeFromCart")}
            </button>
          )}
        </div>
      ) : (
        <div className="check-guides">
          <p
            className="guides-from"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                t("fromPerGroup", {
                  price: guidesFrom
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                }),
                {
                  USE_PROFILES: { html: true },
                }
              ),
            }}
          ></p>
          <button
            className="normal-button choose-guide"
            onClick={() => {
              checkedGuides();
              setShowGuideList(true);
            }}
          >
            <Image
              height={17}
              width={17}
              src="/img/icon-check.svg"
              alt="choose-a-guide"
            />
            {t("chooseGuide")}
          </button>
        </div>
      )}
    </ItineraryBookStyles>
  );
};
export default ItineraryBook;
