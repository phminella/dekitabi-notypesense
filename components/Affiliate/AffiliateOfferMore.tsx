import { AffiliateOfferMoreStyles } from "./styles/AffiliateOfferMoreStyles";
// const ItineraryVideo = dynamic(() => import("../Misc/ItineraryVideo"), {
//   ssr: false,
//   loading: () => <Spinner />,
// });
import isMobile from "../../lib/isMobile";
const AffiliateOfferMore: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
}> = ({ t }) => {
  return (
    <AffiliateOfferMoreStyles>
      <h2>{t("affiliate:standOut")}</h2>
      <p className="subtitle">{t("affiliate:standOut2")}</p>
    </AffiliateOfferMoreStyles>
  );
};
export default AffiliateOfferMore;
