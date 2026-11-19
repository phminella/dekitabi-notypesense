import ShopsSteps from "./ShopsSteps";
import Link from "next/link";
import Image from "next/image";
import { ShopsStyles } from "./styles/ShopsStyles";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import ShopVideos from "./ShopVideos";
import ShopsFAQ from "./ShopsFAQ/ShopsFAQ";
const Shops = () => {
  const background = require("../../../public/img/affiliates/dekitabi-facebook.webp");
  const { t } = useTranslation();
  return (
    <ShopsStyles>
      <div className="affiliate-home-wrapper">
        <div className="affiliate-title-wrapper">
          <div className="home-title">
            <h1>{t("shops:shopsTitle")}</h1>
            <p className="subtitle">{t("shops:shopsSubtitle")}</p>
            <ul>
              <li>
                <div className="circle"></div>
                {t("shops:shopsItem1")}
              </li>
              <li>
                <div className="circle"></div>
                {t("shops:shopsItem2")}
              </li>
              <li>
                <div className="circle"></div>
                {t("shops:shopsItem3")}
              </li>
            </ul>
            <div className="home-buttons">
              <Link className="join-us" href={`/shop/sign-up`} prefetch={false}>
                {t("shops:joinUs")}
              </Link>
              <Link href={`/contact-us`} prefetch={false}>
                {t("shops:contactUsButton")}
              </Link>
            </div>
          </div>
          <ShopVideos />
        </div>
      </div>
      <div className="clients">
        <p className="title">{t("shops:shopsMsg1")}</p>
      </div>
      <ShopsSteps t={t} />
      <ShopsFAQ t={t} />
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
          sizes="100vw"
          loading="eager"
          placeholder="blur"
        />
        <h2>{t("shops:shopsMsg2")}</h2>
      </div>
    </ShopsStyles>
  );
};
export default Shops;
