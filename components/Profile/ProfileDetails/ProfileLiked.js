import { ToursStyles } from "../Tours/styles/ToursStyles";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import ProfileItinerary from "./ProfileItinerary";
import { useSelector, shallowEqual } from "react-redux";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  limit,
  getFirestore,
  startAfter,
  doc,
  orderBy,
} from "firebase/firestore/lite";
const ProfileLiked = ({ t, profile, currency }) => {
  const language = useSelector((state) => state.app.language, shallowEqual);
  const [loading, setLoading] = useState();
  const [loadingMore, setLoadingMore] = useState();
  const [hasMore, setHasMore] = useState(false);
  const [itineraries, setItineraries] = useState([]);
  const [liked, setLiked] = useState([]);
  const getMoreItineraries = async () => {
    setLoadingMore(true);
    const likedQueryCursor = await getDoc(
      doc(
        getFirestore(),
        "itineraries_likes",
        `${liked[liked?.length - 1]?.userId}${
          liked[liked?.length - 1]?.itineraryId
        }`
      )
    );
    let likedQ;
    likedQ = query(
      collection(getFirestore(), "itineraries_likes"),
      where("userId", "==", profile?.uid),
      orderBy("createdAt", "desc"),
      startAfter(likedQueryCursor),
      limit(7)
    );
    const likedQuerySnapshot = await getDocs(likedQ);
    let tempLiked = [];
    let likedIds = [];
    likedQuerySnapshot.forEach((doc) => {
      if (doc.exists()) {
        likedIds?.push(doc.data().itineraryId);
        tempLiked?.push(doc.data());
      }
    });
    if (likedIds?.length === 7) {
      likedIds?.pop();
      tempLiked?.pop();
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    const queryCursor = await getDoc(
      doc(
        getFirestore(),
        "itineraries",
        itineraries[itineraries?.length - 1]?.id
      )
    );
    console.log(queryCursor.data());
    let q;
    q = query(
      collection(getFirestore(), "itineraries"),
      where("id", "in", likedIds)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    let tempItineraries = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        tempItineraries?.push(doc.data());
      }
    });
    let mergedItineraries = await Promise.all(
      tempItineraries?.map(async (tour) => {
        return { ...tour };
      })
    );
    console.log(mergedItineraries);
    setLoadingMore(false);
    setItineraries([...itineraries, ...mergedItineraries]);
    setLiked([...liked, ...tempLiked]);
  };
  const getItineraries = async () => {
    setLoading(true);
    let likedQ;
    likedQ = query(
      collection(getFirestore(), "itineraries_likes"),
      where("userId", "==", profile?.uid),
      orderBy("createdAt", "desc"),
      limit(7)
    );
    const likedQuerySnapshot = await getDocs(likedQ);
    let tempLiked = [];
    let likedIds = [];
    likedQuerySnapshot.forEach((doc) => {
      tempLiked?.push(doc.data());
      likedIds?.push(doc.data().itineraryId);
    });
    if (likedIds?.length === 7) {
      likedIds?.pop();
      tempLiked?.pop();
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    if (tempLiked?.length > 0) {
      let q;
      q = query(
        collection(getFirestore(), "itineraries"),
        where("id", "in", likedIds)
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      let tempItineraries = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          tempItineraries?.push(doc.data());
        }
      });
      let mergedItineraries = await Promise.all(
        tempItineraries?.map(async (itinerary) => {
          return { ...itinerary };
        })
      );
      setItineraries(mergedItineraries);
      setLiked(tempLiked);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (profile?.uid) {
      getItineraries();
    }
  }, [profile?.uid]);
  return (
    <ToursStyles>
      <div className="tours-section">
        {loading && (
          <div className="spinner-wrapper">
            <Image
              height={80}
              width={80}
              src="/img/icon-spinner.svg"
              alt="loading-dekitabi-tour-guides-tours"
              className="liked-spinner"
            ></Image>
          </div>
        )}
        {itineraries?.length === 0 && !loading && (
          <p className={`no-itineraries traveler-no-itineraries`}>
            {t("noItineraries")}
          </p>
        )}
        {itineraries?.length > 0 && (
          <div className="tours-wrapper">
            {itineraries?.map((itinerary, i) => (
              <ProfileItinerary
                language={language}
                itinerary={itinerary}
                key={i}
                t={t}
              />
            ))}
          </div>
        )}
        {hasMore && !loading && (
          <div className="show-more-wrapper">
            {loadingMore ? (
              <div className="loading-more show-more">
                <Image
                  height={30}
                  width={30}
                  src="/img/icon-spinner.svg"
                  alt="loading-more-dekitabi-tour-guides-tours"
                ></Image>
              </div>
            ) : (
              <button className="show-more" onClick={getMoreItineraries}>
                <Image
                  height={15}
                  width={15}
                  src="/img/icon-arrow-down.svg"
                  alt="load-more-dekitabi-tour-guides-tours"
                ></Image>{" "}
                {t("showMore")}
              </button>
            )}
          </div>
        )}
      </div>
    </ToursStyles>
  );
};
export default React.memo(ProfileLiked);
