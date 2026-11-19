// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import React, { useState, useEffect, useRef, useMemo } from "react";
import { SearchAttractionsStyles } from "./styles/SearchAttractionsStyles";
import SearchAttractionsResults from "./SearchAttractionsResults";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAutocompletePredictions } from "../../../lib/googlePlaceUtils";
import { User, LanguageOption } from "../../../types/user";
import { Attraction } from "../../../types/attraction";
import { createLocalSearchClient } from "../../../lib/search/client";

const STATES: Record<string, string> = {
  東京都tokyo: `Tokyo`,
  京都府kyoto: `Kyoto`,
  大阪府osaka: `Osaka`,
  奈良県nara: `Nara`,
  愛知県aichi: `Aichi`,
  秋田県akita: `Akita`,
  青森県aomori: `Aomori`,
  千葉県chiba: `Chiba`,
  愛媛県ehime: `Ehime`,
  福井県fukui: `Fukui`,
  福岡県fukuoka: `Fukuoka`,
  福島県fukushima: `Fukushima`,
  岐阜県gifu: `Gifu`,
  群馬県gunma: `Gunma`,
  広島県hiroshima: `Hiroshima`,
  北海道hokkaido: `Hokkaido`,
  兵庫県hyogo: `Hyogo`,
  茨城県ibaraki: `Ibaraki`,
  石川県ishikawa: `Ishikawa`,
  岩手県iwate: `Iwate`,
  香川県kagawa: `Kagawa`,
  鹿児島県kagoshima: `Kagoshima`,
  神奈川県kanagawa: `Kanagawa`,
  高知県kochi: `Kochi`,
  熊本県kumamoto: `Kumamoto`,
  三重県mie: `Mie`,
  宮城県miyagi: `Miyagi`,
  宮崎県miyazaki: `Miyazaki`,
  長野県nagano: `Nagano`,
  長崎県nagasaki: `Nagasaki`,
  新潟県niigata: `Niigata`,
  大分県ota: `Oita`,
  岡山県okayama: `Okayama`,
  沖縄県okinawa: `Okinawa`,
  佐賀県saga: `Saga`,
  埼玉県saitama: `Saitama`,
  滋賀県shiga: `Shiga`,
  島根県shimane: `Shimane`,
  静岡県shizuoka: `Shizuoka`,
  栃木県tochigi: `Tochigi`,
  徳島県tokushima: `Tokushima`,
  鳥取県tottori: `Tottori`,
  富山県toyama: `Toyama`,
  和歌山県wakayama: `Wakayama`,
  山形県yamagata: `Yamagata`,
  山口県yamaguchi: `Yamaguchi`,
  山梨県yamanashi: `Yamanashi`,
};

const LINKS = Object.keys(STATES).reduce((acc: Record<string, string>, key) => {
  const city = STATES[key].replace(/\s+/g, "-");
  acc[key] = `/s/${city}-City`;
  return acc;
}, {});

interface SearchAttractionsProps {
  language: LanguageOption;
  t: (key: string, options?: any) => string;
  user: User;
  updateItineraryHandler: (data: any) => Promise<any>;
  itineraryAttractions: string[];
  itineraryDurations: number[];
  itineraryId: string;
  itineraryCompleteAttractions: Attraction[];
  itineraryTravelModes: string[];
  setLoadingAttraction: (loading: boolean) => void;
  setShowModal: (show: boolean) => void;
  setAdding: (adding: boolean) => void;
  error: any;
  setError: (error: any) => void;
  closeModal: () => void;
  loadPhotos: (index: number, attractionUrl: string) => Promise<void>;
  setLoadingPhotos: React.Dispatch<React.SetStateAction<string[]>>;
  loadingPhotos: string[];
}

