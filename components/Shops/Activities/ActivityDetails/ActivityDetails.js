import ShopDetail from "../../ShopProfile/Details/ShopDetail";
import ActivityPrice from "./ActivityPrice";
import ActivityHours from "./ActivityHours";
import ActivityIncluded from "./ActivityIncluded";
import { ShopDetailsStyles } from "../../ShopProfile/Details/styles/ShopDetailsStyles";
import MapWrapper from "../../../Attraction/Map/MapWrapper";
import { useSelector } from "react-redux";
const ActivityDetails = ({ activity, t, isOwner, setShowEditModal }) => {
  const language = useSelector((state) => state?.app?.language);
  return (
    <ShopDetailsStyles>
      <ShopDetail
        field={"persons"}
        shopProfile={activity}
        t={t}
        isOwner={isOwner}
        setShowEditModal={setShowEditModal}
      />
      <ShopDetail
        field={"duration"}
        shopProfile={activity}
        t={t}
        isOwner={isOwner}
        setShowEditModal={setShowEditModal}
      />
      <ActivityPrice
        activity={activity}
        t={t}
        isOwner={isOwner}
        setShowEditModal={setShowEditModal}
      />
      <ActivityIncluded
        activity={activity}
        t={t}
        isOwner={isOwner}
        setShowEditModal={setShowEditModal}
      />
      {isOwner &&
      <ShopDetail
        field={"activityPage"}
        shopProfile={activity}
        t={t}
        isOwner={isOwner}
        setShowEditModal={setShowEditModal}
      />}
      <ShopDetail
        field={"activityAddress"}
        shopProfile={activity}
        t={t}
        isOwner={isOwner}
        setShowEditModal={setShowEditModal}
      />
      {activity?._geoloc?.length === 2 && (
        <div className="map">
          <MapWrapper
            attraction={{ _geoloc: activity._geoloc }}
            language={language}
          />
        </div>
      )}
      <ActivityHours
        activity={activity}
        setShowEditModal={setShowEditModal}
        isOwner={isOwner}
        t={t}
      />
    </ShopDetailsStyles>
  );
};
export default ActivityDetails;
