import BecomeGuideCompetition from "./BecomeGuideCompetition";
import BecomeGuideOfferMore from "./BecomeGuideOfferMore";
import BecomeGuideSteps from "./BecomeGuideSteps";
import BecomeGuideHeader from "./BecomeGuideHeader";
import Link from "next/link";
import Image from "next/image";
import { BecomeGuideStyles } from "./styles/BecomeGuideStyles";
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux";
import { setShowLogin } from "../../store/appSlice";
import SignInModal from "../User/SignInModal";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Spinner from "../UI/Spinner";
const GuidesList = dynamic(() => import("../Misc/Guides"), {
  ssr: false,
  loading: () => <Spinner />,
});
const BecomeGuide = () => {
  const dispatch = useDispatch();
  const background = require("../../public/img/affiliates/dekitabi-facebook.webp");
  const { t } = useTranslation();
  const user = useSelector((state) => state.app.user);
  return (
    <BecomeGuideStyles>
      <SignInModal user={user} t={t} />
      <BecomeGuideHeader t={t} user={user} />
      <div className="affiliate-home-wrapper">
        <div className="affiliate-title-wrapper">
          <div className="home-title">
            <h1>{t("guides:homeMsg1")}</h1>
            <p className="subtitle">{t("guides:homeMsg2")}</p>
            <ul>
              <li>
                <div className="circle"></div>
                {t("guides:homeMsg3")}
              </li>
              <li>
                <div className="circle"></div>
                {t("guides:homeMsg4")}
              </li>
              <li>
                <div className="circle"></div>
                {t("guides:homeMsg5")}
              </li>
              <li>
                <div className="circle"></div>
                {t("guides:homeMsg8")}
              </li>
            </ul>
            <div className="home-buttons">
              {!user?.uid && (
                <button
                  className="join-us"
                  onClick={() => dispatch(setShowLogin(true))}
                >
                  {t("guides:joinUs")}
                </button>
              )}
              <Link prefetch={false} href={`/guides-general-information`}>
                {t("guides:manuals")}
              </Link>
            </div>
          </div>
          <BecomeGuideCompetition t={t} />
        </div>
      </div>
      <div className="clients">
        <p className="title">{t("guides:homeMsg6")}</p>
      </div>
      <BecomeGuideOfferMore t={t} />
      <BecomeGuideSteps t={t} />
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
        <h1>{t("guides:homeMsg7")}</h1>
      </div>
      <div className="clients join-us">
        <p className="title">{t("guides:joinUs")}</p>
      </div>
      <GuidesList />
    </BecomeGuideStyles>
  );
};
export default BecomeGuide;
