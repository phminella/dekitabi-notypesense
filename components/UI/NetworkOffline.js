import { NetworkOfflineStyles } from "./styles/NetworkOfflineStyles";
import useNetwork from "../../lib/useNetwork";
import { useTranslation } from "next-i18next";
const NetworkOffline = ({ isHome }) => {
  const { t } = useTranslation();
  const {isOnline} = useNetwork();
  if (isOnline) return <></>;
  return (
    <NetworkOfflineStyles className={isHome ? "is-home" : "not-home"}>
      {t("offline")}
    </NetworkOfflineStyles>
  );
};
export default NetworkOffline;
