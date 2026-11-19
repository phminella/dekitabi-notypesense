// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import { SearchAttractionsResultsStyles } from "./styles/SearchAttractionsResultsStyles";
import dottie from "dottie";
import AttractionImage from "../../S/Attractions/AttractionImage";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
  setDoc,
  doc,
  getDoc,
  getFirestore,
  deleteDoc,
} from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { extractPlaceResult, getPlaceLatLng } from "../../../lib/googlePlaceUtils";
import { User, LanguageOption } from "../../../types/user";

interface SearchAttractionsResultsProps {
  attractions: any[];
  language: LanguageOption;
  loading: boolean;
  updateItineraryHandler: (data: any) => Promise<any>;
  itineraryAttractions: string[];
  itineraryTravelModes: string[];
  itineraryDurations: number[];
  itineraryId: string;
  setSearchInput: (input: string) => void;
  setLoadingAttraction: (loading: boolean) => void;
  t: (key: string, options?: any) => string;
  prefecture: any;
  initSearch: (more?: boolean) => void;
  setAdding: (adding: boolean) => void;
  user: User;
  setError: (error: any) => void;
  error: any;
  closeModal: () => void;
  loadPhotos: (index: number, attractionName: string) => Promise<void>;
  setLoadingPhotos: (photos: string[]) => void;
  loadingPhotos: string[];
}

