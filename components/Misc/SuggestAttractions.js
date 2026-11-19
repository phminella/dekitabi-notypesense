import { useTranslation } from "next-i18next";
import Build from "../S/Build/Build";
import { useSelector } from "react-redux";
const SuggestAttractions = () => {
  const language = useSelector((state) => state.app.language);
  const { t } = useTranslation();
  return (
    <div style={{ paddingTop: "10px" }}>
      <Build t={t} language={language}></Build>
    </div>
  );
};
export default SuggestAttractions;
