import { ShopsStepsStyles } from "./styles/ShopsStepsStyles";
const ShopsSteps = ({t}) => {
  return (
    <ShopsStepsStyles>
      <p className="steps-title">{t("shops:shopsStepsTitle")}</p>
      <ul>
        <li className="item-name">
          <div className="circle">1</div>{t("shops:shopsSteps1")}
        </li>
        <li>
          <div className="circle-2"></div>
        </li>
        <li>
          <div className="circle-2"></div>
        </li>
        <li className="item-name">
          <div className="circle">2</div>{t("shops:shopsSteps2")}
        </li>
        <li>
          <div className="circle-2"></div>
        </li>
        <li>
          <div className="circle-2"></div>
        </li>
        <li className="item-name">
          <div className="circle">3</div>{t("shops:shopsSteps3")}
        </li>
      </ul>
    </ShopsStepsStyles>
  );
};
export default ShopsSteps;
