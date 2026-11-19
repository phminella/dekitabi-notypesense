import { OfflineStyles } from "./styles/OfflineStyles";
import { useTranslation } from "next-i18next";
import Image from "next/image";
const Offline = () => {
  const { t } = useTranslation();
  return (
    <OfflineStyles>
      <div className="offline-wrapper">
        <Image
          src="/img/logo.png"
          height={45}
          width={141}
          alt="logo"
          priority={true}
        />
        <div className="offline">
          <h2>{t("offline")}</h2>
        </div>
      </div>
    </OfflineStyles>
  );
};
export default Offline;
