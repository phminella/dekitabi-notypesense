import { AffiliateCompetitionStyles } from "./styles/AffiliateCompetitionStyles";
import Image from "next/image";
const AffiliateCompetition: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
}> = ({ t }) => {
  return (
    <AffiliateCompetitionStyles>
      <div className="table">
        <div className="column">
          <div className="row"></div>
          <div className="row label">{t("affiliate:commission")}</div>
          <div className="row label">{t("affiliate:cookieDuration")}</div>
        </div>
        <div className="column">
          <div className="row">
            <Image
              src="/img/logo.png"
              width={160}
              height={52}
              alt="dekitabi-logo"
              className="logo"
            />
          </div>
          <div className="row">
            <b>9%</b>
          </div>
          <div className="row">
            <b>{t("affiliate:unlimited")}</b>
          </div>
        </div>
        <div className="column">
          <div className="row">
            <Image
              src="/img/affiliates/get-your-guide.svg"
              width={160}
              height={52}
              alt="get-your-guide-logo"
              className="get-your-guide"
            />
          </div>
          <div className="row">8%</div>
          <div className="row">{t("affiliate:days", { days: 30 })}</div>
        </div>{" "}
        <div className="column">
          <div className="row">
            <Image
              src="/img/affiliates/viator.svg"
              width={160}
              height={52}
              alt="viator"
              className="viator"
            />
          </div>
          <div className="row">8%</div>
          <div className="row">{t("affiliate:days", { days: 30 })}</div>
        </div>
        <div className="column">
          <div className="row">
            <Image
              src="/img/affiliates/klook.svg"
              width={160}
              height={52}
              alt="viator"
              className="viator"
            />
          </div>
          <div className="row">2-5%</div>
          <div className="row">{t("affiliate:days", { days: 30 })}</div>
        </div>
      </div>
    </AffiliateCompetitionStyles>
  );
};
export default AffiliateCompetition;