const SearchAttractionsResults = ({
  attractions,
  language,
  loading,
  updateItineraryHandler,
  itineraryAttractions,
  itineraryTravelModes,
  itineraryDurations,
  itineraryId,
  setSearchInput,
  setLoadingAttraction,
  t,
  prefecture,
  initSearch,
  setAdding,
  user,
  setError,
  error,
  closeModal,
  loadPhotos,
  setLoadingPhotos,
  loadingPhotos,
}: SearchAttractionsResultsProps) => {
  const functions = getFunctions(undefined, "asia-northeast1");
  const getAttraction = httpsCallable(functions, "getAttraction");
  const sendEmail = httpsCallable(functions, "sendEmail");
  const fetchGoogleImage = httpsCallable(functions, "fetchGoogleImage");

  const addAttraction = (attraction: any) => {
    if (itineraryAttractions?.length === 0) {
      setLoadingAttraction(true);
    }
    let tempDurations = [0];
    if (itineraryDurations?.length > 0) {
      tempDurations = [...itineraryDurations, 0];
    }
    
    const attractionUrl = attraction?.document?.url
      ? attraction.document.url.split("-").join(" ")
      : attraction;

    updateItineraryHandler({
      attractions: [...itineraryAttractions, attractionUrl],
      durations: tempDurations,
      ...(itineraryAttractions?.length > 0 && {
        travelModes: [...itineraryTravelModes, "TRANSIT"],
      }),
    }).then(() => {
      if (itineraryAttractions?.length > 0) {
        closeModal();
      }
    });
  };

  const addAttractionFromGoogle = async (placeId: string, name: string, desc: string) => {
    setAdding(true);
    setSearchInput("");
    try {
      const response: any = await getAttraction({ placeId, language: "en" });
      const data = extractPlaceResult(response);
      if (!data?.name) {
        setAdding(false);
        setSearchInput("");
        setError(true);
        return;
      }
      
      const containsJapanese = data.name.match(
        /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
      );
      
      const attractionName = !containsJapanese
        ? data.name
            .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s\s+/g, " ")
            .toLowerCase()
            .trim()
        : name;
        
      const attractionUrl = attractionName.split(" ").join("-");
      let tempLoadingPhotos = [...loadingPhotos];
      if ((data.photos?.length ?? 0) > 0) {
        tempLoadingPhotos = [...loadingPhotos, attractionUrl];
      }
      setLoadingPhotos(tempLoadingPhotos);
      
      const attractionToAdd = await getDoc(
        doc(getFirestore(), "attractions", attractionName)
      );
      
      if (attractionToAdd?.exists()) {
        tempLoadingPhotos = tempLoadingPhotos.filter((e) => e !== attractionUrl);
        setLoadingPhotos(tempLoadingPhotos);
        addAttraction(attractionName);
      } else {
        const states: Record<string, string> = {
          東京都tokyo: `東京都`,
          京都府kyoto: `京都府`,
          大阪府osaka: `大阪府`,
          奈良県nara: `奈良県`,
          愛知県aichi: `愛知県`,
          秋田県akita: `秋田県`,
          青森県aomori: `青森県`,
          千葉県chiba: `千葉県`,
          愛媛県ehime: `愛媛県`,
          福井県fukui: `福井県`,
          福岡県fukuoka: `福岡県`,
          福島県fukushima: `福島県`,
          岐阜県gifu: `岐阜県`,
          群馬県gunma: `群馬県`,
          広島県hiroshima: `広島県`,
          北海道hokkaido: `北海道`,
          兵庫県hyogo: `兵庫県`,
          茨城県ibaraki: `茨城県`,
          石川県ishikawa: `石川県`,
          岩手県iwate: `岩手県`,
          香川県kagawa: `香川県`,
          鹿児島県kagoshima: `鹿児島県`,
          神奈川県kanagawa: `神奈川県`,
          高知県kochi: `高知県`,
          熊本県kumamoto: `熊本県`,
          三重県mie: `三重県`,
          宮城県miyagi: `宮城県`,
          宮崎県miyazaki: `宮崎県`,
          長野県nagano: `長野県`,
          長崎県nagasaki: `長崎県`,
          新潟県niigata: `新潟県`,
          大分県ota: `大分県`,
          岡山県okayama: `岡山県`,
          沖縄県okinawa: `沖縄県`,
          佐賀県saga: `佐賀県`,
          埼玉県saitama: `埼玉県`,
          滋賀県shiga: `滋賀県`,
          島根県shimane: `島根県`,
          静岡県shizuoka: `静岡県`,
          栃木県tochigi: `栃木県`,
          徳島県tokushima: `徳島県`,
          鳥取県tottori: `鳥取県`,
          富山県toyama: `富山県`,
          和歌山県wakayama: `和歌山県`,
          山形県yamagata: `山形県`,
          山口県yamaguchi: `山口県`,
          山梨県yamanashi: `山梨県`,
        };
        
        let state = "";
        for (let i = 0; i < (data.address_components?.length ?? 0); i++) {
          const comp = data.address_components![i];
          const stateToAdd = Object.keys(states).filter((key) =>
            key.includes(comp.long_name.toLowerCase())
          );
          if (stateToAdd.length > 0) {
            state = states[stateToAdd[0]];
            break;
          }
        }
        
        const uploadFile = async (photo: any, index: number, lastPhoto: boolean) => {
          const storage = getStorage();
          try {
            const res: any = await fetchGoogleImage({
              photo: photo?.photo_reference,
              fileRef: `/attractions/${attractionUrl}/${index}.jpg`,
            });
            const binaryData = window.atob(res?.data?.image);
            const byteNumbers = new Array(binaryData.length);
            for (let i = 0; i < binaryData.length; i++) {
              byteNumbers[i] = binaryData.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const storageRef = ref(storage, `/attractions/${attractionUrl}/${index}.jpg`);

            await uploadBytes(storageRef, byteArray, { contentType: "image/jpeg" });

            if (lastPhoto) {
              await loadPhotos(index, attractionName);
            }
          } catch (error) {
            console.error("Upload error:", error);
            tempLoadingPhotos = tempLoadingPhotos.filter((e) => e !== attractionUrl);
            setLoadingPhotos(tempLoadingPhotos);
            setError(true);
            setLoadingAttraction(false);
            setAdding(false);
            setSearchInput("");

            try {
              await deleteDoc(doc(getFirestore(), "attractions", attractionName));
            } catch (err) {
              console.error(err);
            }
          }
        };
        
        let photosLength = 3;
        if ((data.photos?.length ?? 0) < 3) {
          photosLength = data.photos ? data.photos.length : 0;
        }
        
        for (let i = 0; i < photosLength; i++) {
          uploadFile(data.photos![i], i + 1, i + 1 === photosLength);
        }
        
        const getClosedDays = (openingHours: any[]) => {
          const weekdaysNumber = [0, 1, 2, 3, 4, 5, 6];
          const openingDays = openingHours.map(p => p.close?.day);
          return weekdaysNumber.filter(d => !openingDays.includes(d));
        };
        
        let closedDaysWeekday: string[] = [];
        if ((data.opening_hours?.periods?.length ?? 0) > 2) {
          const tempClosedDays = getClosedDays(data.opening_hours!.periods!);
          const weekdays = [
            "Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays",
          ];
          tempClosedDays.forEach((closedDay) => closedDaysWeekday.push(weekdays[closedDay]));
        }
        
        if (!state) {
          tempLoadingPhotos = tempLoadingPhotos.filter((e) => e !== attractionUrl);
          setLoadingPhotos(tempLoadingPhotos);
          setLoadingAttraction(false);
          setAdding(false);
          setSearchInput("");
          setError(true);
          return;
        } else {
          const coordinates = getPlaceLatLng(data);
          if (!coordinates) {
            tempLoadingPhotos = tempLoadingPhotos.filter((e) => e !== attractionUrl);
            setLoadingPhotos(tempLoadingPhotos);
            setLoadingAttraction(false);
            setAdding(false);
            setSearchInput("");
            setError(true);
            return;
          }

          const tempInputs = {
            ratingCounter: data.user_ratings_total || 0,
            tempDescription: data.editorial_summary?.overview || "",
            _geoloc: coordinates,
            name: attractionName,
            tempArea: (data.address_components?.length ?? 0) >= 5 ? data.address_components![data.address_components!.length - 5].long_name : "",
            tempCity: (data.address_components?.length ?? 0) >= 4 ? data.address_components![data.address_components!.length - 4].long_name : "",
            state,
            phoneNumber: data.international_phone_number || "",
            openingPeriods: data.opening_hours ? data.opening_hours.periods : "",
            closedDays: closedDaysWeekday.join(", ") || "",
            photosCounter: photosLength,
            mapUrl: data.url || "",
            website: data.website || "",
            rating: data.rating || 0,
            address: data.formatted_address,
            reviews: [],
            openingHours: data.opening_hours ? data.opening_hours.weekday_text : "",
            tags: [],
            hide: "true",
            url: attractionUrl,
            duration: 30,
          };
          
          await setDoc(doc(getFirestore(), "attractions", attractionName), tempInputs);
          addAttraction(attractionName);
          
          await sendEmail({
            to: "contact@dekitabi.com",
            sender: "contact@dekitabi.com",
            subject: `dekitabi | New attraction (${tempInputs.name})`,
            body: `${user?.uid ? `lastname: ${user.lastname} firstname: ${user.firstname}` : ""} email: ${user?.email || ""}, attraction: ${tempInputs.name}, language: ${language?.code}, itinerary: https://www.dekitabi.com/itinerary/${itineraryId}`,
          });
        }
      }
    } catch (err) {
      console.error("Google extraction error:", err);
      setAdding(false);
      setSearchInput("");
      setError(true);
    }
  };

  return (
    <SearchAttractionsResultsStyles>
      {!loading && prefecture?.link && prefecture?.prefecture && (
        <Link
          href={prefecture.link}
          target="_blank"
          className="prefecture more"
          prefetch={false}
        >
          <Image src="/img/icon-open.svg" height={25} width={25} alt="marker" />
          {t("searchAttractionPlaceholder", { city: prefecture.prefecture })}
        </Link>
      )}
      {loading && (
        <ul>
          {[...Array(5)].map((_, i) => (
            <li key={i}>
              <Skeleton variant="rounded" width={"100%"} height={45} />
            </li>
          ))}
        </ul>
      )}
      {attractions?.length > 0 && !loading && (
        <ul>
          {attractions.map((attraction, i) => (
            <li key={i}>
              {attraction?.document ? (
                <button onClick={() => addAttraction(attraction)}>
                  <div className="attraction-image-wrapper">
                    <AttractionImage
                      attraction={attraction.document.url}
                      size={300}
                      sizes={"45px"}
                      priority={false}
                    />
                  </div>
                  <div className="attraction-content">
                    <p>
                      {dottie.transform(attraction.document).translatedName
                        ? dottie.transform(attraction.document).translatedName[language?.code || "en"]
                        : dottie.transform(attraction.document).name}
                    </p>
                    <p className="attraction-state">
                      {dottie.transform(attraction.document).translatedState
                        ? dottie.transform(attraction.document).translatedState[language?.code || "en"]
                        : dottie.transform(attraction.document).state}
                    </p>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => {
                    const descParts = attraction.description.split(",");
                    addAttractionFromGoogle(
                      attraction.placeId,
                      attraction.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s\s+/g, " ").toLowerCase().trim(),
                      descParts.slice(1).join(",")
                    );
                  }}
                >
                  <div className="attraction-image-wrapper attraction-image-wrapper-google">
                    <Image alt="map-pin" width={21} height={21} src={`/img/icon-marker.svg`} />
                  </div>
                  <div className="attraction-content">
                    <p>{attraction.name}</p>
                    <p className="attraction-state">
                      {attraction.description.split(",").slice(1).join(",")}
                    </p>
                  </div>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {!loading && (
        <>
          {attractions?.length === 0 ? (
            <div className="no-attractions">{t("noAttractionsFound")}</div>
          ) : (
            <>
              {attractions?.[0]?.document && (
                <button className="more" onClick={() => initSearch(true)}>
                  {t("showMore")}
                </button>
              )}
            </>
          )}
        </>
      )}
    </SearchAttractionsResultsStyles>
  );
};
export default React.memo(SearchAttractionsResults);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
