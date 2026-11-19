import { ItineraryGuideListStyles } from "./styles/ItineraryGuideListStyles";
import { ItineraryGuideListResponsiveStyles } from "./styles/responsive/ItineraryGuideListResponsiveStyles";
import React, { useState, useEffect, useRef } from "react";
import Spinner from "../../UI/Spinner";
import ItineraryGuidesSearch from "./ItineraryGuidesSearch";
import dottie from "dottie";
import dynamic from "next/dynamic";
import Pagination from "@mui/material/Pagination";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../../store/store";
import ItineraryGuideSkeleton from "./ItineraryGuideSkeleton";
import Image from "next/image";
import ItineraryDate from "../ItineraryDate";
import ItineraryNoGuides from "./ItineraryNoGuides";
import useItinerary from "../../../lib/useItinerary";
import { User, LanguageOption } from "../../../types/user";
import { Attraction } from "../../../types/attraction";
import { Itinerary, TravelMode } from "../../../types/itinerary";
import { ItineraryGuide as IGuide } from "../../../types/itineraryGuide";
import { createLocalSearchClient } from "../../../lib/search/client";

interface TypesenseGuideHit {
  document: IGuide;
  highlights: any[];
  text_match: number;
}

const GuidesFilter = dynamic(
  () => import("../../S/Guides/GuidesFilters/GuidesFilter"),
  {
    ssr: false,
  }
);
const ItineraryGuide = dynamic(() => import("./ItineraryGuide"), {
  loading: () => <ItineraryGuideSkeleton />,
});

interface ItineraryGuideListProps {
  itinerary: Itinerary;
  itineraryAttractions: Attraction[];
  itineraryDate: string;
  itineraryId: string;
  itineraryStatus: boolean;
  itineraryCreatedBy: string;
  updateItineraryHandler: (data: any) => Promise<any>;
  t: (key: string, options?: any) => string;
  setStep?: ((step: number) => void) | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setShowGuideList: (show: boolean) => void;
  includeTransport: boolean;
}

