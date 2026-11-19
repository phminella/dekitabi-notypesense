// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
// React/Nextjs Imports
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import {
  updateDoc,
  getFirestore,
  doc,
  getDoc,
  increment,
  arrayUnion,
  collection,
  addDoc
} from "firebase/firestore/lite";
import dynamic from "next/dynamic";
// Style Imports
import { ItineraryStyles } from "./styles/ItineraryStyles";
// Itinerary Components
import ItineraryHeader from "./Header/ItineraryHeader";
// import ItineraryTime from "./Details/ItineraryTime";
const ItineraryBook = dynamic(() => import("./ItineraryBook"), {
  ssr: false,
});
import ItineraryTime from "./Details/ItineraryTime";
const ItineraryAlert = dynamic(() => import("./ItineraryAlert"), {
  ssr: false,
});
const ItineraryTutorial = dynamic(() => import("./ItineraryTutorial"), {
  ssr: false,
});
import AttractionTravelMode from "./Attractions/AttractionTravelMode";
// const ShowItineraryVideo = dynamic(() => import("../Misc/ShowItineraryVideo"));
const ItineraryDetails = dynamic(() => import("./Details/ItineraryDetails"));
const ItineraryEndPlace = dynamic(() => import("./ItineraryEndPlace"));
const ItineraryCartWarning = dynamic(
  () => import("./Details/ItineraryCartWarning"),
  { ssr: false }
);
const ItineraryMeetingPlace = dynamic(() => import("./ItineraryMeetingPlace"));
const ItineraryGuides = dynamic(() => import("./Guide/ItineraryGuides"), {
  ssr: false,
});
const ItineraryModal = dynamic(() => import("./Modal/ItineraryModal"));
import AttractionsList from "./Attractions/AttractionsList";
const ItineraryPolicies = dynamic(() => import("./ItineraryPolicies"));
const RemoveItineraryButton = dynamic(() => import("./RemoveItineraryButton"), {
  ssr: false,
});
const ItineraryNotes = dynamic(() => import("./ItineraryNotes"));
const ItineraryDescription = dynamic(() => import("./ItineraryDescription"));
import ItineraryStatus from "./ItineraryStatus";
import withLazyLoad from "../../lib/withLazyLoad";
const LazyRemoveItineraryButton = withLazyLoad(RemoveItineraryButton);
import MapWrapper from "./Map/MapWrapper";
import { useTranslation } from "next-i18next";
// Custom Hooks, etc
import useCart from "../../lib/useCart";
import useDate from "../../lib/useDate";
import useItinerary from "../../lib/useItinerary";
const FirstSteps = dynamic(() => import("./FirstSteps/FirstSteps"), {
  ssr: false,
});
const Itinerary404 = dynamic(() => import("./Itinerary404"), {
  ssr: false,
});
import { ItineraryResponsiveStyles } from "./styles/responsive/ItineraryResponsiveStyles";
const FixedAttractions = dynamic(
  () => import("./Attractions/FixedAttractions"),
  {
    ssr: false,
  }
);
const ItineraryEnableCookies = dynamic(
  () => import("./ItineraryEnableCookies"),
  {
    ssr: false,
  }
);
import useLocalStorage from "../../lib/useLocalStorage";
const AddAttraction = dynamic(() => import("./AddAttraction/AddAttraction"), {
  ssr: false,
});
// import useMap from "../../lib/useMap";
import Head from "next/head";
// const NoAttractions = dynamic(() => import("./NoAttractions"), {
//   ssr: false,
// });
import NoAttractions from "./NoAttractions";
const SuggestedItineraries = dynamic(
  () => import("../Misc/SuggestedItineraries/SuggestedItineraries"),
  {
    ssr: false,
  }
);
const GoogleMapButton = dynamic(() => import("./NoSsr/GoogleMapButton"), {
  ssr: false,
});
const ItineraryError = dynamic(() => import("./ItineraryError"));
const SuggestedAttractions = dynamic(() =>
  import("../Misc/SuggestedAttractions/SuggestedAttractions")
);
const ItineraryPublished = dynamic(() => import("./ItineraryPublished"), {
  ssr: false,
});
const ItineraryUnpublished = dynamic(() => import("./ItineraryUnpublished"), {
  ssr: false,
});
const ItinerarySaved = dynamic(() => import("./ItinerarySaved"), {
  ssr: false,
});
//
// End Imports
//
import { Attraction } from "../../types/attraction";
import { Itinerary as ItineraryType, ItineraryTime as ItineraryTimeType, ItinerarySsr, ItineraryError } from "../../types/itinerary";
import { User } from "../../types/user";
import { RootState } from "../../store/store";

interface ItineraryComponentProps {
  id: string;
  fromLink?: boolean;
  itinerarySsr: ItinerarySsr;
}

