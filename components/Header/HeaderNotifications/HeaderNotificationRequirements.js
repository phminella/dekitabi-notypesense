import { HeaderNotificationRequirementsStyles } from "./styles/HeaderNotificationRequirementsStyles";
import Image from "next/image";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
const StripeLink = dynamic(() => import("../../UI/StripeLink"), { ssr: false });
const HeaderNotificationRequirements = ({
  t,
  user,
  setShowNotifications,
  notification,
}) => {
  const stripeRequirements =
    user?.stripeAccountRequirements || user?.stripeRequirements;
  return (
    <HeaderNotificationRequirementsStyles>
      <Image height={15} width={15} src={`/img/icon-info2.svg`} alt="dekitabi-notification-type" />
      <div>
        <p>{t(notification)}</p>
        <StripeLink
          onClick={() => setShowNotifications(false)}
          buttonText={
            notification === "requirements.pending_verification"
              ? t("edit")
              : t("addInformation")
          }
        />
        {stripeRequirements?.current_deadline &&
          notification === "missingInformation" && (
            <p>
              <b>
                {t("deadline", {
                  deadline: dayjs(stripeRequirements?.current_deadline).format(
                    "MM/DD/YYYY, h:mm:ss a"
                  ),
                })}
              </b>
            </p>
          )}
      </div>
    </HeaderNotificationRequirementsStyles>
  );
};
export default HeaderNotificationRequirements;
