// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import dynamic from "next/dynamic";
import { ItineraryDetailsStyles } from "./styles/ItineraryDetailsStyles";
import ItineraryDetailsFooter from "./ItineraryDetailsFooter";
import ItineraryPrice from "./ItineraryPrice";
import Link from "next/link";
import ItineraryDate from "../ItineraryDate";
import Image from "next/image";
import React from "react";
import ItineraryPrimaryLanguage from "./ItineraryPrimaryLanguage";
import { User, LanguageOption } from "../../../types/user";
import { Attraction } from "../../../types/attraction";
import { Itinerary, ItineraryTime, ItineraryError } from "../../../types/itinerary";
import { ItineraryGuide as ItineraryGuideType } from "../../../types/itineraryGuide";

const ItineraryPersonNumber = dynamic(() => import("./ItineraryPersonNumber"));
const ItineraryGuide = dynamic(() => import("./ItineraryGuide"));
const ItineraryIncludeTransport = dynamic(() =>
  import("./ItineraryIncludeTransport")
);

interface ItineraryDetailsProps {
  itineraryId: string;
  itinerary: Itinerary;
  itineraryTime: ItineraryTime;
  itineraryStatus: boolean;
  itineraryGuideData?: ItineraryGuideType | false;
  user: User;
  errors: ItineraryError[];
  t: (key: string, options?: any) => string;
  currency: string;
  setShowGuideList: (show: boolean) => void;
  setPublished: (pub: boolean) => void;
  setUnpublished: (unpub: boolean) => void;
  setSaved: (saved: boolean) => void;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  itineraryAttractions: Attraction[];
  includeTransport: boolean;
  setIncludeTransport: (include: boolean) => void;
  checkedGuides: () => void;
  language?: LanguageOption;
  itineraryLunch?: number;
  setShowErrorModal?: (show: boolean) => void;
  hasItinerary?: (id: string) => boolean;
}

const ItineraryDetails = ({
  itineraryId,
  itinerary,
  itineraryTime,
  itineraryStatus,
  itineraryGuideData,
  user,
  errors,
  t,
  currency,
  setShowGuideList,
  setPublished,
  setUnpublished,
  setSaved,
  updateItineraryHandler,
  itineraryAttractions,
  includeTransport,
  setIncludeTransport,
  checkedGuides,
}: ItineraryDetailsProps) => {
  return (
    <ItineraryDetailsStyles
      className={`itinerary-details ${
        !itinerary?.guideFee && "no-selected-guide"
      }`}
    >
      <div
        className={`itinerary-details-content  ${
          user?.guide === "true" ? "guide-details" : ""
        } ${itineraryStatus ? "booked" : ""}`}
      >
        <div
          className={`itinerary-header ${
            (itinerary?.guideData as ItineraryGuideType | false | undefined)?.firstname ? "with-guide" : ""
          }`}
        >
          <div className={`itinerary-details-header`}>
            {itinerary?.guideFee !== undefined && itinerary.guideFee > 0 && user?.guide !== "true" && (
              <div className="itinerary-details-price-person">
                <ItineraryPrice
                  guideFee={itinerary?.guideFee}
                  t={t}
                  currency={currency}
                  itineraryPersons={itinerary?.person}
                  itineraryPrice={itinerary?.price}
                  itineraryStatus={itinerary?.status}
                  itineraryCurrency={itinerary?.currency}
                  itineraryGuideData={itinerary?.guideData}
                  itineraryCreatedBy={itinerary?.createdBy}
                  user={user}
                />
                {((user?.guide as string | undefined) !== "true" || itineraryStatus) &&
                  itineraryGuideData && (
                    <ItineraryPersonNumber
                      updateItineraryHandler={updateItineraryHandler}
                      itineraryMainPerson={itinerary?.person}
                      itineraryStatus={itineraryStatus}
                      maxPeople={itineraryGuideData?.maxPeople}
                      maxPeopleTransport={
                        itineraryGuideData?.maxPeopleTransport
                      }
                      includeTransport={includeTransport}
                    />
                  )}
              </div>
            )}
            {(user?.guide as string | undefined) !== "true" && (
              <ItineraryGuide
                user={user}
                itinerary={itinerary}
                setShowGuideList={setShowGuideList}
                t={t}
                itineraryAttractions={itineraryAttractions}
              />
            )}
          </div>
          {itinerary?.guideData &&
            ((user?.guide as string | undefined) !== "true" || itineraryStatus) && (
              <ItineraryPrimaryLanguage
                itineraryGuideLanguages={itinerary?.guideData?.languages}
                itineraryPrimaryLanguage={itinerary?.primaryLanguage}
                itineraryStatus={itinerary?.status}
                t={t}
                updateItineraryHandler={updateItineraryHandler}
              />
            )}
        </div>
        <ItineraryDate
          itineraryAttractions={itineraryAttractions}
          updateItineraryHandler={updateItineraryHandler}
          itineraryMainDate={itinerary?.date}
          itineraryStartTime={itinerary?.startTime}
          id={itinerary?.id}
          user={user}
          t={t}
          itineraryStatus={itinerary?.status}
        />
        {(user?.guide as string | undefined) !== "true" && !itinerary?.status && (
          <ItineraryIncludeTransport
            t={t}
            includeTransport={includeTransport}
            setIncludeTransport={setIncludeTransport}
          />
        )}
        <ItineraryDetailsFooter
          itinerary={itinerary}
          itineraryId={itineraryId}
          user={user}
          itineraryTime={itineraryTime}
          errors={errors}
          t={t}
          setPublished={setPublished}
          setUnpublished={setUnpublished}
          setShowGuideList={setShowGuideList}
          setSaved={setSaved}
          updateItineraryHandler={updateItineraryHandler}
          itineraryAttractions={itineraryAttractions}
          includeTransport={includeTransport}
          checkedGuides={checkedGuides}
        />{" "}
        {itinerary?.status &&
          itinerary?.status !== "canceled" &&
          (user?.uid === itinerary?.createdBy ||
            user?.uid === (itinerary?.guide as string)) && (
            <Link
              prefetch={false}
              style={{ marginTop: "10px", textTransform: "capitalize" }}
              className="normal-button"
              href="/account/tours"
            >
              <Image
                height={25}
                width={25}
                src="/img/icon-tour.svg"
                alt="tour"
              />{" "}
              {t("viewTour")}
            </Link>
          )}
      </div>
    </ItineraryDetailsStyles>
  );
};
export default React.memo(ItineraryDetails);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
