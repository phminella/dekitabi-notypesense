import { ShopProfileTabsStyles } from "./styles/ShopProfileTabsStyles";
import Image from "next/image";
const ShopProfileTabs = ({ t, tab, setTab, isOwner }) => {
  return (
    <ShopProfileTabsStyles>
      <li className={tab === "activities" ? "active" : ""}>
        <button onClick={() => setTab("activities")}>
          <Image
            height={22}
            width={22}
            src="/img/icon-list.svg"
            alt="settings"
            className="icons"
          ></Image>
          <span>{t("shops:activities")}</span>
        </button>
      </li>
      <li className={tab === "details" ? "active" : ""}>
        <button onClick={() => setTab("details")}>
          <Image
            height={22}
            width={22}
            src="/img/icon-shop.svg"
            alt="date"
            className="icons"
          ></Image>
          <span>{t("shops:shopDetails")}</span>
        </button>
      </li>
      {isOwner && (
        <li className={tab === "account" ? "active" : ""}>
          <button onClick={() => setTab("account")}>
            <Image
              height={22}
              width={22}
              src="/img/icon-settings.svg"
              alt="settings"
              className="icons"
            ></Image>
            <span> {t("account")}</span>
          </button>
        </li>
      )}
    </ShopProfileTabsStyles>
  );
};
export default ShopProfileTabs;
