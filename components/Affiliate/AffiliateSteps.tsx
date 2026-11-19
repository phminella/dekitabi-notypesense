import { AffiliateStepsStyles } from "./styles/AffiliateStepsStyles";
const AffiliateSteps: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
}> = ({ t }) => {
  return (
    <AffiliateStepsStyles>
      <p className="steps-title">{t("affiliate:itsSimple")}</p>
      <ul>
        <li className="item-name">
          <div className="circle">1</div>
          {t("affiliate:createAccount")}
        </li>
        <li>
          <div className="circle-2"></div>
        </li>
        <li>
          <div className="circle-2"></div>
        </li>
        <li className="item-name">
          <div className="circle">2</div>
          {t("affiliate:setupPayment")}
        </li>
        <li>
          <div className="circle-2"></div>
        </li>
        <li>
          <div className="circle-2"></div>
        </li>
        <li className="item-name">
          <div className="circle">3</div>
          {t("affiliate:share")}!
        </li>
      </ul>
    </AffiliateStepsStyles>
  );
};
export default AffiliateSteps;