const SearchAttractions = ({
  language,
  t,
  user,
  updateItineraryHandler,
  itineraryAttractions,
  itineraryDurations,
  itineraryId,
  itineraryCompleteAttractions,
  itineraryTravelModes,
  setLoadingAttraction,
  setShowModal,
  setAdding,
  error,
  setError,
  closeModal,
  loadPhotos,
  setLoadingPhotos,
  loadingPhotos,
}: SearchAttractionsProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [attractions, setAttractions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [prefecture, setPrefecture] = useState<{ prefecture: string; link: string } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const clientRef = useRef<any>();

  const functions = useMemo(() => {
    try {
      return getFunctions(undefined, "asia-northeast1");
    } catch (err) {
      console.error("Firebase functions error:", err);
      return null;
    }
  }, []);

  const getAutocomplete = functions
    ? httpsCallable(functions, "getAutocomplete")
    : null;

  const getPrefecture = (inputState: string | null, attraction?: any, completed?: boolean) => {
    const key = Object.keys(STATES).find((k) =>
      k.includes(inputState?.toLowerCase() || "")
    );

    if (key) {
      setPrefecture({
        prefecture: STATES[key],
        link: LINKS[key],
      });
    } else if (
      attraction?.translatedState &&
      attraction?.["translatedState.ja"]
    ) {
      const stateKey = Object.keys(STATES).find((k) =>
        k.includes(attraction["translatedState.ja"])
      );
      if (stateKey) {
        setPrefecture({
          prefecture: STATES[stateKey],
          link: LINKS[stateKey],
        });
      }
    }
  };

  const handleGoogleFallback = async () => {
    if (!getAutocomplete) return;

    try {
      const response: any = await getAutocomplete({
        place: searchInput,
        language,
        location: itineraryCompleteAttractions?.[0] || null,
        onlyPointsOfInterest: true,
      });
      const predictions = getAutocompletePredictions(response);
      const cleanResults = predictions?.filter((res: any) => {
        return !/[\u3000-\u303f\u3040-\u30ff\u3400-\u9faf]/.test(
          res?.structured_formatting?.main_text || ""
        );
      });

      const formatted = cleanResults
        .filter((item: any) => item?.place_id && item?.structured_formatting?.main_text)
        .map((item: any) => ({
          name: item.structured_formatting.main_text
          .replace(/[^\w\s]/gi, " ")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, " ")
          .toLowerCase()
          .trim(),
          description: item.description,
          placeId: item.place_id,
        }));

      if (formatted.length > 0) {
        getPrefecture(null, predictions[0], true);
      }

      setAttractions(formatted);
    } catch (err) {
      console.error("Google fallback error:", err);
      setAttractions([]);
    }
  };

  const initSearch = async (more = false) => {
    setLoading(true);
    let tempAttractions: any[] = [];

    if (more) {
      getPrefecture(searchInput);
      await handleGoogleFallback();
      setLoading(false);
      return;
    }

    try {
      if (typeof window === "undefined") return;
      if (!clientRef.current) {
        clientRef.current = createLocalSearchClient();
      }
      const results = await clientRef.current
        .collections("attractions")
        .documents()
        .search({
          q: searchInput,
          query_by: `translatedName.${language?.code},translatedCity.${language?.code}`,
          filter_by:
            itineraryCompleteAttractions?.length > 0
              ? `_geoloc:(${itineraryCompleteAttractions[0]?._geoloc[0]}, ${itineraryCompleteAttractions[0]?._geoloc[1]}, 100km)`
              : "",
          sort_by: "ratingCounter:desc",
          per_page: 6,
        });

      results?.hits?.forEach((hit: any) => {
        if (
          !itineraryAttractions?.includes(
            hit?.document?.url?.replace(/-/g, " ")
          )
        ) {
          tempAttractions.push(hit);
        }
      });

      if (tempAttractions.length > 0) {
        getPrefecture("", tempAttractions[0]?.document, true);
        setAttractions(tempAttractions);
      } else {
        await handleGoogleFallback();
      }
    } catch (err) {
      console.error("Local search error:", err);
      setAttractions([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!searchInput) {
        setAttractions([]);
        return;
    }

    setLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      initSearch();
    }, 500);

    return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchInput]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSearchInput("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const placeholderText = itineraryCompleteAttractions?.length > 0 &&
  itineraryCompleteAttractions[0]?.translatedState
    ? t("searchAttractionPlaceholder", {
        city: itineraryCompleteAttractions[0]?.translatedState[
          language?.code || "en"
        ],
      })
    : t("searchAttractionPlaceholder2");

  return (
    <SearchAttractionsStyles ref={wrapperRef}>
      <input
        name="attraction-search"
        className="attraction-search"
        type="text"
        value={searchInput}
        onChange={(e) => {
          if (error) setError(false);
          setSearchInput(e.target.value);
        }}
        placeholder={placeholderText}
        autoComplete="off"
      />
      {error && <p className="error-message">⚠ {t("errorMsg")}</p>}
      {searchInput?.length > 0 && (
        <SearchAttractionsResults
          setLoadingAttraction={setLoadingAttraction}
          language={language}
          attractions={attractions}
          itineraryAttractions={itineraryAttractions}
          loading={loading}
          updateItineraryHandler={updateItineraryHandler}
          itineraryTravelModes={itineraryTravelModes}
          itineraryId={itineraryId}
          setSearchInput={setSearchInput}
          itineraryDurations={itineraryDurations}
          t={t}
          setShowModal={setShowModal}
          initSearch={initSearch}
          setAdding={setAdding}
          user={user}
          setError={setError}
          error={error}
          closeModal={closeModal}
          prefecture={prefecture}
          loadPhotos={loadPhotos}
          setLoadingPhotos={setLoadingPhotos}
          loadingPhotos={loadingPhotos}
        />
      )}
    </SearchAttractionsStyles>
  );
};

export default React.memo(SearchAttractions);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
