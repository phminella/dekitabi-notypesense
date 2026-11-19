import { ShareForDiscountsStyles } from "./styles/ShareForDiscountsStyles";
import { useTranslation } from "next-i18next";
import HomeDiscount from "../Home/HomeDiscount";
import Image from "next/image";
import useItinerary from "../../lib/useItinerary";
import { useRouter } from "next/router";
const ShareForDiscounts = () => {
  const { t } = useTranslation();
  const { newItinerary } = useItinerary();
  const router = useRouter();
  return (
    <ShareForDiscountsStyles>
      <HomeDiscount t={t} />
      <div className="discount-details-wrapper">
        <h1>{t("shareForDiscounts")}</h1>
        <ul>
          <li>
            <div className="circle"></div>
            {t("shareForDiscountsMsg6")}
            <br />
            {t("shareForDiscountsMsg7")}
          </li>
          <li>
            <div className="circle"></div>
            {t("shareForDiscountsMsg8")}
          </li>
          <li>
            <div className="circle"></div>
            {t("shareForDiscountsMsg9")}
          </li>
          <button
            className="normal-button"
            onClick={() => {
              newItinerary().then((data) => {
                router.push("/itinerary/" + data);
              });
            }}
          >
            <Image
              src="/img/icon-itinerary2.svg"
              alt="new-itinerary"
              height={30}
              width={30}
              priority={true}
            />
            {t("startTrip2")}
          </button>
        </ul>
      </div>
    </ShareForDiscountsStyles>
  );
};
export default ShareForDiscounts;
