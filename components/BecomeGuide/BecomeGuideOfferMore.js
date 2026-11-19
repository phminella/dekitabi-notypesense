import { BecomeGuideOfferMoreStyles } from "./styles/BecomeGuideOfferMoreStyles";
import dynamic from "next/dynamic";
import Spinner from "../UI/Spinner";
const ItineraryVideo = dynamic(() => import("../Misc/ItineraryVideo"), {
  ssr: false,
  loading: () => <Spinner />,
});
import isMobile from "../../lib/isMobile";
const BecomeGuideOfferMore = ({ t }) => {
  const mobile = isMobile();
  return (
    <BecomeGuideOfferMoreStyles>
      <h2>{t("guides:standOut")}</h2>
      <p className="subtitle">{t("guides:standOut2")}</p>
      {/* <ItineraryVideo isMobile={false} t={t} /> */}
    </BecomeGuideOfferMoreStyles>
  );
};
export default BecomeGuideOfferMore;
