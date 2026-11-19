import { useSelector } from "react-redux";
import { NoItinerariesStyles } from "./styles/NoItinerariesStyles";
import Image from "next/image";
const NoItineraries = ({ t }) => {
  const user = useSelector((state) => state.app.user);
  return (
    <NoItinerariesStyles>
      <h3>{t("noItineraries")}</h3>
      <ul>
        <li>
          <div className="icon-wrapper">
            <Image
              src="/img/icon-plus.svg"
              height={15}
              width={15}
              alt="add-itinerary-to-dekitabi-itineraries"
            />
          </div>
          {t("noItineraries1")}
        </li>
        <li>
          <Image
            src="/img/icon-map-pin2.svg"
            height={25}
            width={25}
            alt="no-dekitabi-itineraries"
          />
          {t("noItineraries2")}
        </li>
        {user?.guide === "true" ? (
          <li>
            <Image
              src="/img/icon-publish.svg"
              height={25}
              width={25}
              alt="publish-itinerary-to-dekitabi-itineraries"
            />
            {t("publish")}
          </li>
        ) : (
          <>
            <li>
              <Image
                src="/img/icon-add-guide.svg"
                height={25}
                width={25}
                alt="add-tour-guide-to-dekitabi-itineraries"
              />
              {t("chooseGuide")}
            </li>
            <li>
              <Image
                src="/img/icon-cart.svg"
                height={25}
                width={25}
                alt="add-dekitabi-tour-to-cart"
              />
              {t("checkout")}
            </li>
          </>
        )}
      </ul>
    </NoItinerariesStyles>
  );
};
export default NoItineraries;
