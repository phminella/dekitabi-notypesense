import { ActivityCheckboxesStyles } from "./styles/ActivityCheckboxesStyles.js";
import Spinner from "../../UI/Spinner.js";
import dynamic from "next/dynamic";
import Image from "next/image.js";
const WithStripe = dynamic(() => import("./WithStripe"), {
  ssr: false,
  loading: () => <Spinner />,
});
const WithAvailability = dynamic(() => import("./WithAvailability"), {
  ssr: false,
  loading: () => <Spinner />,
});
const StripeLink = dynamic(() => import("../../UI/StripeLink"), { ssr: false });
const ActivityCheckboxes = ({
  t,
  activity,
  setActivity,
  user,
  setShowModal,
}) => {
  return (
    <ActivityCheckboxesStyles>
      <div className="checkboxes-info">
        <Image
          src="/img/icon-info2.svg"
          alt="activity-information"
          height={20}
          width={20}
        />
        <p>
          {t("shops:completeStripe")}{" "}
          <StripeLink
            buttonText={t("viewDetails")}
            // onClick={() => setShowSettings(false)}
          />
        </p>
      </div>
      {user?.verified === "true" && (
        <p className="checkboxes-info">
          <Image
            src="/img/icon-help.svg"
            alt="activity-information"
            height={20}
            width={20}
          />
          {t("shops:withStripeMsg2")}
        </p>
      )}
      <div className="checkboxes-wrapper">
        <WithStripe
          t={t}
          activity={activity}
          setActivity={setActivity}
          user={user}
        />
        <WithAvailability
          t={t}
          activity={activity}
          setActivity={setActivity}
          setShowModal={setShowModal}
        />
      </div>
    </ActivityCheckboxesStyles>
  );
};
export default ActivityCheckboxes;
