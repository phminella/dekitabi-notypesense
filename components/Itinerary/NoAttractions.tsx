import { NoAttractionsStyles } from "./styles/NoAttractionsStyles";
import dynamic from "next/dynamic";
const AddAttraction = dynamic(() => import("./AddAttraction/AddAttraction"), {
  ssr: false,
});
const SuggestedItineraries = dynamic(
  () => import("../Misc/SuggestedItineraries/SuggestedItineraries"),
  {
    ssr: false,
  }
);
import { useState } from "react";
import Search from "../Search/Search";
import Image from "next/image";
import React from "react";
import { Itinerary, TravelMode } from "../../types/itinerary";
import { Attraction } from "../../types/attraction";
import { LanguageOption, User } from "../../types/user";

interface NoAttractionsProps {
  language: LanguageOption;
  t: (key: string) => string;
  itinerary: Itinerary;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  loadingAttraction: boolean;
  setLoadingAttraction: (loading: boolean) => void;
  itineraryAttractions: Attraction[];
  loadPhotos: (index: number, url: string) => Promise<void>;
  setLoadingPhotos: React.Dispatch<React.SetStateAction<string[]>>;
  loadingPhotos: string[];
  user: User;
}

const NoAttractions = ({
  language,
  t,
  itinerary,
  updateItineraryHandler,
  loadingAttraction,
  setLoadingAttraction,
  itineraryAttractions,
  loadPhotos,
  setLoadingPhotos,
  loadingPhotos,
  user,
}: NoAttractionsProps) => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <NoAttractionsStyles>
      <div className="itinerary-main" style={{ textAlign: "center" }}>
        <button className="close-icon" onClick={() => window.history.back()}>
          <Image src="/img/icon-close.svg" height={25} width={25} alt="close" />
        </button>
        <div className="itinerary-main-bg">
          <p>{t("getStarted")}</p>
        </div>
        <div className="itinerary-main-wrapped">
          <div className="no-attractions-add">
            <div className="title-wrapper">
              <p className="no-attraction-msg">{t("addAttractionFirst")}</p>
            </div>
            {!itinerary?.status && itinerary?.attractions?.length === 0 && (
              <div className="no-attractions-wrapper">
                <AddAttraction
                  language={language}
                  t={t}
                  itineraryId={itinerary?.id}
                  itineraryAttractions={itinerary?.attractions}
                  itineraryTravelModes={(itinerary?.travelModes ?? []) as (string | TravelMode)[]}
                  itineraryDurations={itinerary?.durations}
                  updateItineraryHandler={updateItineraryHandler}
                  loadingAttraction={loadingAttraction}
                  setLoadingAttraction={setLoadingAttraction}
                  itineraryCompleteAttractions={itineraryAttractions}
                  noAttractions={true}
                  loadPhotos={loadPhotos}
                  setLoadingPhotos={setLoadingPhotos}
                  loadingPhotos={loadingPhotos}
                  user={user}
                  duration={1}
                />
              </div>
            )}
          </div>
          <p className="no-attractions-title">{t("noAttractionsMsg")}</p>
          <div className="search-destination">
            <Search
              t={t}
              language={language}
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              fromItinerary={true}
            />
          </div>
          <p className="no-attractions-title-3">{t("popularDestinations")}</p>
          <p className="no-attractions-title-2">{t("Tokyo")}</p>
          <SuggestedItineraries
            language={language}
            itineraryAttractions={[
              {
                url: "meiji-jingu",
                name: "Meiji Jingu",
                area: "代々木神園町",
                city: "渋谷区",
                translatedName: {
                  de: "Meiji Jingu",
                  sv: "Meiji Jingu",
                  ru: "Мэйдзи Дзингу",
                  pt: "Meiji Jingu",
                  ko: "Meiji Jingu",
                  "zh-TW": "明治神宮",
                  ms: "Meiji Jingu",
                  fil: "Meiji Jingu",
                  en: "Meiji Jingu",
                  it: "Meiji Jingu",
                  fr: "Meiji Jingu",
                  my: "Meiji Jingu",
                  "zh-CN": "明治神宫",
                  es: "Meiji Jingu",
                  vi: "Minh Trị Kinh Quốc",
                  th: "เมจิจิงกู",
                  ja: "Meiji Jingu",
                  id: "Meiji Jingu",
                  nl: "Meiji Jingu",
                },
                _geoloc: [35.67639760000001, 139.6993259],
                mapUrl: "https://maps.google.com/?cid=10361244767556222835",
                id: "meiji jingu",
                translatedState: {
                  ko: "도쿄도",
                  pt: "Tóquio",
                  "zh-TW": "東京",
                  ms: "Tokyo",
                  fil: "Tokyo",
                  en: "Tokyo",
                  it: "Tokio",
                  fr: "Tokyo",
                  "zh-CN": "东京",
                  es: "Tokio",
                  vi: "Tokyo",
                  th: "โตเกียว",
                  ja: "東京都",
                  id: "Tokyo",
                },
                state: "東京都",
                country: "japan",
                openingPeriods: "",
                ratingCounter: 35795,
                openingHours: "",
                closedDays: "",
                translatedCity: {
                  ko: "Shibuya City",
                  pt: "Shibuya City",
                  "zh-TW": "Shibuya City",
                  ms: "Shibuya City",
                  fil: "Shibuya City",
                  en: "Shibuya City",
                  it: "Shibuya City",
                  fr: "Shibuya City",
                  "zh-CN": "Shibuya City",
                  es: "Shibuya City",
                  zh: "Shibuya City",
                  vi: "Shibuya City",
                  th: "Shibuya City",
                  ja: "渋谷区",
                  id: "Shibuya City",
                },
              },
            ]}
            t={t}
            itineraryId={itinerary?.id}
          />
          <p className="no-attractions-title-2">{t("Kyoto")}</p>
          <SuggestedItineraries
            language={language}
            itineraryAttractions={[
              {
                area: "伏見区",
                city: "京都市",
                url: "fushimi-inari-taisha",
                duration: 90,
                _geoloc: [34.9671402, 135.7726717],
                mapUrl: "https://maps.google.com/?cid=8870624639634301673",
                name: "Fushimi Inari Taisha",
                id: "fushimi inari taisha",
                translatedName: {
                  ko: "Fushimi Inari Taisha",
                  pt: "Fushimi Inari Taisha",
                  "zh-TW": "伏見稻荷大社",
                  ms: "Fushimi Inari Taisha",
                  fil: "Fushimi Inari Taisha",
                  en: "Fushimi Inari Taisha",
                  it: "Fushimi Inari Taisha",
                  fr: "Fushimi Inari Taisha",
                  "zh-CN": "伏见稻荷大社",
                  es: "Fushimi Inari Taisha",
                  vi: "Fushimi Inari Taisha",
                  th: "ฟุชิมิ อินาริ ไทฉะ",
                  ja: "Fushimi Inari Taisha",
                  id: "Fushimi Inari Taisha",
                },
                state: "京都府",
                translatedState: {
                  ko: "교토부",
                  pt: "Quioto",
                  "zh-TW": "京都",
                  ms: "Kyoto",
                  fil: "Kyoto",
                  en: "Kyoto",
                  it: "Kyoto",
                  fr: "Kyoto",
                  "zh-CN": "京都",
                  es: "Kioto",
                  vi: "Kyoto",
                  th: "เกียวโต",
                  ja: "京都府",
                  id: "Kyoto",
                },
              },
            ]}
            t={t}
            itineraryId={itinerary?.id}
          />
          {/* <p className="no-attractions-title-2">{t("Fukuoka")}</p>
        <SuggestedItineraries
          language={language}
          itineraryAttractions={[
            {
              area: "博多区",
              city: "福岡市",
              name: "キャナルシティ博多",
              mapUrl: "https://maps.google.com/?cid=16207815243977726417",
              _geoloc: [33.5897944, 130.4111028],
              translatedName: {
                ko: "캐널 시티 하카타",
                pt: "Cidade do Canal Hakata",
                "zh-TW": "博多運河城",
                ms: "Canal City Hakata",
                fil: "Canal City Hakata",
                en: "Canal City Hakata",
                it: "Città del canale Hakata",
                fr: "Ville du canal Hakata",
                "zh-CN": "博多运河城",
                es: "Ciudad del canal Hakata",
                vi: "Thành phố kênh đào Hakata",
                th: "คาแนลซิตี้ฮากาตะ",
                ja: "キャナルシティ博多",
                id: "Kota Kanal Hakata",
              },
              state: "福岡県",
              translatedState: {
                ko: "후쿠오카현",
                pt: "Prefeitura de Fukuoka",
                "zh-TW": "福岡縣",
                ms: "Wilayah Fukuoka",
                fil: "Prepektura ng Fukuoka",
                en: "Fukuoka Prefecture",
                it: "Prefettura di Fukuoka",
                fr: "Préfecture de Fukuoka",
                "zh-CN": "福冈县",
                es: "Prefectura de Fukuoka",
                vi: "tỉnh Fukuoka",
                th: "จังหวัดฟุกุโอกะ",
                ja: "福岡県",
                id: "Prefektur Fukuoka",
              },
            },
          ]}
          t={t}
          itineraryId={itinerary?.id}
        /> */}
        </div>
      </div>
    </NoAttractionsStyles>
  );
};
export default React.memo(NoAttractions);
