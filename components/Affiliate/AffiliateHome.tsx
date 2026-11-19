import AffiliateCompetition from "./AffiliateCompetition";
import AffiliateOfferMore from "./AffiliateOfferMore";
import AffiliateSteps from "./AffiliateSteps";
import { AffiliateHomeStyles } from "./styles/AffiliateHomeStyles";
import Link from "next/link";
import Image from "next/image";
import AffiliateFAQ from "./AffiliateFAQ/AffiliateFAQ";
const AffiliateHome: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
}> = ({ t }) => {
  const background = require("../../public/img/bg/Japan/2.webp");
  return (
    <AffiliateHomeStyles>
      <div className="affiliate-home-wrapper">
        <div className="affiliate-title-wrapper">
          <div className="home-title">
            <h1>{t("affiliate:homeMsg1")}</h1>
            <p className="subtitle">{t("affiliate:homeMsg2")}</p>
            <ul>
              <li>
                <div className="circle"></div>
                {t("affiliate:homeMsg3")}
              </li>
              <li>
                <div className="circle"></div>
                {t("affiliate:homeMsg4")}
              </li>
              <li>
                <div className="circle"></div>
                {t("affiliate:homeMsg5")}
              </li>
            </ul>
            <div className="home-buttons">
              <Link
                className="join-us"
                href={`/affiliate-program/sign-up`}
                prefetch={false}
              >
                {t("affiliate:joinUs")}
              </Link>
              <Link href={`/contact-us`} prefetch={false}>
                {t("affiliate:contactSales")}
              </Link>
            </div>
          </div>
          <AffiliateCompetition t={t} />
        </div>
      </div>
      <div className="clients">
        <p className="title">{t("affiliate:homeMsg6")}</p>
      </div>
      <AffiliateOfferMore t={t} />
      <AffiliateSteps t={t} />
      <AffiliateFAQ t={t} />
      <div className="bg-wrapper">
        <Image
          style={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
          className="wrapper-background"
          alt="background"
          fill
          priority={true}
          src={background}
          quality={70}
          sizes="100vw, (max-width: 280px) 50vw"
          loading="eager"
          placeholder="blur"
        />
        <h1>{t("affiliate:homeMsg7")}</h1>
      </div>
    </AffiliateHomeStyles>
  );
};
export default AffiliateHome;
