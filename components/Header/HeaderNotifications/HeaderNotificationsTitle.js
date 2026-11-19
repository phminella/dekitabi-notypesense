import { HeaderNotificationsTitleStyles } from "./styles/HeaderNotificationsTitleStyles.js";
import Image from "next/image";
const HeaderNotificationsTitle = ({ t }) => {
  return (
    <HeaderNotificationsTitleStyles className="flex-wrapper-five">
      <Image
        height={18}
        width={18}
        src="/img/icon-notification.svg"
        alt="dekitabi-notifications"
      />{" "}
      {t("notifications")}
    </HeaderNotificationsTitleStyles>
  );
};
export default HeaderNotificationsTitle;
