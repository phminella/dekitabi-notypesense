import {
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
  getFirestore,
  getDoc,
  arrayUnion,
  increment,
  arrayRemove,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore/lite";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setItineraries } from "../store/itinerarySlice";
import autoId from "./autoId";
import dottie from "dottie";
import { useRouter } from "next/router";
import useCart from "./useCart";
import dayjs from "dayjs";
import "./firebase/firebaseApp";
import { useTranslation } from "next-i18next";
import useLocalStorage from "./useLocalStorage";
const useItinerary = () => {
  const dispatch = useDispatch();
  const db = getFirestore();
  const { getItem, setItem } = useLocalStorage();
  const router = useRouter();
  const user = useSelector((state) => state.app.user, shallowEqual);
  const language = useSelector((state) => state.app.language, shallowEqual);
  const itineraries = useSelector(
    (state) => state.itinerary.itineraries,
    shallowEqual
  );
  const { t } = useTranslation();
  const { updateCartItem, removeFromCart, isAddedToCart } = useCart();
  const newItinerary = async () => {
    const id = autoId();

    // Generate a unique name
    const baseName = t("newTourName", { number: itineraries.length + 1 || 1 });
    const nameExists = itineraries.some((it) => it.name === baseName);
    const name = nameExists ? `${baseName} (2)` : baseName;

    const itinerary = {
      id,
      name,
      date: dayjs().add(1, "day").format("MM/DD/YYYY"),
      startTime: "08:00",
      attractions: [],
      description: "",
      photos: [],
      person: 1,
      travelModes: [],
      durations: [],
      createdBy: user?.uid || "Guest",
      guide: "",
      published: false,
      status: false,
      lunch: -1,
    };

    const tempItineraries = [itinerary, ...itineraries];

    // If cookies are disabled, just update local state
    if (!navigator?.cookieEnabled) {
      dispatch(setItineraries(tempItineraries));
      return id;
    }

    try {
      // Save to Firestore
      await setDoc(doc(db, "itineraries", id), itinerary);

      // Update local storage
      const stored = getItem("itineraries");
      const storedList = stored ? JSON.parse(stored) : [];
      setItem("itineraries", JSON.stringify([id, ...storedList]));

      // Update user's itinerary list if logged in
      if (user?.uid) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          itineraries: arrayUnion(id),
        });
      }

      dispatch(setItineraries(tempItineraries));
      return id;
    } catch (error) {
      console.error("Error creating itinerary:", error);
      return null;
    }
  };

  const deleteItinerary = async (itinerary) => {
    if (itinerary?.photos?.length > 0) {
      const deletedPhotos = await itinerary?.photos?.map((photo) => {
        const fileRef = ref(getStorage(), photo);
        deleteObject(fileRef);
      });
    }
    if (!itinerary?.status) {
      const tempItineraries = itineraries?.filter(
        (item) => item?.id !== itinerary?.id
      );
      if (navigator?.cookieEnabled) {
        const deleteLikes = async (itineraryId) => {
          let likedQ;
          let commentQ;
          let commentLikesQ;
          likedQ = query(
            collection(getFirestore(), "itineraries_likes"),
            where("itineraryId", "==", itineraryId)
          );
          commentLikesQ = query(
            collection(getFirestore(), "comments_likes"),
            where("itineraryId", "==", itineraryId)
          );
          commentQ = query(
            collection(getFirestore(), "comments"),
            where("itineraryId", "==", itineraryId)
          );
          const likedQuerySnapshot = await getDocs(likedQ);
          likedQuerySnapshot.forEach((document) => {
            deleteDoc(
              doc(
                db,
                "itineraries_likes",
                `${document.data()?.userId}${document.data()?.itineraryId}`
              )
            );
            updateDoc(doc(db, "users", document?.data()?.createdBy), {
              likesCounter: increment(-1),
            });
          });
          const commentQuerySnapshot = await getDocs(commentQ);
          commentQuerySnapshot.forEach((document) => {
            deleteDoc(doc(db, "comments", document.data().commentId));
          });
          const commentLikeQuerySnapshot = await getDocs(commentLikesQ);
          commentLikeQuerySnapshot.forEach((document) => {
            deleteDoc(doc(db, "comments_likes", document.data()?.likeId));
          });
        };
        const deletedLikes = await deleteLikes(itinerary?.id);
        return deleteDoc(doc(db, "itineraries", itinerary?.id))
          .then(async () => {
            dispatch(setItineraries(tempItineraries));
            let itinerariesToUpdate = await Promise.all(
              tempItineraries.map((itinerary) => {
                return itinerary.id;
              })
            );
            setItem("itineraries", JSON.stringify(itinerariesToUpdate));
            if (isAddedToCart(itinerary?.id)) {
              removeFromCart(itinerary?.id);
            }
            if (user?.uid) {
              const userRef = doc(db, "users", user.uid);
              return updateDoc(userRef, {
                itineraries: itinerariesToUpdate,
                ...(itinerary?.published && {
                  tours: arrayRemove(itinerary?.id),
                }),
              })
                .then(async () => {
                  if (itinerary?.published) {
                    return deleteDoc(doc(db, "tours", itinerary?.id)).then(
                      async () => {
                        if (
                          router.pathname === "/itinerary/[id]" &&
                          (router.query.id === itinerary?.id ||
                            router.query.id === itinerary?.url)
                        ) {
                          router.push("/");
                          return true;
                        } else {
                          return true;
                        }
                      }
                    );
                  } else {
                    if (
                      router.pathname === "/itinerary/[id]" &&
                      (router.query.id === itinerary?.id ||
                        router.query.id === itinerary?.url)
                    ) {
                      router.push("/");
                      return true;
                    } else {
                      return true;
                    }
                  }
                })
                .catch((err) => {
                  console.log(err);
                  return false;
                });
            } else {
              if (
                router.pathname === "/itinerary/[id]" &&
                (router.query.id === itinerary?.id ||
                  router.query.id === itinerary?.url)
              ) {
                router.push("/");
              }
              return true;
            }
          })
          .catch((err) => {
            console.log(err);
            return false;
          });
      } else {
        dispatch(setItineraries(tempItineraries));
        if (
          router.pathname === "/itinerary/[id]" &&
          (router.query.id === itinerary?.id ||
            router.query.id === itinerary?.url)
        ) {
          router.push("/");
          return true;
        } else {
          return true;
        }
      }
    }
  };
  const setAttractionToItinerary = async (itineraryId, attractionInput) => {
    const attraction = dottie
      .transform(attractionInput)
      .url.split("-")
      .join(" ");

    let tempItineraries = [...itineraries];
    let travelModes = [];
    let durations = [];

    const itineraryIndex = tempItineraries.findIndex(
      (it) => it.id === itineraryId
    );
    if (itineraryIndex === -1) return false;

    let itinerary = tempItineraries[itineraryIndex];
    let attractions = [...(itinerary.attractions || [])];

    durations = itinerary.durations
      ? [...itinerary.durations]
      : Array.from({ length: attractions.length }, () => 0);

    if (attractions.length > 0) {
      travelModes = [
        ...(itinerary.travelModes || []),
        { type: "TRANSIT", time: 0 },
      ];
      durations.push(0); // for the new attraction
    }

    attractions.push(attraction);

    const updatedItinerary = {
      ...itinerary,
      attractions,
      travelModes,
      durations,
    };

    tempItineraries[itineraryIndex] = updatedItinerary;
    dispatch(setItineraries(tempItineraries));

    // DB Updates
    const itineraryRef = doc(db, "itineraries", itineraryId);
    const attractionRef = doc(db, "attractions", attraction);

    if (navigator?.cookieEnabled) {
      try {
        await updateDoc(itineraryRef, {
          attractions: arrayUnion(attraction),
          travelModes,
          durations,
        });
        await updateDoc(attractionRef, { addedCounter: increment(1) });
        return true;
      } catch (err) {
        console.error("Error updating Firestore:", err);
        return false;
      }
    }

    return true;
  };

  const removeAttraction = async (
    itineraryId,
    attractionUrl,
    itineraryOverride
  ) => {
    const getDeletedTravelModeIndex = (index, hasMeetingPlace) => {
      if (index > 0) return hasMeetingPlace ? index : index - 1;
      return 0;
    };

    const removeAttractionByUrl = (data, targetUrl) => {
      const attractions = [...(data.attractions || [])];
      const travelModes = [...(data.travelModes || [])];
      const durations = [
        ...(data.durations || Array(attractions.length).fill(0)),
      ];

      const index = attractions.findIndex(
        (a) => a.split(" ").join("-") === targetUrl
      );

      if (index === -1) return null;

      const deletedTravelModeIndex = getDeletedTravelModeIndex(
        index,
        !!data.meetingPlace
      );
      attractions.splice(index, 1);
      durations.splice(index, 1);
      travelModes.splice(deletedTravelModeIndex, 1);

      return { attractions, travelModes, durations };
    };

    if (!itineraryOverride) {
      const tempItineraries = [...(itineraries || [])];
      const itineraryIndex = tempItineraries.findIndex(
        (it) => it.id === itineraryId
      );
      if (itineraryIndex === -1) return;

      const updated = removeAttractionByUrl(
        tempItineraries[itineraryIndex],
        attractionUrl
      );
      if (!updated) return;

      tempItineraries[itineraryIndex] = {
        ...tempItineraries[itineraryIndex],
        ...updated,
      };

      // Firestore update
      const itineraryRef = doc(getFirestore(), "itineraries", itineraryId);
      await updateDoc(itineraryRef, updated);

      dispatch(setItineraries(tempItineraries));
      return updated;
    }

    // If itineraryOverride is passed (not updating Firestore)
    return removeAttractionByUrl(itineraryOverride, attractionUrl);
  };

  const updateItinerary = async (itinerary, data) => {
    if (!itinerary?.id || !data) return false;

    const itineraryId = itinerary.id;
    const key = Object.keys(data)[0];
    const isGuideUpdateKey = ["guideFee", "guideData", "guide"].includes(key);
    const userIsOwner =
      user?.uid === itinerary.createdBy ||
      user?.uid === itinerary.guide ||
      hasItinerary(itineraryId);
    const updateAllowed =
      !itinerary.status &&
      userIsOwner &&
      navigator?.cookieEnabled &&
      (user?.guide !== "true" || !isGuideUpdateKey);

    // Update local Redux state
    const updatedItineraries =
      itineraries?.length > 0
        ? itineraries.map((it) =>
            it.id === itineraryId
              ? { ...it, ...data, lastVisit: Date.now() }
              : it
          )
        : [];

    dispatch(setItineraries(updatedItineraries));

    // Cart updates
    if (key === "guideFee" && data?.guideFee === 0) {
      removeFromCart(itineraryId);
    } else if (
      isAddedToCart(itineraryId) &&
      key !== "guideFee" &&
      key !== "attractions"
    ) {
      updateCartItem(itineraryId, data);
    }

    console.log("ITINERARY UPDATED (NOT DB)", data);

    if (!updateAllowed) return true;

    // DB update
    try {
      const itineraryRef = doc(db, "itineraries", itineraryId);
      await updateDoc(itineraryRef, {
        ...data,
        lastVisit: Date.now(),
      });
      console.log("ITINERARY UPDATED (DB)", data);
      return updatedItineraries;
    } catch (error) {
      console.error("Error updating itinerary in DB:", error);
      return false;
    }
  };

  const isAttractionOpen = (
    itineraryDate,
    arrival,
    departure,
    openingHours,
    isGuide
  ) => {
    if (openingHours) {
      if (arrival.includes("(+1)") || departure.includes("(+1)")) {
        return false;
      }
      if (openingHours.length === 1) {
        return true;
      }
      for (let i = 0; i < openingHours.length; i++) {
        if (openingHours[i]?.close?.day === new Date(itineraryDate)?.getDay()) {
          if (
            openingHours[i]?.close?.time === "0000" ||
            openingHours[i]?.open?.time === "0000"
          ) {
            return true;
          } else if (
            parseInt(arrival.split(":").join("")) >=
              parseInt(openingHours[i]?.open?.time) &&
            parseInt(departure.split(":").join("")) <=
              parseInt(openingHours[i]?.close?.time)
          ) {
            return true;
          } else if (openingHours.length < 8) {
            return false;
          } else {
            if (
              openingHours[i]?.open?.day === openingHours[i + 1]?.open?.day &&
              ((parseInt(arrival.split(":").join("")) >=
                parseInt(openingHours[i]?.open?.time) &&
                parseInt(departure.split(":").join("")) <=
                  parseInt(openingHours[i]?.close?.time)) ||
                (parseInt(arrival.split(":").join("")) >=
                  parseInt(openingHours[i + 1]?.open?.time) &&
                  parseInt(departure.split(":").join("")) <=
                    parseInt(openingHours[i + 1]?.close?.time)))
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
      if (isGuide) {
        for (let i = 1; i < 7; i++) {
          if (
            openingHours[i]?.open?.day === openingHours[i]?.open?.day &&
            ((parseInt(arrival.split(":").join("")) >=
              parseInt(openingHours[i]?.open?.time) &&
              parseInt(departure.split(":").join("")) <=
                parseInt(openingHours[i]?.close?.time)) ||
              (parseInt(arrival.split(":").join("")) >=
                parseInt(openingHours[i + 1]?.open?.time) &&
                parseInt(departure.split(":").join("")) <=
                  parseInt(openingHours[i + 1]?.close?.time)))
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
      return isGuide ? true : false;
    } else {
      return true;
    }
  };
  const attractionOpeningTime = (itineraryDate, openingHours) => {
    if (!Array.isArray(openingHours) || openingHours.length <= 1) {
      return true;
    }

    let weekday = new Date(itineraryDate).getDay();
    weekday = weekday === 0 ? 6 : weekday - 1;

    const rawOpening = openingHours[weekday];
    if (typeof rawOpening !== "string") {
      return false;
    }

    const formattedOpening = (
      String(rawOpening?.split(":")?.slice(1)?.join(":")) || ""
    )
      ?.replaceAll?.("PM", t("pm"))
      ?.replaceAll?.("AM", t("am"));

    if (formattedOpening === " Closed") {
      if (user?.guide !== "true") {
        return "closed";
      } else {
        for (let i = 1; i < 7; i++) {
          const altOpening = openingHours[i];
          if (typeof altOpening !== "string") continue;

          const altFormatted = (
            String(altOpening?.split(":")?.slice(1)?.join(":")) || ""
          )
            ?.replaceAll?.("PM", t("pm"))
            ?.replaceAll?.("AM", t("am"));

          if (altFormatted !== " Closed") {
            return altFormatted;
          }
        }
        return "closed";
      }
    } else if (formattedOpening === " Open 24 hours") {
      return "open24h";
    } else {
      return formattedOpening;
    }
  };
  const getGuideFee = (itinerary, includeTransport) => {
    if (itinerary?.guideData) {
      let fee = 0;
      if (
        !includeTransport ||
        (!itinerary?.guideData?.feeWithTransport?.halfDay &&
          !itinerary?.guideData?.feeWithTransport?.fullDay)
      ) {
        if (itinerary?.lunch < 0) {
          fee = itinerary?.guideData?.fee?.halfDay;
        }
        if (itinerary?.lunch > -1) {
          fee = itinerary?.guideData?.fee?.fullDay;
        }
      } else {
        if (itinerary?.lunch < 0) {
          fee = itinerary?.guideData?.feeWithTransport?.halfDay;
        }
        if (itinerary?.lunch > -1) {
          fee = itinerary?.guideData?.feeWithTransport?.fullDay;
        }
      }
      if (isAddedToCart(itinerary?.id)) {
        updateCartItem(itinerary?.id, { price: fee });
      }
      return fee;
    } else {
      return 0;
    }
  };
  const unpublishItinerary = async (itinerary) => {
    if (itinerary?.createdBy === user?.uid) {
      return deleteDoc(doc(db, "tours", itinerary?.id))
        .then(async () => {
          return true;
        })
        .catch((err) => console.log(err));
    }
  };
  const createTour = async (itinerary, itineraryTime) => {
    let tags = [];
    let attractionsName = "";
    let attractions = [];
    let states = [];
    let urls = [];
    for (let i = 0; i < itinerary?.attractions?.length; i++) {
      if (attractionsName === "") {
        attractionsName = itinerary.attractions[i].name;
      } else {
        attractionsName =
          attractionsName + " > " + itinerary.attractions[i].name;
      }
      attractions.push(itinerary.attractions[i].url.split("-").join(" "));
      if (!states.includes(itinerary.attractions[i].translatedState)) {
        states.push(itinerary.attractions[i].translatedState["en"]);
      }
      urls.push(itinerary.attractions[i].url);
      itinerary.attractions[i].tags.map((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    }
    let startTime = itinerary.startTime.split(":");
    startTime = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
    return {
      id: itinerary.id,
      name: itinerary.name,
      attractions,
      attractionsName,
      tags,
      states,
      createdBy: itinerary.createdBy,
      duration:
        itinerary?.lunch < 0
          ? itineraryTime.duration + itineraryTime.transitTime
          : itineraryTime.duration + itineraryTime.transitTime + 60,
      startTime,
      ratingScore: itinerary?.ratingScore ? itinerary?.ratingScore : 0,
      ratingCounter: itinerary?.ratingCounter ? itinerary?.ratingCounter : 0,
      ratings: itinerary?.ratings ? itinerary?.ratings : [],
      urls,
      url: itinerary?.url ? itinerary?.url : itinerary?.id,
      ...(!itinerary?.ratings && { createdAt: new Date().getTime() }),
      _geoloc: itinerary?.meetingPlace
        ? itinerary?.meetingPlace._geoloc
        : itinerary?.attractions[0]._geoloc,
    };
  };
  const updateTour = async (itinerary, itineraryTime) => {
    const tourRef = doc(getFirestore(), "tours", itinerary?.id);
    const tourSnap = await getDoc(tourRef);
    let publishedItinerary = await createTour(itinerary, itineraryTime);
    if (tourSnap.exists()) {
      return updateDoc(doc(db, "tours", itinerary.id), {
        ...publishedItinerary,
      })
        .then(() => {
          return true;
        })
        .catch((err) => console.log(err));
    }
  };
  const publishItinerary = async (itinerary, itineraryTime) => {
    const publishedItinerary = await createTour(itinerary, itineraryTime);
    return setDoc(doc(db, "tours", itinerary.id), publishedItinerary)
      .then(async () => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };
  const saveItinerary = async (itinerary) => {
    const userRef = doc(db, "users", user?.uid);
    const id = autoId();
    if (hasItinerary(itinerary?.id)) {
      return updateItinerary(itinerary, { createdBy: user?.uid })
        .then(() => {
          return true;
        })
        .catch((err) => console.log(err));
    } else {
      let savedItinerary = {
        ...itinerary,
        id: id,
        ...(itinerary?.published && {
          tourBaseItinerary: itinerary.id,
        }),
        createdBy: user?.uid,
        guide: "",
        url: "",
        published: false,
        status: false,
        photos: [],
        name: `${itinerary?.translatedName[language?.code]} 2`,
      };
      delete savedItinerary.guideFee;
      delete savedItinerary.guideData;
      return setDoc(doc(db, "itineraries", id), savedItinerary)
        .then(async () => {
          setItem("itineraries", JSON.stringify([...user.itineraries, id]));
          return updateDoc(userRef, {
            itineraries: arrayUnion(id),
          })
            .then(async () => {
              dispatch(setItineraries([...itineraries, savedItinerary]));
              return router
                .push(`/itinerary/${id}`)
                .then(() => {
                  return true;
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };
  const hasItinerary = (id) => {
    if (itineraries?.length > 0) {
      for (let i = 0; i < itineraries?.length; i++) {
        if (itineraries[i].id === id) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };
  // const fixItinerary = async (data) => {
  //   let itinerary = { ...data };
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);

  //   const expectedTravelModesLength = () => {
  //     const attrLen = itinerary?.attractions?.length || 0;
  //     if (itinerary.meetingPlace && itinerary.endPlace) return attrLen + 1;
  //     if (itinerary.meetingPlace || itinerary.endPlace) return attrLen;
  //     return attrLen - 1;
  //   };

  //   const buildTravelModes = (length) =>
  //     Array.from({ length }, (_, i) =>
  //       itinerary.travelModes?.[i] || { type: "TRANSIT", time: 0 }
  //     );

  //   const buildDurations = (length) =>
  //     Array.from({ length }, (_, i) =>
  //       itinerary.durations?.[i] >= 0 ? itinerary.durations[i] : 0
  //     );

  //   // Fix travelModes
  //   const travelLen = expectedTravelModesLength();
  //   if (itinerary.travelModes?.length !== travelLen) {
  //     itinerary.travelModes = buildTravelModes(travelLen);
  //   }

  //   // Fix durations
  //   if (itinerary.durations?.length !== itinerary.attractions?.length) {
  //     itinerary.durations = buildDurations(itinerary.attractions.length);
  //   }

  //   // Fix date
  //   const itineraryDate = new Date(itinerary.date);
  //   if (itineraryDate < new Date(today.getTime() + 86400000)) {
  //     itinerary.date = dayjs().add(1, "day").format("MM/DD/YYYY");
  //   }

  //   // Fetch and filter attraction data
  //   const validAttractionIds = [];
  //   const itineraryAttractions = (
  //     await Promise.all(
  //       itinerary.attractions.map(async (id, i) => {
  //         const snap = await getDoc(doc(db, "attractions", id));
  //         if (!snap.exists()) {
  //           itinerary.durations.pop();
  //           itinerary.travelModes.pop();
  //           return undefined;
  //         }

  //         validAttractionIds.push(id);
  //         const data = snap.data();

  //         const translate = (field) =>
  //           data?.[field]?.[language?.code] || data?.[field]?.en;

  //         const translatedAttraction = {
  //           ...data,
  //           ...(data.translatedArea?.en && {
  //             translatedArea: { [language.code]: translate("translatedArea") },
  //           }),
  //           ...(data.translatedCity?.en && {
  //             translatedCity: { [language.code]: translate("translatedCity") },
  //           }),
  //           ...(data.translatedName?.en && {
  //             name: translate("translatedName"),
  //           }),
  //           ...(data.translatedState?.en && {
  //             translatedState: {
  //               en: data.translatedState.en,
  //               ja: data.translatedState.ja,
  //               ...(language.code !== "en" &&
  //                 language.code !== "ja" && {
  //                   [language.code]: data.translatedState[language.code],
  //                 }),
  //             },
  //           }),
  //         };

  //         // Clean unnecessary fields
  //         [
  //           "addedCounter",
  //           "address",
  //           "country",
  //           "description",
  //           "phoneNumber",
  //           "photos",
  //           "rating",
  //           "ratingCounter",
  //           "reviews",
  //           "translatedDescription",
  //           "website",
  //         ].forEach((key) => delete translatedAttraction[key]);

  //         return translatedAttraction;
  //       })
  //     )
  //   ).filter(Boolean);

  //   // Generate itinerary photos
  //   const itineraryPhotos = [];
  //   itineraryAttractions.forEach((attraction) => {
  //     const photosCounter = attraction.photosCounter || 3;
  //     for (let i = 1; i <= Math.min(3, photosCounter); i++) {
  //       itineraryPhotos.push({ attraction: attraction.url, index: i });
  //     }
  //   });

  //   // Final merged object
  //   const finalItinerary = {
  //     ...itinerary,
  //     attractions: validAttractionIds,
  //     itineraryAttractions,
  //     itineraryPhotos,
  //     ...(itinerary.translatedName && {
  //       translatedName: {
  //         [language?.code]: itinerary.translatedName?.[language.code],
  //       },
  //     }),
  //     ...(itinerary.translatedDescription && {
  //       translatedDescription: {
  //         [language?.code]: itinerary.translatedDescription?.[language.code],
  //       },
  //     }),
  //     ...(itinerary.meetingPlace?.name && {
  //       meetingPlace: {
  //         ...itinerary.meetingPlace,
  //         translatedName: {
  //           [language.code]:
  //             itinerary.meetingPlace.translatedName?.[language.code] ??
  //             itinerary.meetingPlace.name,
  //         },
  //       },
  //     }),
  //     ...(itinerary.endPlace?.name && {
  //       endPlace: {
  //         ...itinerary.endPlace,
  //         translatedName: {
  //           [language.code]:
  //             itinerary.endPlace.translatedName?.[language.code] ??
  //             itinerary.endPlace.name,
  //         },
  //       },
  //     }),
  //     locale: language?.code,
  //   };

  //   return finalItinerary;
  // };
  return {
    itineraries,
    newItinerary,
    // fixItinerary,
    deleteItinerary,
    setAttractionToItinerary,
    // removeAttractionFromItinerary,
    removeAttraction,
    updateItinerary,
    updateTour,
    getGuideFee,
    isAttractionOpen,
    attractionOpeningTime,
    publishItinerary,
    unpublishItinerary,
    saveItinerary,
    hasItinerary,
  };
};
export default useItinerary;