const Itinerary = ({ id, fromLink, itinerarySsr }: ItineraryComponentProps) => {
  const buildCarouselPhotos = useCallback((attractions: Attraction[]) => {
    const photos: { attraction: string; index: number }[] = [];
    if (!Array.isArray(attractions)) return photos;

    attractions.forEach((attraction) => {
      const count = Math.min(3, attraction?.photosCounter || 3);
      for (let i = 0; i < count; i++) {
        photos.push({
          attraction: attraction?.url || "",
          index: i + 1,
        });
      }
    });

    return photos;
  }, []);
  const isCookiesEnabled =
    typeof navigator !== "undefined" && navigator.cookieEnabled;
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.app.user, shallowEqual);
  const language = useSelector((state: RootState) => state.app.language, shallowEqual);
  const currency = useSelector((state: RootState) => state.app.currency, shallowEqual);
  const viewRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const itineraries = useSelector(
    (state: RootState) => state.itinerary.itineraries,
    shallowEqual
  );
  const { toTime } = useDate();
  const { getItem, setItem } = useLocalStorage();
  const {
    updateItinerary,
    isAttractionOpen,
    updateTour,
    hasItinerary,
    getGuideFee,
    // fixItinerary,
  } = useItinerary();
  // const { calculateAllDistances } = useMap();
  const [showTutorial, setShowTutorial] = useState(
    !getItem("tutorialWithAttraction") || !getItem("tutorialWithoutAttraction")
      ? true
      : false
  );
  const [partialSteps, setPartialSteps] = useState(
    !getItem("tutorialWithAttraction") ? true : false
  );
  const [errors, setErrors] = useState<ItineraryError[]>([]);
  const [error, setError] = useState(false);
  const [includeTransport, setIncludeTransport] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingPhotos, setLoadingPhotos] = useState<string[]>([]);
  const [itineraryDoesNotExist, setItineraryDoesNotExist] = useState(false);
  const [attractionToDelete, setAttractionToDelete] = useState<Attraction | null>(null);
  const [itinerary, setItinerary] = useState(itinerarySsr);
  const [itineraryAttractions, setItineraryAttractions] = useState<Attraction[]>(
    itinerarySsr?.itineraryAttractions || []
  );
  const itineraryAttractionsRef = useRef<Attraction[]>(itinerarySsr?.itineraryAttractions || []);
  const [itineraryTime, setItineraryTime] = useState<ItineraryTimeType>({
    duration: 0,
    transitTime: 0,
    attractionTransitTime: [],
    arrivalDepartureTime: [],
  });
  const draggingRef = useRef<string | boolean | null>(null);
  // const [dragging, setDragging] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<number | null>(null);
  // Modal Content
  const [showModal, setShowModal] = useState<string | boolean>(false);
  const [published, setPublished] = useState(false);
  const [unpublished, setUnpublished] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showGuideList, setShowGuideList] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [closedAttractions, setClosedAttractions] = useState<string[]>([]);
  const [loadingAttraction, setLoadingAttraction] = useState(false);
  const { isAddedToCart, updateCartItem } = useCart();
  
  const checkedGuides = useCallback(async () => {
    if (user) {
      try {
        const logsRef = collection(getFirestore(), "misc", "checkedGuides", "logs");
        await addDoc(logsRef, {
          userId: user?.uid,
          userEmail: user?.email,
          timestamp: new Date()?.getTime(),
        });
      } catch (err) {
        console.error("Failed to log checkedGuides", err);
      }
    }
  }, [user]);
  const carouselPhotos = useMemo(() => {
    if (loadingPhotos?.length > 0) return [];
    return buildCarouselPhotos(itineraryAttractions);
  }, [itineraryAttractions, loadingPhotos]);
  const areAttractionListsEqual = useCallback((left: Attraction[] = [], right: Attraction[] = []) => {
    if (left === right) return true;
    if (!Array.isArray(left) || !Array.isArray(right)) return false;
    if (left.length !== right.length) return false;
    return left.every((item, index) => item?.url === right[index]?.url);
  }, []);
  const getAttractionsFromDb = useCallback(async (attractionIds: string[] = []) => {
    if (!attractionIds?.length) return [];

    const cachedAttractions = itineraryAttractionsRef.current || [];
    const cachedById = new Map<string, Attraction>(
      cachedAttractions
        .filter((item) => item?.url)
        .map((item) => [item.url!.split("-").join(" "), item])
    );

    const tempAttractions = await Promise.all(
      attractionIds.map(async (attractionId) => {
        if (cachedById.has(attractionId)) {
          return cachedById.get(attractionId);
        }
        const attractionSnap = await getDoc(
          doc(getFirestore(), "attractions", attractionId)
        );
        return attractionSnap?.data() as Attraction;
      })
    );

    return tempAttractions.filter((a): a is Attraction => !!a);
  }, []);
  useEffect(() => {
    itineraryAttractionsRef.current = Array.isArray(itineraryAttractions)
      ? itineraryAttractions
      : [];
  }, [itineraryAttractions]);
  // const getItineraryFromRedux = async () => {
  //   for (let i = 0; i < itineraries?.length; i++) {
  //     if (itineraries[i]?.id === id) {
  //       let tempItinerary = await fixItinerary(itineraries[i]);
  //       setItinerary({
  //         ...itinerary,
  //         ...tempItinerary,
  //         ...(hasItinerary(id) &&
  //           user?.uid &&
  //           itineraries[i]?.createdBy !== user?.uid && {
  //             createdBy: user?.uid,
  //           }),
  //         guideFee: itinerary?.guideFee,
  //       });
  //       setUpdating(false);
  //     }
  //     break;
  //   }
  // };
  useEffect(() => {
    let isMounted = true;
    const itineraryAttractionIds = itinerary?.attractions || [];
    const itineraryId = itinerary?.id;

    const syncAttractions = async () => {
      const attractions = await getAttractionsFromDb(itineraryAttractionIds);
      if (!isMounted) return;

      setItineraryAttractions((previous: Attraction[]) =>
        areAttractionListsEqual(previous, attractions) ? previous : attractions
      );

      const cartItem = isAddedToCart(itineraryId);
      if (
        cartItem &&
        !areAttractionListsEqual(cartItem?.attractions, attractions)
      ) {
        updateCartItem(itineraryId, { attractions });
      }
    };

    syncAttractions();

    if (!getItem("tutorialWithAttraction")) {
      setShowTutorial(true);
    }

    return () => {
      isMounted = false;
    };
  }, [
    itinerary?.attractions,
    itinerary?.id,
    getAttractionsFromDb,
    isAddedToCart,
    updateCartItem,
    getItem,
    areAttractionListsEqual
  ]);
  const loadPhotos = useCallback(async (index: number, attractionUrl: string) => {
    const formattedUrl = attractionUrl.toLowerCase().split(" ").join("-");
    const photoRef = ref(getStorage(), `/attractions/${formattedUrl}/${index}_1000x1000.webp`);

    let retries = 0;
    const maxRetries = 8;
    
    const fetchUrl = async () => {
      try {
        await getDownloadURL(photoRef);
        // If it succeeds, remove from loadingPhotos
        setLoadingPhotos((prev) => prev.filter((e) => e !== formattedUrl));
      } catch (error) {
        if (retries < maxRetries) {
          retries++;
          setTimeout(fetchUrl, 1000);
        }
      }
    };

    fetchUrl();
  }, []);
  const shouldUpdateTour = useCallback(() => {
    return (
      itinerary?.createdBy === user?.uid &&
      itineraryTime?.duration > 0 &&
      !itinerary?.status &&
      itinerary?.published &&
      itineraryAttractions?.length > 0 &&
      !loading
    );
  }, [
    itinerary,
    user?.uid,
    itineraryTime?.duration,
    itineraryAttractions,
    loading,
  ]);
  useEffect(() => {
    if (shouldUpdateTour()) {
      updateTour(
        { ...itinerary, attractions: itineraryAttractions },
        itineraryTime
      );
    }
  }, [
    shouldUpdateTour,
    itinerary,
    itineraryAttractions,
    itineraryTime,
    updateTour,
  ]);
  const updateItineraryHandler = async (updatedData: Partial<ItineraryType>) => {
    if (typeof navigator !== "undefined" && !navigator.cookieEnabled)
      return false;

    if (!updatedData || itinerary?.status) return false;

    const isAttractionsUpdate = Object.keys(updatedData)[0] === "attractions";

    if (isAttractionsUpdate) {
      const attractionsInput = updatedData.attractions ?? [];
      const tempAttractionsDb = attractionsInput.map((a: any) =>
        typeof a === "string" ? a : a?.url?.split("-").join(" ")
      );

      const shouldClearEndpoints = attractionsInput.length === 0;
      const shouldUpdateTravelModes =
        updatedData.travelModes &&
        attractionsInput.length !== itineraryAttractions?.length;
      console.log(updatedData);
      const newItinerary = {
        ...itinerary,
        attractions: tempAttractionsDb,
        ...(shouldClearEndpoints && {
          meetingPlace: "",
          endPlace: "",
          travelModes: [],
        }),
        ...(updatedData.durations && { durations: updatedData.durations }),
        ...(shouldUpdateTravelModes && {
          travelModes: updatedData.travelModes,
        }),
      };

      setItinerary(newItinerary as unknown as ItinerarySsr);

      const dbUpdate = {
        attractions: tempAttractionsDb,
        ...(shouldClearEndpoints && { meetingPlace: "", endPlace: "" }),
        ...(updatedData.durations && { durations: updatedData.durations }),
        ...(shouldUpdateTravelModes && {
          travelModes: updatedData.travelModes,
        }),
      };

      return updateItinerary(newItinerary, dbUpdate).then(() => true).catch(() => false);
    }

    // For other updates
    const newItinerary = { ...itinerary, ...updatedData };
    setItinerary(newItinerary);
    return updateItinerary(newItinerary, updatedData).then(() => true).catch(() => false);
  };

  //
  // Optimized
  //
  const getItinerary = useCallback(async () => {
    if (!itinerarySsr?.id) {
      setItineraryDoesNotExist(true);
      return;
    }
    const cartItem = isAddedToCart(id);
    if (cartItem) {
      setItineraryAttractions(cartItem?.attractions);
      const cartAttractions = cartItem?.attractions?.map((a: Attraction) =>
        a?.url?.split("-").join(" ")
      );

      if (cartItem?.transportIncluded === true) {
        setIncludeTransport(true);
      }

      setItinerary((prev) => ({
        ...prev,
        ...cartItem,
        attractions: cartAttractions,
      }));
    }

    setItineraryDoesNotExist(false);
  }, [id, itinerary, itinerarySsr?.id, isAddedToCart]);
  useEffect(() => {
    if (!isCookiesEnabled || !id || !user || !itineraries) return;

    if (itinerary?.id !== id && itinerary?.url !== id) {
      setErrors([]);
      setItineraryTime({
        duration: 0,
        transitTime: 0,
        attractionTransitTime: [],
        arrivalDepartureTime: [],
      });
      setItinerary(itinerarySsr);
      setItineraryAttractions(itinerarySsr?.itineraryAttractions || []);
      getItinerary();
    }
  }, [
    id,
    user,
    itineraries,
    itinerary?.id,
    itinerary?.url,
    itinerarySsr,
    getItinerary,
    isCookiesEnabled,
  ]);
  // useEffect(() => {
  //   if (updating) {
  //     setUpdating(false);
  //   } else {
  //     if ((itinerary?.id, itineraryTime?.duration > 0)) {
  //       if (hasItinerary(id)) {
  //         getItineraryFromRedux();
  //       }
  //     }
  //   }
  // }, [itineraries]);
  const hasUpdatedViewsRef = useRef(false);
  useEffect(() => {
    if (!hasUpdatedViewsRef.current && itinerarySsr?.id) {
      const updateViews = async () => {
        try {
          await updateDoc(
            doc(getFirestore(), "itineraries", itinerarySsr?.id),
            {
              viewsCounter: increment(1),
            }
          );

          if (itinerary?.published) {
            await updateDoc(doc(getFirestore(), "tours", itinerarySsr?.id), {
              viewsCounter: increment(1),
            });
          }

          hasUpdatedViewsRef.current = true;
        } catch (error) {
          console.error("Failed to update view counters", error);
        }
      };

      updateViews();
    }
    // Set currency only if different and appropriate
    if (
      itinerary?.currency !== (currency as unknown as string) &&
      !itinerary?.status &&
      user?.guide !== "true"
    ) {
      setItinerary({ ...itinerary, currency: currency as unknown as string });
    }
  }, [currency, itinerary, itinerarySsr?.id, user]);

  //
  // OPTIMIZED
  //
  useEffect(() => {
    if (!Array.isArray(itineraryAttractions)) return;
    if (!itineraryTime?.arrivalDepartureTime?.length) return;

    const timeoutId = setTimeout(() => {
      const tempClosedAttractions = itineraryAttractions.reduce<string[]>(
        (closed, attr, i) => {
          const arrival = itineraryTime?.arrivalDepartureTime?.[i]?.arrival;
          const departure = itineraryTime?.arrivalDepartureTime?.[i]?.departure;
          const isClosed = !isAttractionOpen(
            itinerary?.date || "",
            toTime(arrival),
            toTime(departure),
            attr?.openingPeriods,
            user?.guide === "true" && user?.uid === itinerary?.createdBy
          );

          if (arrival && departure && isClosed) {
            closed.push(
            (attr?.translatedName as Record<string, string>)?.[itinerarySsr?.locale || "en"] || attr?.name || ""
            );
          }

          return closed;
        },
        []
      );

      // Only update state if the array actually changed
      setClosedAttractions((prev) => {
        if (
          prev.length === tempClosedAttractions.length &&
          prev.every((item, i) => item === tempClosedAttractions[i])
        ) {
          return prev; // no change
        }
        return tempClosedAttractions;
      });
    }, 300); // 800ms delay

    // Cleanup function to clear the timeout if the component unmounts or dependencies change
    return () => clearTimeout(timeoutId);
  }, [
    itineraryTime?.arrivalDepartureTime,
    itinerary?.date,
    itinerary?.createdBy,
    itineraryAttractions,
    user?.guide,
    user?.uid,
    isAttractionOpen,
    toTime,
    itinerarySsr?.locale,
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const { duration, transitTime, attractionTransitTime } =
      itineraryTime || {};
    const { lunch, travelModes } = itinerary || {};

    if (duration > 0) {
      if (
        duration + transitTime > 240 &&
        (lunch < 0 || !lunch || lunch >= travelModes?.length)
      ) {
        console.log(
          "shuffle lunch break",
          lunch < 0,
          !lunch,
          lunch >= travelModes?.length,
          duration,
          transitTime
        );
        const newLunchBreak = reshuffleLunchBreak();
        updateItineraryHandler({ lunch: newLunchBreak });
        setItineraryTime({ ...itineraryTime, attractionTransitTime });
      } else if (lunch > -1 && duration + transitTime <= 240) {
        attractionTransitTime[lunch] -= 60;
        console.log("remove lunch break", duration, transitTime);
        updateItineraryHandler({ lunch: -1 });
        setItineraryTime({ ...itineraryTime, attractionTransitTime });
      }
    }
  }, [itineraryTime?.duration, itineraryTime?.transitTime]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateLunchBreak = (newLunchBreak: number) => {
    const { lunch } = itinerary || {};
    if (lunch > -1) {
      const attractionTransitTime = [...itineraryTime?.attractionTransitTime];
      attractionTransitTime[newLunchBreak] += 60;
      attractionTransitTime[lunch] -= 60;
      updateItineraryHandler({ lunch: newLunchBreak });
      setItineraryTime({ ...itineraryTime, attractionTransitTime });
    }
  };

  const reshuffleLunchBreak = () => {
    const { travelModes, lunch } = itinerary || {};
    if (travelModes?.length > 0) {
      const lunchBreakStop = Math.trunc(travelModes.length / 2);
      const attractionTransitTime = [...itineraryTime?.attractionTransitTime];
      attractionTransitTime[lunch] -= 60;
      attractionTransitTime[lunchBreakStop] += 60;
      setItineraryTime({ ...itineraryTime, attractionTransitTime });
      return lunchBreakStop;
    }
    return -1;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isAddedToCart(itinerary?.id)) {
      updateCartItem(itinerary?.id, {
        price: getGuideFee(itinerary, includeTransport),
        transportIncluded: includeTransport ? true : false,
      });
    }
    if (
      includeTransport &&
      itinerary?.guideData &&
      (!itinerary?.guideData?.transportIncluded ||
        itinerary?.guideData?.transportIncluded === "false")
    ) {
      updateItineraryHandler({
        guideFee: 0,
        guide: false,
        guideData: false,
        primaryLanguage: "",
      });
    }
  }, [includeTransport]); // eslint-disable-line react-hooks/exhaustive-deps
  if (error)
    return (
      <ItineraryError
        t={t}
        itineraryAttractions={itinerary?.attractions}
        itineraryId={itinerary?.id || ""}
        userEmail={user?.email || ""}
        userId={user?.uid || ""}
      />
    );
  if (itineraryDoesNotExist)
    return (
      <ItineraryStyles>
        <Itinerary404 t={t} />
      </ItineraryStyles>
    );
  if (typeof navigator !== "undefined") {
    if (!navigator?.cookieEnabled && !hasItinerary(id))
      return <ItineraryEnableCookies t={t} />;
  }
  return (
    <div>
      <Head>
        <title>
          {itinerarySsr?.translatedName && user?.uid !== itinerarySsr?.createdBy
            ? itinerarySsr?.translatedName[language?.code]
            : itinerarySsr?.name}
        </title>
      </Head>
      <ItineraryResponsiveStyles>
        <ItineraryStyles>
          {!showGuideList &&
            user &&
            user?.guide !== "true" &&
            !itinerary?.status &&
            itinerary?.attractions?.length > 0 && (
              <ItineraryBook
                checkedGuides={checkedGuides}
                t={t}
                itinerary={itinerary}
                itineraryTime={itineraryTime}
                itineraryAttractions={itineraryAttractions}
                includeTransport={includeTransport}
                currency={currency}
                setShowGuideList={setShowGuideList}
              />
            )}
          <ItineraryAlert
            t={t}
            user={user as User}
            errors={errors}
            setErrors={setErrors}
            itinerary={itinerary}
            itineraryTime={itineraryTime}
            closedAttractions={closedAttractions}
            setShowErrorModal={setShowErrorModal}
            showErrorModal={showErrorModal}
            setUnpublished={setUnpublished}
            updateItineraryHandler={updateItineraryHandler}
          />
          <ItineraryHeader
            errors={errors}
            setPublished={setPublished}
            setUnpublished={setUnpublished}
            setSaved={setSaved}
            language={language}
            itinerary={itinerary}
            hasItinerary={hasItinerary}
            itineraryId={itinerary?.id}
            itineraryAttractions={itineraryAttractions}
            itineraryRatingScore={itinerary?.ratingScore}
            itineraryCommentsCounter={itinerary?.commentsCounter}
            itineraryRatingCounter={itinerary?.ratingCounter}
            itineraryCreatedBy={itinerary?.createdBy}
            itineraryName={itinerary?.name}
            itineraryLocale={itinerary?.locale}
            itineraryTranslatedName={itinerary?.translatedName}
            itineraryPublished={itinerary?.published}
            updateItineraryHandler={updateItineraryHandler}
            itineraryTime={itineraryTime}
            itineraryStatus={itinerary?.status}
            itineraryGuide={itinerary?.guide as string | undefined}
            itineraryViews={itinerary?.viewsCounter}
            itineraryUrl={itinerary?.url || ""}
            itineraryLikesCounter={itinerary?.likesCounter}
            user={user as User}
            t={t}
            photos={carouselPhotos}
            itineraryPhotos={itinerary?.photos}
            itineraryDescription={itinerary?.description}
            loadingPhotos={loadingPhotos}
          />
          {showModal && (
            <ItineraryModal
              showModal={showModal as string}
              setShowModal={setShowModal}
              itinerary={itinerary}
              updateItineraryHandler={updateItineraryHandler}
              attractionToDelete={attractionToDelete}
              setAttractionToDelete={setAttractionToDelete as any}
              setSelectedAttraction={setSelectedAttraction}
              selectedAttraction={selectedAttraction}
              t={t}
            />
          )}
          {/* //
        // Attractions list start
        // */}
          <div
            className={`itinerary-wrapper ${
              user?.guide === "true" ? "guide-wrapper" : "guide-wrapper"
            }`}
          >
            <div className="itinerary-attractions-wrapper">
              {user && itinerary?.attractions?.length > 0 && (
                <div className="itinerary-details">
                  <ItineraryDetails
                    checkedGuides={checkedGuides}
                    itineraryStatus={itinerary?.status}
                    itineraryId={itinerary?.id}
                    itinerary={itinerary}
                    itineraryTime={itineraryTime}
                    itineraryAttractions={itineraryAttractions}
                    itineraryGuideData={itinerary?.guideData}
                    itineraryLunch={itinerary?.lunch}
                    user={user}
                    t={t}
                    errors={errors}
                    setShowGuideList={setShowGuideList}
                    currency={currency}
                    language={language}
                    setPublished={setPublished}
                    setUnpublished={setUnpublished}
                    setSaved={setSaved}
                    updateItineraryHandler={updateItineraryHandler}
                    setShowErrorModal={setShowErrorModal}
                    hasItinerary={hasItinerary}
                    includeTransport={includeTransport}
                    setIncludeTransport={setIncludeTransport}
                  />
                </div>
              )}
              {itineraryAttractions?.length < 1 ? (
                <NoAttractions
                  language={language}
                  t={t}
                  itinerary={itinerary}
                  updateItineraryHandler={updateItineraryHandler}
                  loadingAttraction={loadingAttraction}
                  setLoadingAttraction={setLoadingAttraction}
                  itineraryAttractions={itineraryAttractions}
                  loadPhotos={loadPhotos}
                  setLoadingPhotos={setLoadingPhotos}
                  loadingPhotos={loadingPhotos}
                  user={user as User}
                />
              ) : (
                <div className="itinerary-main">
                  {itinerary?.status && (
                    <ItineraryStatus
                      t={t}
                      itineraryStatus={itinerary?.status}
                    />
                  )}
                  <div
                    className="itinerary-attractions-list"
                    id="itinerary-list"
                  >
                    <div className="itinerary-list-header">
                      {!itinerary?.status && (
                        <ItineraryCartWarning
                          t={t}
                          errors={errors}
                          itinerary={itinerary}
                          setShowErrorModal={setShowErrorModal}
                          hasItinerary={hasItinerary}
                          user={user as User}
                          setSaved={setSaved}
                        />
                      )}
                      <ItineraryTime
                        duration={itineraryTime?.duration}
                        transitTime={itineraryTime?.transitTime}
                        t={t}
                        language={language}
                        itineraryLunch={itinerary?.lunch}
                      />
                    </div>
                    <div className="itinerary-wrapper-2">
                      <h2 className="itinerary-titles">{t("itinerary")}</h2>
                      <button
                        className="see-tutorial"
                        onClick={() => {
                          setItem("tutorialWithAttraction", false);
                          setItem("tutorialWithoutAttraction", false);
                          setShowTutorial(true);
                        }}
                      >
                        {t("seeTutorial")}
                      </button>
                      {/* <ShowItineraryVideo /> */}
                      <ItineraryMeetingPlace
                        itinerary={itinerary}
                        itineraryAttractions={itineraryAttractions}
                        updateItineraryHandler={updateItineraryHandler}
                        t={t}
                        user={user as User}
                        selectedAttraction={selectedAttraction}
                        setSelectedAttraction={setSelectedAttraction}
                        setShowMap={setShowMap}
                      />
                      {(itinerary?.meetingPlace as Attraction)?._geoloc && (
                        <div>
                          <div
                          // style={{
                          //   filter: draggingRef?.current
                          //     ? "blur(2.5px)"
                          //     : "none",
                          // }}
                          >
                            <div className="transit-time-line"></div>
                            <div className="transit-time">
                              <div className="itinerary-attraction-transit-time">
                                <AttractionTravelMode
                                  itineraryCreatedBy={itinerary?.createdBy}
                                  user={user as User}
                                  index={0}
                                  itineraryTravelModes={itinerary?.travelModes}
                                  updateItineraryHandler={
                                    updateItineraryHandler
                                  }
                                  itineraryMeetingPlace={
                                    itinerary?.meetingPlace
                                  }
                                  meetingPlace={true}
                                  transitTime={
                                    itineraryTime?.attractionTransitTime[0]
                                  }
                                  lunchBreak={itinerary?.lunch}
                                  updateLunchBreak={updateLunchBreak}
                                  itineraryStatus={itinerary?.status}
                                  language={language}
                                  t={t}
                                  itineraryAttractions={itineraryAttractions}
                                  itineraryEndPlace={itinerary?.endPlace}
                                  fromMeetingPlace={true}
                                />
                              </div>
                            </div>
                            <div className="transit-time-line"></div>
                          </div>
                        </div>
                      )}
                      {itineraryAttractions && (
                        <>
                          {!itinerary?.status ? (
                            <AttractionsList
                              user={user as User}
                              itineraryTravelModes={itinerary?.travelModes}
                              itineraryCreatedBy={itinerary?.createdBy}
                              itineraryTime={itineraryTime}
                              setItineraryTime={setItineraryTime}
                              itineraryDate={itinerary?.date}
                              itineraryStatus={itinerary?.status}
                              itineraryId={itinerary?.id}
                              itineraryMeetingPlace={itinerary?.meetingPlace as Attraction}
                              itineraryEndPlace={itinerary?.endPlace as Attraction}
                              itineraryAttractions={itineraryAttractions}
                              closedAttractions={closedAttractions}
                              dragging={draggingRef as any}
                              language={language}
                              selectedAttraction={selectedAttraction}
                              setSelectedAttraction={setSelectedAttraction}
                              setShowModal={setShowModal}
                              setErrors={setErrors}
                              t={t}
                              updateItineraryHandler={updateItineraryHandler}
                              setAttractionToDelete={setAttractionToDelete}
                              lunchBreak={itinerary?.lunch}
                              updateLunchBreak={updateLunchBreak}
                              setShowMap={setShowMap}
                              showTutorial={showTutorial}
                              itineraryDurations={itinerary?.durations}
                              loadingPhotos={loadingPhotos}
                            />
                          ) : (
                            <FixedAttractions
                              user={user as User}
                              itineraryTime={itineraryTime}
                              itineraryDate={itinerary?.date}
                              itineraryStatus={itinerary?.status}
                              itineraryId={itinerary?.id}
                              itineraryMeetingPlace={itinerary?.meetingPlace}
                              itineraryTravelModes={itinerary?.travelModes}
                              itineraryAttractions={itineraryAttractions}
                              lunchBreak={itinerary?.lunch}
                              closedAttractions={closedAttractions}
                              language={language}
                              selectedAttraction={selectedAttraction}
                              setShowModal={setShowModal}
                              setErrors={setErrors}
                              setSelectedAttraction={setSelectedAttraction}
                              t={t}
                              setShowMap={setShowMap}
                              showTutorial={showTutorial}
                            />
                          )}

                          {!itinerary?.status && (
                            <AddAttraction
                              duration={
                                itineraryTime?.duration +
                                itineraryTime?.transitTime
                              }
                              user={user as User}
                              language={language}
                              t={t}
                              itineraryCompleteAttractions={
                                itineraryAttractions
                              }
                              itineraryAttractions={itinerary?.attractions}
                              itineraryTravelModes={itinerary?.travelModes}
                              itineraryDurations={itinerary?.durations}
                              itineraryId={itinerary?.id}
                              updateItineraryHandler={updateItineraryHandler}
                              setLoadingAttraction={setLoadingAttraction}
                              loadingAttraction={loadingAttraction}
                              loadPhotos={loadPhotos}
                              setLoadingPhotos={setLoadingPhotos}
                              loadingPhotos={loadingPhotos}
                              noAttractions={false}
                            />
                          )}
                          {itinerary?.endPlace && (
                            <div
                            // style={{
                            //   filter: draggingRef?.current
                            //     ? "blur(2.5px)"
                            //     : "none",
                            // }}
                            >
                              <p className="transit-time-line"></p>
                              <div className="transit-time">
                                <div className="itinerary-attraction-transit-time">
                                  <AttractionTravelMode
                                    itineraryCreatedBy={itinerary?.createdBy}
                                    user={user as User}
                                    index={itineraryAttractions?.length - 1}
                                    itineraryTravelModes={
                                      itinerary?.travelModes
                                    }
                                    updateItineraryHandler={
                                      updateItineraryHandler
                                    }
                                    itineraryMeetingPlace={
                                      itinerary?.meetingPlace
                                    }
                                    fromEndPlace={true}
                                    transitTime={
                                      itineraryTime?.attractionTransitTime[
                                        itineraryTime?.attractionTransitTime
                                          ?.length - 1
                                      ]
                                    }
                                    lunchBreak={itinerary?.lunch}
                                    updateLunchBreak={updateLunchBreak}
                                    itineraryStatus={itinerary?.status}
                                    t={t}
                                    language={language}
                                    itineraryAttractions={itineraryAttractions}
                                    itineraryEndPlace={itinerary?.endPlace}
                                  />
                                </div>
                                <p className="transit-time-line"></p>
                              </div>
                            </div>
                          )}
                          <ItineraryEndPlace
                            itinerary={itinerary as unknown as ItineraryType}
                            updateItineraryHandler={updateItineraryHandler}
                            arrivalDepartureTime={itineraryTime?.arrivalDepartureTime}
                            t={t}
                            user={user as User}
                            index={itineraryAttractions?.length}
                            selectedAttraction={selectedAttraction}
                            setSelectedAttraction={setSelectedAttraction}
                            setShowMap={setShowMap}
                            itineraryAttractions={itineraryAttractions}
                            dragging={draggingRef as any}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="itinerary-options">
                    {user?.guide === "true" && !itinerary?.status && (
                      <ItineraryDescription
                        updateItineraryHandler={updateItineraryHandler}
                        itinerary={itinerary as unknown as ItineraryType}
                        itineraryNotes={itinerary?.description}
                        itineraryTranslatedNotes={itinerary?.translatedDescription as Record<string, string>}
                        user={user as User}
                        language={language}
                        t={t}
                        hasItinerary={hasItinerary}
                      />
                    )}
                    {(user?.guide !== "true" || itinerary?.status) && (
                      <ItineraryNotes
                        updateItineraryHandler={updateItineraryHandler}
                        itinerary={itinerary as unknown as ItineraryType}
                        itineraryNotes={itinerary?.notes || ""}
                        user={user as User}
                        language={language}
                        t={t}
                        hasItinerary={hasItinerary}
                      />
                    )}
                    {!itinerary?.status && itineraryAttractions?.length > 0 && (
                      <SuggestedAttractions
                        language={language}
                        itineraryAttractions={itineraryAttractions}
                        t={t}
                      />
                    )}
                    {!itinerary?.status &&
                      itineraryAttractions?.length > 0 &&
                      user?.guide !== "true" && (
                        <SuggestedItineraries
                          language={language}
                          itineraryAttractions={itineraryAttractions}
                          t={t}
                          itineraryId={itinerary?.id}
                        />
                      )}
                    <ItineraryPolicies
                      t={t}
                      itinerary={itinerary}
                      language={language}
                      user={user as User}
                      itineraryAttractions={itineraryAttractions}
                    />
                    {(user?.uid === itinerary?.createdBy ||
                      hasItinerary(itinerary?.id)) &&
                      !itinerary?.status && (
                        <LazyRemoveItineraryButton
                          setShowModal={setShowModal}
                          t={t}
                        />
                      )}
                  </div>
                </div>
              )}
            </div>
            {/* //
        // Attraction list End
        // */}
            <MapWrapper
              itineraryAttractionsList={itinerary?.attractions}
              itineraryAttractions={itineraryAttractions}
              itineraryMeetingPlace={itinerary?.meetingPlace as Attraction}
              itineraryEndPlace={itinerary?.endPlace as Attraction}
              itineraryTravelModes={itinerary?.travelModes}
              itineraryStartTime={itinerary?.startTime}
              itineraryTime={itineraryTime}
              itineraryLunchBreak={itinerary?.lunch}
              itineraryDate={itinerary?.date}
              itineraryDurations={itinerary?.durations}
              setItineraryTime={setItineraryTime}
              setSelectedAttraction={setSelectedAttraction}
              selectedAttraction={selectedAttraction}
              setLoading={setLoading}
              showMap={showMap}
              setMap={setMap}
              map={map}
              t={t}
              language={language}
              updateItineraryHandler={updateItineraryHandler}
              setShowMap={setShowMap}
            />
          </div>
          <GoogleMapButton
            setShowMap={setShowMap}
            showMap={showMap}
            getItem={getItem}
            setItem={setItem}
          />{" "}
          {!itinerary?.status && itineraryAttractions?.length > 0 && (
            <ItineraryPublished
              published={published}
              t={t}
              state={itineraryAttractions[0]?.state || ""}
              translatedState={
                itineraryAttractions[0]?.translatedState
                  ? (itineraryAttractions[0]?.translatedState as Record<string, string>)[itinerarySsr?.locale || "en"]
                  : (itineraryAttractions[0]?.state || "")
              }
            />
          )}
          {!itinerary?.status && itineraryAttractions?.length > 0 && (
            <ItineraryUnpublished
              unpublished={unpublished}
              t={t}
              state={itineraryAttractions[0]?.state || ""}
              translatedState={
                itineraryAttractions[0]?.translatedState
                  ? (itineraryAttractions[0]?.translatedState as Record<string, string>)[itinerarySsr?.locale || "en"]
                  : (itineraryAttractions[0]?.state || "")
              }
            />
          )}
          <ItinerarySaved saved={saved} t={t} />
          {!loading &&
            !getItem("firstItineraryVisit") &&
            itinerary?.attractions?.length > 0 &&
            !showTutorial &&
            !fromLink && (
              <FirstSteps
                user={user as User}
                t={t}
                partialSteps={partialSteps}
              />
            )}
          {(!user?.guide || user?.guide !== "true") && showGuideList && (
            <ItineraryGuides
              itineraryGuideData={itinerary?.guideData}
              itineraryAttractions={itineraryAttractions}
              itineraryDate={itinerary?.date}
              itineraryId={itinerary?.id}
              itinerary={itinerary as unknown as ItineraryType}
              itineraryStatus={itinerary?.status}
              updateItineraryHandler={updateItineraryHandler}
              itineraryCreatedBy={itinerary?.createdBy}
              user={user as User}
              t={t}
              showGuideList={showGuideList}
              setShowGuideList={setShowGuideList}
              itineraryTime={itineraryTime}
              currency={currency}
              includeTransport={includeTransport}
              setIncludeTransport={setIncludeTransport}
            />
          )}
        </ItineraryStyles>
      </ItineraryResponsiveStyles>
      {showTutorial &&
        itineraryAttractions?.length > 0 &&
        !fromLink &&
        !itinerary?.status && (
          <ItineraryTutorial
            t={t}
            travelModeLength={itinerary?.travelModes?.length}
            attractionsLength={itinerary?.attractions?.length}
            setShowTutorial={setShowTutorial}
            loading={loading}
            loadingAttraction={loadingAttraction}
            user={user as User}
            lunchBreak={itinerary?.lunch}
          />
        )}
    </div>
  );
};
export default Itinerary;
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
