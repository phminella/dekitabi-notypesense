// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
import React, { useEffect, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ItineraryHeaderStyles } from "./styles/ItineraryHeaderStyles";
import { ItineraryHeaderResponsiveStyles } from "./styles/responsive/ItineraryHeaderResponsiveStyles";
import ItineraryName from "./ItineraryName";
import ItineraryCarousel from "../Carousel/ItineraryCarousel";
import AttractionImage from "../../S/Attractions/AttractionImage";
import ItineraryPhotoPlaceholder from "./ItineraryPhotoPlaceholder";
import ItineraryStats from "./ItineraryStats";
import { User, LanguageOption } from "../../../types/user";
import { Attraction } from "../../../types/attraction";
import { Itinerary, ItineraryTime, ItineraryError, ItineraryPhoto, CarouselPhoto } from "../../../types/itinerary";

const ItineraryComments = dynamic(
  () => import("./Comments/ItineraryComments"),
  { ssr: false }
);
const ItineraryAddPhoto = dynamic(() => import("./ItineraryAddPhoto"), {
  ssr: false,
});

interface ItineraryHeaderProps {
  user: User;
  language: LanguageOption;
  itinerary: Itinerary;
  itineraryAttractions: Attraction[];
  itineraryId: string;
  itineraryUrl: string;
  itineraryLikesCounter?: number;
  itineraryRatingScore?: number;
  itineraryRatingCounter?: number;
  itineraryLocale?: string;
  itineraryCreatedBy: string;
  itineraryName?: string;
  itineraryTime: ItineraryTime;
  itineraryTranslatedName?: Record<string, string>;
  itineraryPublished?: boolean;
  itineraryCommentsCounter?: number;
  itineraryViews?: number;
  updateItineraryHandler: (data: Partial<Itinerary>) => Promise<boolean>;
  itineraryStatus: boolean;
  itineraryGuide?: string;
  itineraryDescription?: string;
  t: (key: string, options?: any) => string;
  itineraryPhotos: { src: string }[];
  photos: { attraction: string; index: number }[];
  hasItinerary: (id: string) => boolean;
  loadingPhotos?: string[];
  errors: ItineraryError[];
  setPublished: (pub: boolean) => void;
  setUnpublished: (unpub: boolean) => void;
  setSaved: (saved: boolean) => void;
}