const ItineraryGuideList = ({
  itinerary,
  itineraryAttractions,
  itineraryDate,
  itineraryId,
  itineraryStatus,
  itineraryCreatedBy,
  updateItineraryHandler,
  t,
  setStep = null,
  loading,
  setLoading,
  setShowGuideList,
  includeTransport,
}: ItineraryGuideListProps) => {
  const user = useSelector((state: RootState) => state.app.user, shallowEqual);
  const currency = useSelector((state: RootState) => state.app.currency, shallowEqual);
  const clientRef = useRef<any>();
  const perPage = 12;
  const language = useSelector((state: RootState) => state.app.language);
  const [guides, setGuides] = useState<TypesenseGuideHit[]>([]);
  const [states, setStates] = useState<string>();
  const [editDate, setEditDate] = useState(false);
  const [displayStates, setDisplayStates] = useState<string>("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("ratingScore:desc");
  const [pagination, setPagination] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState<any[]>([]);
  const { getGuideFee } = useItinerary();

  const guideHandler = async (guide: IGuide) => {
    setLoading(true);
    const guideRef = doc(getFirestore(), "users", guide?.uid || (guide as any)?.id);
    const guideSnap = await getDoc(guideRef);
    const guideData = guideSnap?.data();
    
    const newGuideData = {
      username: guideData?.username,
      firstname: guideData?.firstname,
      lastname: guideData?.lastname,
      languages: guideData?.languages,
      email: guideData?.email,
      fee: guideData?.fee,
      ...(guideData?.feeWithTransport && {
        feeWithTransport: guideData?.feeWithTransport || false,
      }),
      avatar: guideData?.avatar,
      photos: guideData?.photos?.[0] ? [guideData.photos[0]] : [],
      uid: guide?.uid || (guide as any)?.id,
      maxPeople: guideData?.maxPeople,
      ...(guideData?.maxPeopleTransport && {
        maxPeopleTransport: guideData?.maxPeopleTransport,
      }),
      transportIncluded: guideData?.transportIncluded || "false",
    };

    updateItineraryHandler({
      guide: guide?.uid || (guide as any)?.id,
      guideData: newGuideData,
      guideFee: getGuideFee(
        {
          ...itinerary,
          guideData: newGuideData as any,
        },
        includeTransport
      ),
    });
    if (setStep) {
      setStep(6);
    }
  };

  const getPrefectures = async () => {
    if (itineraryAttractions?.length > 0) {
      const prefectureMap: Record<string, string> = {
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
      let tempStates = "";
      let tempDisplayStates = "";
      
      itineraryAttractions.forEach((attraction) => {
        if (attraction?.state) {
          const attractionState = attraction?.state;
          const stateKey = Object.keys(prefectureMap).find((key) =>
            key.includes(attractionState?.split(" ")[0]?.toLowerCase())
          );
          
          if (stateKey) {
            const stateValue = prefectureMap[stateKey];
            if (!tempStates.includes(stateValue)) {
              tempStates += `${stateValue}, `;
              if (attraction?.translatedState) {
                const attractionTranslatedState = (attraction.translatedState as any)?.[language?.code || "en"];
                tempDisplayStates += `${t(attractionTranslatedState)}, `;
              }
            }
          }
        }
      });
      
      setStates("[" + tempStates?.slice(0, -2) + "]");
      if (tempDisplayStates?.length > 0) {
        setDisplayStates(
          "[" + tempDisplayStates?.slice(0, -2) + "]"
        );
      }
    }
  };

  useEffect(() => {
    if (itineraryAttractions) {
      getPrefectures();
    }
  }, [itineraryAttractions, language?.code]);

  const [searchFilters, setSearchFilters] = useState({
    licensed: "",
    verified: "verified:='true'",
    canDrive: "",
    languages: "",
    feeHalfDay: "",
    feeFullDay: "",
  });
  const [resultDetails, setResultDetails] = useState({
    counter: 0,
    totalCounter: 0,
    perPage: 12,
  });

  const initSearch = async (page = 1) => {
    setLoading(true);
    if (editDate) {
      setEditDate(false);
    }
    let searchParameters = {
      q: search,
      query_by: `firstname,lastname`,
      filter_by: `guide:="true" && acceptTourFrom:<=${Math.floor(
        Math.abs(new Date().getTime() - new Date(itineraryDate)?.getTime()) /
          (1000 * 60 * 60 * 24)
      )} && states:=${states}${
        searchFilters?.languages ? ` && ${searchFilters?.languages}` : ""
      }${searchFilters?.feeFullDay ? ` && ${searchFilters?.feeFullDay}` : ""}${
        searchFilters?.feeHalfDay ? ` && ${searchFilters?.feeHalfDay}` : ""
      }${searchFilters?.verified ? ` && ${searchFilters?.verified}` : ""}${
        searchFilters?.licensed ? ` && ${searchFilters?.licensed}` : ""
      }${searchFilters?.canDrive ? ` && ${searchFilters?.canDrive}` : ""} 
      ${includeTransport ? '&& transportIncluded:="true"' : ""}`,
      sort_by: `_eval(uid:${itineraryCreatedBy}):desc, ${sortBy}`,
      per_page: perPage,
      page,
      exclude_fields: "availability, states",
    };
    
    if (typeof window === "undefined") return;
    
    if (!clientRef.current) {
      clientRef.current = createLocalSearchClient();
    }
    
    clientRef.current
      .collections("users")
      .documents()
      .search(searchParameters)
      .then((data: any) => {
        setGuides(data?.hits || []);
        setPagination(page);
        setResultDetails((prev) => ({
          ...prev,
          counter: data?.found,
          totalCounter: data?.out_of,
        }));
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (states) {
      const timeOutId = setTimeout(() => initSearch(), 600);
      return () => clearTimeout(timeOutId);
    }
  }, [
    search,
    resultDetails?.perPage,
    sortBy,
    searchFilters,
    currency,
    states,
    itineraryDate,
    includeTransport,
  ]);

  return (
    <ItineraryGuideListResponsiveStyles>
      <ItineraryGuideListStyles className="guides-list">
        <div className="guides-title">
          {editDate ? (
            <div className="guides-date-wrapper">
              <ItineraryDate
                updateItineraryHandler={updateItineraryHandler}
                itineraryMainDate={itineraryDate}
                itineraryAttractions={itineraryAttractions}
                id={itineraryId}
                user={user as User}
                t={t}
                itineraryStatus={itineraryStatus}
                searchFilters={searchFilters}
                includeTransport={includeTransport}
                fromGuides={true}
              />
              <button
                onClick={() => setEditDate(!editDate)}
                className="normal-button"
              >
                <Image
                  src="/img/icon-close.svg"
                  alt="close"
                  height={18}
                  width={18}
                />
              </button>
            </div>
          ) : (
            <div className="guides-title-p">
              {displayStates?.length > 0 && (
                <>
                  <b>{displayStates?.slice(1, -1)}</b>{" "}
                </>
              )}
              <b>{itineraryDate}</b>{" "}
              <button
                onClick={() => setEditDate(!editDate)}
                className="normal-button"
              >
                <Image
                  src="/img/icon-edit2.svg"
                  alt="edit"
                  height={15}
                  width={15}
                />
              </button>
            </div>
          )}
        </div>
        <div className="guide-search">
          <ItineraryGuidesSearch t={t} search={search} setSearch={setSearch} />
          <GuidesFilter
            t={t}
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
            guidesLength={resultDetails?.counter}
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
          />
        </div>
        {(guides?.length > 0 || loading) && (
          <>
            {!loading ? (
              <div className="guides-wrapper">
                {guides?.map((tour, i) => (
                  <ItineraryGuide
                    language={language}
                    currency={currency}
                    guide={dottie.transform(tour?.document)}
                    t={t}
                    key={i}
                    guideHandler={guideHandler}
                    setShowGuideList={setShowGuideList}
                    creator={itineraryCreatedBy}
                    includeTransport={includeTransport}
                    showToolTip={i === 0}
                  />
                ))}
              </div>
            ) : (
              <Spinner />
            )}
          </>
        )}
        {!loading && guides?.length < 1 && (
          <ItineraryNoGuides
            t={t}
            prefecture={itineraryAttractions[0]?.state || ""}
            translatedPrefecture={itineraryAttractions[0]?.translatedState}
            language={language}
          />
        )}
        {guides?.length > 0 && (
          <div className="pagination">
            <Pagination
              page={pagination}
              count={Math.ceil(resultDetails?.counter / resultDetails?.perPage)}
              shape="rounded"
              variant="outlined"
              onChange={(_, value) => {
                initSearch(value);
                setPagination(value);
              }}
            />
          </div>
        )}
      </ItineraryGuideListStyles>
    </ItineraryGuideListResponsiveStyles>
  );
};
export default React.memo(ItineraryGuideList);
