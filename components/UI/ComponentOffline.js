import { ComponentOfflineStyles } from "./styles/ComponentOfflineStyles";
import { useTranslation } from "next-i18next";
const ComponentOffline = () => {
  const { t } = useTranslation();
  return (
    <ComponentOfflineStyles>
      <div className="offline-wrapper">
        <h2>{t("offline")}</h2>
      </div>
    </ComponentOfflineStyles>
  );
};
export default ComponentOffline;
