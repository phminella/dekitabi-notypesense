import NotFound from "../UI/NotFound";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
const RedirectApp = () => {
  const { t } = useTranslation();
  const [showNotAvailable, setShowNotAvailable] = useState(false);
  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }
    const userAgent = navigator.userAgent || navigator.vendor || "";
    if (/(iPhone|iPod|iPad)/i.test(userAgent)) {
      setShowNotAvailable(true);
      return;
    }
    if (/android/i.test(userAgent)) {
      window.location.replace(
        "https://play.google.com/store/apps/details?id=com.dekitabi"
      );
      return;
    }
    setShowNotAvailable(true);
  }, []);
  if (!showNotAvailable) {
    return <></>;
  }
  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <NotFound message={t("appNotAvailable")}></NotFound>
    </div>
  );
};
export default RedirectApp;
