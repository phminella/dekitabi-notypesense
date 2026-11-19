import { ItineraryCartBookStyles } from "./styles/ItineraryCartBookStyles";
import Image from "next/image";
import useCart from "../../../lib/useCart";
import { useSelector, shallowEqual } from "react-redux";
import React from "react";
import { useRouter } from "next/router";
import { User } from "../../../types/user";
import { Attraction } from "../../../types/attraction";
import { Itinerary, ItineraryTime } from "../../../types/itinerary";
import { RootState } from "../../../store/store";
import { ItineraryGuide } from "../../../types/itineraryGuide";

interface ItineraryCartBookProps {
  t: (key: string, options?: any) => string;
  user: User;
  itinerary: Itinerary;
  itineraryTime: ItineraryTime;
  itineraryAttractions: Attraction[];
  includeTransport: boolean;
  setShowGuideList: (show: boolean) => void;
  checkedGuides: () => void;
}

const ItineraryCartBook = ({
  t,
  user,
  itinerary,
  itineraryTime,
  itineraryAttractions,
  includeTransport,
  setShowGuideList,
  checkedGuides,
}: ItineraryCartBookProps) => {
  const router = useRouter();
  const { isAddedToCart, addToCart, removeFromCart } = useCart();
  const currency = useSelector((state: RootState) => state.app.currency, shallowEqual);
  
  return (
    <ItineraryCartBookStyles>
      {(user?.guide === "false" || !user?.uid) && (
        <div className="cart-buttons">
          {(itinerary?.guideData as ItineraryGuide | undefined)?.firstname ? (
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
                    .catch((err: any) => console.log(err));
                } else {
                  router.push("/checkout");
                }
              }}
            >
              <Image
                height={17}
                width={17}
                src="/img/icon-book.svg"
                alt="save"
              />
              {t("bookNow")}
            </button>
          ) : (
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
          )}
          {!isAddedToCart(itinerary?.id) ? (
            <button
              disabled={!itinerary?.guideData || !itinerary?.primaryLanguage}
              className="normal-button footer-button"
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
                      (itinerary?.lunch ?? -1) < 0
                        ? itineraryTime?.duration + itineraryTime?.transitTime
                        : itineraryTime?.duration +
                          itineraryTime?.transitTime +
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
      )}
    </ItineraryCartBookStyles>
  );
};
export default React.memo(ItineraryCartBook);
