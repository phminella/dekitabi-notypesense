import { BecomeGuideCompetitionStyles } from "./styles/BecomeGuideCompetitionStyles";
const BecomeGuideCompetition = ({ t }) => {
  return (
    <BecomeGuideCompetitionStyles>
      <div className="table">
        <div className="column">
          <div className="row"></div>
          <div className="row label">{t("guides:serviceFee")}</div>
        </div>
        <div className="column">
          <div className="row">
            <img
              src="/img/logo.png"
              width={"100%"}
              alt="dekitabi-logo"
              className="logo"
            />
          </div>
          <div className="row">
            <b>10%</b>
          </div>
        </div>
        <div className="column">
          <div className="row">
            <img
              src="/img/affiliates/get-your-guide.svg"
              width={"100%"}
              alt="get-your-guide-logo"
              className="get-your-guide"
            />
          </div>
          <div className="row">20%-30%</div>
        </div>{" "}
        <div className="column">
          <div className="row">
            <img
              src="/img/affiliates/viator.svg"
              width={"100%"}
              alt="viator"
              className="viator"
            />
          </div>
          <div className="row">25%</div>
        </div>
        <div className="column">
          <div className="row">
            <img
              src="/img/affiliates/klook.svg"
              width={"100%"}
              alt="viator"
              className="viator"
            />
          </div>
          <div className="row">15%-25%</div>
        </div>
      </div>
    </BecomeGuideCompetitionStyles>
  );
};
export default BecomeGuideCompetition;
