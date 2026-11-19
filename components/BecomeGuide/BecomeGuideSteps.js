import { BecomeGuideStepsStyles } from "./styles/BecomeGuideStepsStyles";
const BecomeGuideSteps = ({t}) => {
  return (
    <BecomeGuideStepsStyles>
      <p className="steps-title">{t("guides:itsSimple")}</p>
      <ul>
        <li className="item-name">
          <div className="circle">1</div>{t("guides:createAccount")}
        </li>
        <li>
          <div className="circle-2"></div>
        </li>
        <li>
          <div className="circle-2"></div>
        </li>
        <li className="item-name">
          <div className="circle">2</div>{t("guides:customizeProfile")}
        </li>
        <li>
          <div className="circle-2"></div>
        </li>
        <li>
          <div className="circle-2"></div>
        </li>
        <li className="item-name">
          <div className="circle">3</div>{t("guides:buildItineraries")}!
        </li>
      </ul>
    </BecomeGuideStepsStyles>
  );
};
export default BecomeGuideSteps;
