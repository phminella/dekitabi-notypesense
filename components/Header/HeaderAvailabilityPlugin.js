import { HeaderAvailabilityPluginStyles } from "./styles/HeaderAvailabilityPluginStyles";
const HeaderAvailabilityPlugin = ({ t }) => {
  return (
    <HeaderAvailabilityPluginStyles>
      <p>{t("selectAvailableDates")}</p>
      <p className="sub-title">{t("keepAvailability")}</p>
    </HeaderAvailabilityPluginStyles>
  );
};
export default HeaderAvailabilityPlugin;
