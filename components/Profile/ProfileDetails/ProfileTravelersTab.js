import { ProfileTravelersTabStyles } from "./styles/ProfileTravelersTabStyles";
import Image from "next/image";
const ProfileTravelersTab = ({ tab, setTab, t }) => {
  return (
    <ProfileTravelersTabStyles>
      <button
        className={tab === "itinerary" ? "active" : ""}
        onClick={() => {
          setTab("itinerary");
        }}
      >
        <Image
          height={28}
          width={28}
          src="/img/icon-itinerary2.svg"
          alt="dekitabi-itineraries"
        />
        {t("published")}
      </button>
      <button
        className={tab === "liked" ? "active" : ""}
        onClick={() => {
          setTab("liked");
        }}
      >
        <Image
          height={28}
          width={28}
          src="/img/icon-heart.svg"
          alt="dekitabi-liked-itineraries"
        />
        {t("liked")}
      </button>
    </ProfileTravelersTabStyles>
  );
};
export default ProfileTravelersTab;
