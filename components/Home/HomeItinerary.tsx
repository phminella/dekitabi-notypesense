import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import { TFunction } from "next-i18next";
import { Language } from "../../types/home";
import { HomeItineraryStyles } from "./styles/HomeItineraryStyles";

interface HomeItineraryProps {
  t: TFunction;
  language: Language;
  isMobile: boolean;
}

const ItineraryVideo = dynamic(() => import("../Misc/ItineraryVideo"), {
  // Fixed: was using block-body without a return statement, so skeleton never rendered (ERROR-2)
  loading: () => <Skeleton width="100%" height="400px" />,
});

const HomeItinerary = ({
  t,
  language,
  isMobile,
}: HomeItineraryProps): JSX.Element => {
  return (
    <HomeItineraryStyles>
      <div className="title-wrapper">
        <h2>
          {String(t("homeItineraryMsg"))}
          <br />
          <span>{String(t("homeItineraryMsg2"))}</span>
        </h2>
      </div>
      <ItineraryVideo isMobile={isMobile} t={t} />
    </HomeItineraryStyles>
  );
};

export default HomeItinerary;
