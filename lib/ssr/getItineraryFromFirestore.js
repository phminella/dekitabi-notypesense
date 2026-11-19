import dayjs from "dayjs";
const getItineraryFromFirestore = async (id, locale) => {
  let dbLocale =
    locale === "default"
      ? "en"
      : locale === "zh_cn"
      ? "zh-CN"
      : locale === "zh_tw"
      ? "zh-TW"
      : locale === "tl"
      ? "fil"
      : locale;
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const { firestoreAdmin } = await import("../firebase/firebaseAdmin");
  const itinerarySnap = await firestoreAdmin.doc(`itineraries/${id}`).get();
  const convertItinerary = async (originalData) => {
    let data = { ...originalData };
    const totalPoints = [
      data.meetingPlace,
      ...data.attractions,
      data.endPlace,
    ].filter(Boolean);

    const expectedTravelModesLength = totalPoints.length - 1;

    const fixTravelModes = () => {
      let tempTravelModes = [];
      for (let i = 0; i < expectedTravelModesLength; i++) {
        tempTravelModes.push(
          data?.travelModes?.[i] ?? { type: "TRANSIT", time: 0 }
        );
      }
      return tempTravelModes;
    };
    data.travelModes = fixTravelModes();
    const durations = data.durations ?? [];
    if (durations.length !== data?.attractions?.length) {
      data.durations = data.attractions.map((_, i) => {
        const duration = durations[i];
        return typeof duration === "number" && duration >= 0 ? duration : 0;
      });
    }
    let itinerary = {
      ...data,
      ...(new Date(data?.date) < today?.setDate(new Date().getDate() + 1) && {
        date: dayjs().add(1, "days").format("MM/DD/YYYY"),
      }),
    };
    let tempItineraryAttractions = [];
    let itineraryAttractions = await Promise.all(
      itinerary.attractions.map(async (attraction, i) => {
        const attractionSnap = await firestoreAdmin
          .doc(`attractions/${attraction}`)
          .get();
        if (attractionSnap.exists) {
          tempItineraryAttractions.push(attraction);
          let tempAttraction = {
            ...attractionSnap.data(),
            ...(attractionSnap.data()?.translatedArea?.en && {
              translatedArea: {
                [dbLocale]: attractionSnap.data().translatedArea[dbLocale],
              },
            }),
            ...(attractionSnap.data()?.translatedCity?.en && {
              translatedCity: {
                [dbLocale]: attractionSnap.data().translatedCity[dbLocale],
              },
            }),
            ...(attractionSnap.data()?.translatedName?.en && {
              name: attractionSnap.data().translatedName[dbLocale],
            }),
            ...(attractionSnap.data()?.translatedState &&
              attractionSnap.data()?.translatedState?.en && {
                translatedState: {
                  ["en"]: attractionSnap.data().translatedState["en"],
                  ["ja"]: attractionSnap.data().translatedState["ja"],
                  ...(dbLocale !== "en" &&
                    dbLocale !== "ja" && {
                      [dbLocale]:
                        attractionSnap.data().translatedState[dbLocale],
                    }),
                },
              }),
          };
          delete tempAttraction.addedCounter;
          delete tempAttraction.address;
          delete tempAttraction.country;
          delete tempAttraction.description;
          delete tempAttraction.phoneNumber;
          delete tempAttraction.photos;
          delete tempAttraction.rating;
          delete tempAttraction.ratingCounter;
          delete tempAttraction.reviews;
          delete tempAttraction.translatedDescription;
          delete tempAttraction.website;
          return tempAttraction;
        } else {
          itinerary?.durations?.pop();
          itinerary?.travelModes?.pop();
        }
      })
    );
    itineraryAttractions = itineraryAttractions.filter(function (element) {
      return element !== undefined;
    });
    let itineraryPhotos = [];
    for (let x = 0; x < itineraryAttractions?.length; x++) {
      let photosLength = 4;
      if (itineraryAttractions?.photosCounter < 3) {
        photosLength = photosCounter + 1;
      }
      for (let i = 1; i < photosLength; i++) {
        itineraryPhotos?.push({
          attraction: itineraryAttractions[x]?.url,
          index: i,
        });
        if (i === 3) {
          break;
        }
      }
    }
    let tempItinerary = {
      ...itinerary,
      attractions: itinerary?.attractions.filter(function (item) {
        if (tempItineraryAttractions.indexOf(item) !== -1) return item;
      }),
      itineraryAttractions,
      itineraryPhotos,
      ...(itinerary.translatedName && {
        translatedName: {
          [dbLocale]: itinerary.translatedName[dbLocale],
        },
      }),
      ...(itinerary.translatedDescription && {
        translatedDescription: {
          [dbLocale]: itinerary.translatedDescription[dbLocale],
        },
      }),
      ...(itinerary.meetingPlace?.name && {
        meetingPlace: {
          ...itinerary?.meetingPlace,
          translatedName: {
            [dbLocale]: itinerary?.meetingPlace?.translatedName
              ? itinerary?.meetingPlace?.translatedName[dbLocale]
              : itinerary?.meetingPlace?.name,
          },
        },
      }),
      ...(itinerary.endPlace?.name && {
        endPlace: {
          ...itinerary?.endPlace,
          translatedName: {
            [dbLocale]: itinerary.endPlace?.translatedName
              ? itinerary.endPlace?.translatedName[dbLocale]
              : itinerary.endPlace?.name,
          },
        },
      }),
      locale: dbLocale,
    };
    return tempItinerary;
  };
  if (itinerarySnap?.data()?.id) {
    const tempItinerary = await convertItinerary(itinerarySnap?.data());
    return tempItinerary;
  } else {
    const getItineraryFromDb = async (querySnapshot) => {
      let tempItinerary = [];
      querySnapshot.forEach(async (doc) => {
        let itinerary = doc.data();
        tempItinerary.push({
          ...itinerary,
        });
      });
      return tempItinerary;
    };
    const itinerariesRef = firestoreAdmin.collection("itineraries");
    const q = await itinerariesRef.where("url", "==", id).get();
    const itineraries = await getItineraryFromDb(q);
    if (itineraries?.length > 0) {
      const tempItinerary = await convertItinerary(itineraries[0]);
      console.log(tempItinerary);
      return tempItinerary;
    } else {
      return "not-found";
    }
  }
};
export default getItineraryFromFirestore;
