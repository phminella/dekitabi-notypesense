import { HeaderNotificationsTitleStyles } from "../HeaderNotifications/styles/HeaderNotificationsTitleStyles.js";
import Image from "next/image";
const HeaderSettingsTitle = ({ t }) => {
  return (
    <HeaderNotificationsTitleStyles className="flex-wrapper-five">
      <Image
        height={20}
        width={20}
        src="/img/icon-web.svg"
        alt="dekitabi-account-settings"
      />{" "}
      {t("settings")}
    </HeaderNotificationsTitleStyles>
  );
};
export default HeaderSettingsTitle;
