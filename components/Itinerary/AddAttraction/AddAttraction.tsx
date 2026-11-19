// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import React, { useEffect, useState, useCallback } from "react";
import { AddAttractionStyles } from "./styles/AddAttractionStyles";
import Image from "next/image";
import Search from "../../Search/Search";
import SearchAttractions from "./SearchAttractions";
import BasicModal from "../../UI/BasicModal";
import useItinerary from "../../../lib/useItinerary";
import useLocalStorage from "../../../lib/useLocalStorage";
import { useRouter } from "next/router";
import { User, LanguageOption } from "../../../types/user";
import { Attraction } from "../../../types/attraction";

interface AddAttractionProps {
  language: LanguageOption;
  t: (key: string) => string;
  user: User;
  updateItineraryHandler: (data: any) => Promise<any>;
  itineraryAttractions: string[];
  itineraryTravelModes: any[];
  itineraryDurations: number[];
  loadingAttraction: boolean;
  itineraryCompleteAttractions: Attraction[];
  setLoadingAttraction: (loading: boolean) => void;
  itineraryId: string;
  noAttractions: boolean;
  duration: number;
  loadPhotos: (index: number, attractionUrl: string) => Promise<void>;
  setLoadingPhotos: React.Dispatch<React.SetStateAction<string[]>>;
  loadingPhotos: string[];
}

const AddAttraction = ({
  language,
  t,
  user,
  updateItineraryHandler,
  itineraryAttractions,
  itineraryTravelModes,
  itineraryDurations,
  loadingAttraction,
  itineraryCompleteAttractions,
  setLoadingAttraction,
  itineraryId,
  noAttractions,
  duration,
  loadPhotos,
  setLoadingPhotos,
  loadingPhotos,
}: AddAttractionProps) => {
  const { newItinerary } = useItinerary();
  const { getItem } = useLocalStorage();
  const router = useRouter();

  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);
  const [hideNewItinerary, setHideNewItinerary] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const closeModal = useCallback(() => {
    setAdding(false);
    setLoadingAttraction(false);
    setShowModal(false);
  }, [setLoadingAttraction]);

  useEffect(() => {
    if (loadingAttraction && itineraryCompleteAttractions?.length === 1) {
      if (getItem("tutorialWithAttraction") && typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
      closeModal();
    }
  }, [loadingAttraction, itineraryCompleteAttractions, getItem, closeModal]);

  const handleNewItinerary = useCallback(() => {
    newItinerary().then((data: string) => {
      router.push("/itinerary/" + data);
    });
  }, [newItinerary, router]);

  const getRomajiHint = () => {
    const code = language?.code;
    const hints: Record<string, string> = {
      ja: "（ローマ字）",
      "zh-CN": "（罗马字）",
      "zh-TW": "（羅馬字）",
      ko: "（로마자）",
      th: "（โรมาจิ）",
    };
    return hints[code || "en"] || "";
  };

  if ((hideNewItinerary || duration < 1) && !loadingAttraction) return null;

  return (
    <AddAttractionStyles className={`add-attraction ${noAttractions ? "no-attractions" : ""}`}>
      {loadingAttraction && (
        <div className="loading">
          <div className="wrapper">
            <Image
              width={100}
              height={100}
              alt="spinner"
              src="/img/icon-spinner.svg"
            />
          </div>
        </div>
      )}

      <p className="transit-time-line"></p>
      <button className="close-icon-2" onClick={() => setHideNewItinerary(true)}>
        <Image src="/img/icon-close.svg" height={20} width={20} alt="close" />
      </button>

      {duration > 720 ? (
        <div className="search-attraction-button new-itinerary">
          <div className="icon-wrapper">
            <Image height={48} width={48} src="/img/icon-itinerary2.svg" alt="plus" className="pin-plus" />
          </div>
          <div className="text-wrapper">
            <p className="itinerary-titles">{t("newDay")}</p>
            <button className="normal-button" onClick={handleNewItinerary}>
              <Image height={10} width={10} src="/img/icon-plus.svg" alt="new-itinerary" />
              {t("newItinerary")}
            </button>
          </div>
        </div>
      ) : (
        <>
          <button className="search-attraction-button" onClick={() => setShowModal(true)}>
            <div className="icon-wrapper">
              <Image height={48} width={48} src="/img/icon-map-pin2.svg" alt="plus" className="pin-plus" />
            </div>
            <p className="itinerary-titles">{t("addAttraction")}</p>
          </button>

          <BasicModal showModal={showModal} setShowModal={closeModal}>
            <div className="add-attraction-wrapper">
              {adding && (
                <div className="adding">
                  <div>
                    <Image src="/img/icon-spinner.svg" alt="spinner" height={80} width={80} />
                    <p>{t("pleaseWait")}</p>
                    <p className="sub-text">{t("mayTakeSeconds")}</p>
                  </div>
                </div>
              )}

              <div className="add-attraction-title">
                <div className="icon-wrapper">
                  <Image height={50} width={50} src="/img/icon-map-pin2.svg" alt="plus" className="pin-plus" />
                </div>
                {t("addAttraction")}
              </div>

              <div className="search-attraction-wrapper">
                <div className="search-attraction">
                  <p className="sub-title">
                    {t("searchAttractions")} {getRomajiHint()}
                  </p>
                  <SearchAttractions
                    t={t}
                    language={language}
                    updateItineraryHandler={updateItineraryHandler}
                    itineraryAttractions={itineraryAttractions}
                    itineraryTravelModes={itineraryTravelModes}
                    itineraryId={itineraryId}
                    setLoadingAttraction={setLoadingAttraction}
                    itineraryCompleteAttractions={itineraryCompleteAttractions}
                    itineraryDurations={itineraryDurations}
                    setShowModal={setShowModal}
                    setAdding={setAdding}
                    user={user}
                    error={error}
                    setError={setError}
                    closeModal={closeModal}
                    loadPhotos={loadPhotos}
                    setLoadingPhotos={setLoadingPhotos}
                    loadingPhotos={loadingPhotos}
                  />
                </div>

                <div className="search-destination-wrapper">
                  <p className="sub-title">{t("addAttraction3")}</p>
                  <Search
                    t={t}
                    language={language}
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                  />
                </div>
              </div>
            </div>
          </BasicModal>
        </>
      )}
    </AddAttractionStyles>
  );
};

export default React.memo(AddAttraction);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
