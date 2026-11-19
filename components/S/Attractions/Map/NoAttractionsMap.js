import { NoAttractionsMapStyles } from "./styles/NoAttractionsMapStyles";
import NotFound from "../../../UI/NotFound";
const NoAttractionsMap = ({ t, noAttractions }) => {
  return (
    <NoAttractionsMapStyles className={noAttractions ? "show" : ""}>
      <h2>{t("noAttractions")}</h2>
    </NoAttractionsMapStyles>
  );
};
export default NoAttractionsMap;