const ItineraryHeader = ({
  user,
  language,
  itinerary,
  itineraryAttractions,
  itineraryId,
  itineraryUrl,
  itineraryLikesCounter,
  itineraryRatingScore,
  itineraryRatingCounter,
  itineraryLocale,
  itineraryCreatedBy,
  itineraryName,
  itineraryTime,
  itineraryTranslatedName,
  itineraryPublished,
  itineraryCommentsCounter,
  itineraryViews,
  updateItineraryHandler,
  itineraryStatus,
  itineraryGuide,
  itineraryDescription,
  t,
  itineraryPhotos,
  photos,
  hasItinerary,
  loadingPhotos,
  errors,
  setPublished,
  setUnpublished,
  setSaved,
}: ItineraryHeaderProps) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [backgrounds, setBackgrounds] = useState<(ItineraryPhoto | CarouselPhoto)[]>([]);
  const [creator, setCreator] = useState<User | null>(null);
  const [showReviews, setShowReviews] = useState<string | boolean>(false);
  const [loading, setLoading] = useState(true);
  const [commentsCounter, setCommentsCounter] = useState(
    itineraryCommentsCounter || 0
  );

  const computeBackgrounds = useCallback(() => {
    if (!photos?.length && !itineraryPhotos?.length) {
      setLoading(false);
      return false;
    }
    const len = photos?.length || 0;
    const selection =
      len < 5
        ? photos || []
        : [
            photos[0],
            photos[Math.floor(len / 4)],
            photos[Math.floor(len / 2)],
            photos[len - 1],
          ];
    setBackgrounds([...(itineraryPhotos || []), ...selection]);
    setLoading(false);
  }, [photos, itineraryPhotos]);

  useEffect(() => {
    if ((loadingPhotos?.length ?? 0) === 0) computeBackgrounds();
  }, [computeBackgrounds, loadingPhotos]);

  useEffect(() => {
    setCommentsCounter(itineraryCommentsCounter || 0);
  }, [itineraryId, itineraryCommentsCounter]);

  const fallbackBg = useMemo(() => {
    const seed = itineraryId?.charCodeAt(0) || 0;
    return `/img/bg/japan/${(seed % 4) + 1}.webp`;
  }, [itineraryId]);

  const renderBackgroundImage = (bg: ItineraryPhoto | CarouselPhoto, index: number) => {
    if (loading) return null;
    if ((bg as CarouselPhoto)?.attraction) {
      return (
        <AttractionImage
          attraction={bg.attraction}
          index={bg.index}
          size={1000}
          sizes="(max-width:870px) 100vw, calc(100vw - 400px)"
          priority={true}
        />
      );
    }
    if (bg?.src) {
      return (
        <Image
          fill
          priority
          src={bg.src}
          alt="background"
          quality={70}
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
      );
    }
    return <ItineraryPhotoPlaceholder bg={index + 1} />;
  };

  const photoLength = [...(photos || []), ...(itineraryPhotos || [])]?.length;

  return (
    <>
      <ItineraryHeaderResponsiveStyles>
        <ItineraryHeaderStyles>
          {showReviews && (
            <ItineraryComments
              t={t}
              itineraryId={itineraryId}
              itineraryUrl={itineraryUrl}
              reviewsLength={itineraryRatingCounter ?? 0}
              showReviews={showReviews}
              setShowReviews={setShowReviews as (show: string | boolean) => void}
              setCommentsCounter={setCommentsCounter}
              commentsCounter={commentsCounter}
              itineraryPublished={itineraryPublished}
              itineraryName={itineraryName}
              itineraryCreator={creator}
              user={user}
            />
          )}

          {showCarousel && (
            <ItineraryCarousel
              setShowCarousel={setShowCarousel}
              photos={photos}
              updateItineraryHandler={updateItineraryHandler}
              itineraryId={itineraryId}
              itineraryCreatedBy={itineraryCreatedBy}
              itineraryPhotos={itineraryPhotos}
              user={user}
            />
          )}

          <div className="itinerary-header">
            <div
              className={`itinerary-header-wrapper ${
                backgrounds?.length < 2 ? "one-grid" : ""
              }`}
            >
              <div className="left-frame">
                {renderBackgroundImage(
                  backgrounds[0] || { src: fallbackBg },
                  0
                )}

                <div className="header-buttons">
                  <button
                    className="view-all"
                    onClick={() => setShowCarousel(true)}
                  >
                    {t("viewAllPhotos", { photosLength: photoLength })}
                  </button>
                  {user?.guide === "true" &&
                    itineraryCreatedBy === user?.uid && (
                      <ItineraryAddPhoto
                        updateItineraryHandler={updateItineraryHandler}
                        itineraryPhotos={itineraryPhotos}
                        itineraryId={itineraryId}
                        t={t}
                      />
                    )}
                </div>

                <div className="left-frame-content-wrapper">
                  <ItineraryName
                    user={user}
                    itineraryId={itineraryId}
                    updateItineraryHandler={updateItineraryHandler}
                    itineraryCreatedBy={itineraryCreatedBy}
                    itineraryName={itineraryName}
                    itineraryStatus={itineraryStatus}
                    itineraryTranslatedName={itineraryTranslatedName}
                    itineraryGuide={itineraryGuide}
                    itineraryLocale={itineraryLocale}
                    itineraryPublished={itineraryPublished}
                    t={t}
                  />
                </div>
              </div>

              {backgrounds?.length > 1 && (
                <div
                  className="right-frame"
                  onClick={() => setShowCarousel(true)}
                >
                  <div className="right-frame-top">
                    {renderBackgroundImage(backgrounds[1], 1)}
                  </div>

                  {backgrounds?.length > 2 && (
                    <div
                      className={`right-frame-bottom ${
                        backgrounds.length < 4 ? "one-grid" : ""
                      }`}
                    >
                      <div className="right-frame-bottom-left">
                        {renderBackgroundImage(backgrounds[2], 2)}
                      </div>
                      {backgrounds?.length > 3 && (
                        <div className="right-frame-bottom-right">
                          {renderBackgroundImage(backgrounds[3], 3)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </ItineraryHeaderStyles>
      </ItineraryHeaderResponsiveStyles>

      <ItineraryStats
        itinerary={itinerary}
        itineraryName={itineraryName}
        itineraryUrl={itineraryUrl}
        itineraryId={itineraryId}
        itineraryRatingScore={itineraryRatingScore}
        itineraryRatingCounter={itineraryRatingCounter}
        itineraryPublished={itineraryPublished}
        itineraryDescription={itineraryDescription}
        itineraryCreatedBy={itineraryCreatedBy}
        itineraryCreator={creator}
        itineraryViews={itineraryViews}
        setShowReviews={setShowReviews as (show: string | boolean) => void}
        t={t}
        user={user}
        language={language}
        hasItinerary={hasItinerary}
        updateItineraryHandler={updateItineraryHandler}
        itineraryLikesCounter={itineraryLikesCounter}
        commentsCounter={commentsCounter}
        setCreator={setCreator}
        creator={creator}
        itineraryTime={itineraryTime}
        itineraryAttractions={itineraryAttractions}
        errors={errors}
        setPublished={setPublished}
        setUnpublished={setUnpublished}
        setSaved={setSaved}
      />
    </>
  );
};

export default React.memo(ItineraryHeader);
// @ts-nocheck -- legacy itinerary migration; restore strict checking with its follow-up conversion.
