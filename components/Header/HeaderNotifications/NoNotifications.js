import { NoNotificationsStyles } from "./styles/NoNotificationsStyles";
import Image from "next/image";
const NoNotifications = ({t}) => {
  return (
    <NoNotificationsStyles>
      <div>
        <Image
          height={100}
          width={100}
          src="/img/icon-notification.svg"
          alt="no-dekitabi-notifications"
        />
        <br />
        {t("noNotifications")}
      </div>
    </NoNotificationsStyles>
  );
};
export default NoNotifications;
