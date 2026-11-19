import React, { useState } from "react";
import Image from "next/image";
import useItinerary from "../../../lib/useItinerary";
import { setShowLogin } from "../../../store/appSlice";
import { useDispatch } from "react-redux";
import { User } from "../../../types/user";
import { Attraction } from "../../../types/attraction";
import { Itinerary, ItineraryTime, ItineraryError } from "../../../types/itinerary";

interface ItinerarySavePublishProps {
  itinerary: Itinerary;
  itineraryTime: ItineraryTime;
  user: User;
  errors: ItineraryError[];
  t: (key: string) => string;
  setPublished: (pub: boolean) => void;
  setUnpublished: (unpub: boolean) => void;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  itineraryAttractions: Attraction[];
}

const ItinerarySavePublish = ({
  itinerary,
  itineraryTime,
  user,
  errors,
  setPublished,
  setUnpublished,
  updateItineraryHandler,
  itineraryAttractions,
}: ItinerarySavePublishProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { unpublishItinerary, publishItinerary, hasItinerary } = useItinerary();

  const isOwner = user?.uid === itinerary?.createdBy || hasItinerary(itinerary?.id || "");

  return (
    <>
      {isOwner && !itinerary?.published && (
        <button
          className="stats-button"
          disabled={
            (errors?.length > 0 &&
              !(errors[0]?.code === 9 && errors?.length === 1)) ||
            (itineraryAttractions?.length ?? 0) === 0 ||
            loading
          }
          onClick={() => {
            if (user?.uid) {
              setLoading(true);
              publishItinerary(
                { ...itinerary, attractions: itineraryAttractions },
                itineraryTime
              )
                .then(() => {
                  updateItineraryHandler({
                    published: true,
                    ratingScore: 0,
                    ratingCounter: 0,
                    ratings: [],
                  });
                  setLoading(false);
                  setPublished(true);
                  setTimeout(() => {
                    setPublished(false);
                  }, 2000);
                })
                .catch((err) => {
                  setLoading(false);
                  console.error(err);
                });
            } else {
              dispatch(setShowLogin(true));
            }
          }}
        >
          {loading ? (
            <Image
              height={32}
              width={32}
              src="/img/icon-spinner.svg"
              alt="spinner"
            />
          ) : (
            <Image
              height={32}
              width={32}
              src="/img/icon-publish.svg"
              alt="publish"
              className="publish-icon"
            />
          )}
        </button>
      )}
      {isOwner && itinerary?.published && (
        <button
          className="stats-button"
          onClick={() => {
            setLoading(true);
            unpublishItinerary(itinerary)
              .then(() => {
                updateItineraryHandler({ published: false });
                setLoading(false);
                setUnpublished(true);
                setTimeout(() => {
                  setUnpublished(false);
                }, 2000);
              })
              .catch((err) => {
                setLoading(false);
                console.error(err);
              });
          }}
          disabled={loading}
        >
          {loading ? (
            <Image
              height={32}
              width={32}
              src="/img/icon-spinner.svg"
              alt="spinner"
            />
          ) : (
            <Image
              height={32}
              width={32}
              src="/img/icon-unpublish.svg"
              alt="unpublish"
              className="unpublish-icon"
            />
          )}
        </button>
      )}
    </>
  );
};
export default React.memo(ItinerarySavePublish);
