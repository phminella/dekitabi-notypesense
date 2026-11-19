import { HomeReviewsStyles } from "./styles/HomeReviewsStyles";
import { useMemo } from "react";
import HomeReview from "./HomeReview";
import { TFunction } from "next-i18next";
import { HomeReviewItem, Language } from "../../../types/home";

interface HomeReviewsProps {
  t: TFunction;
  language: Language;
}

const HomeReviews = ({ t, language }: HomeReviewsProps): JSX.Element | null => {
  const reviews: HomeReviewItem[] = useMemo(() => [
    {
      platform: "App Store Mexico",
      message:
        "If you prefer to make better use of your time it suggests you hire guides by location. You carry the itinerary on your mobile device, you don't need anything else.",
      translation: t("homeReview1"),
      store: "appstore",
      lang: "en",
    },
    {
      platform: "Play Store",
      message:
        "Very handy and easy to use. The app is nice & colorful and creating itineraries is quite straightforward.",
      translation: t("homeReview2"),
      store: "playstore",
      lang: "en",
    },
    {
      platform: "Google",
      message:
        "Buen precio. Los precios pueden cambiar de un guía para otro pero los precios son muy buenos para 2 o más personas.",
      translation: t("homeReview3"),
      store: "google",
      lang: "es",
    },
  ], [t]);

  if (!language?.code) return null;

  return (
    <HomeReviewsStyles>
      {reviews.map((review) => (
        // Use a stable key (platform) instead of array index
        <HomeReview
          t={t}
          key={review.platform}
          review={review}
          showTranslate={language?.code !== review?.lang}
        />
      ))}
    </HomeReviewsStyles>
  );
};

export default HomeReviews;
