import { useTranslation } from "next-i18next";
import { VerifyWithStripeStyles } from "./styles/VerifyWithStripeStyles";
import dynamic from "next/dynamic";
const StripeLink = dynamic(() => import("../UI/StripeLink"), { ssr: false });
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import { useSelector } from "react-redux";
import Spinner from "../UI/Spinner";
const VerifyWithStripe = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.app.user);
  if (!user) return <Spinner />;
  return (
    <VerifyWithStripeStyles>
      <div className="verify-wrapper">
        <h1>{t("getReady3")}</h1>
        <div className="stripe-wrapper">
          <Image
            height={45}
            width={45}
            src="/img/icon-stripe.svg"
            alt="stripe"
          />
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(t("poweredByStripe"), {
                USE_PROFILES: { html: true },
              }),
            }}
          ></p>
        </div>
        <h2>{t("verifyTo")}:</h2>
        <p className="check-list">
          <Image
            height={15}
            width={15}
            src="/img/icon-check.svg"
            alt="checked"
          />
          {t("verifyTo4")}
        </p>
        <p className="check-list">
          <Image
            height={15}
            width={15}
            src="/img/icon-check.svg"
            alt="checked"
          />
          {t("verifyTo2")}
        </p>
        <p className="check-list">
          <Image
            height={15}
            width={15}
            src="/img/icon-check.svg"
            alt="checked"
          />
          {t("verifyTo1")}
        </p>

        {user?.verified === "true" && (
          <p className="verified">{t("accountIsVerified")}</p>
        )}
        {user?.verified !== "true" && user?.uid && (
          <>
            <div className="stripe-button">
              <StripeLink>
                <p>{t("verifyIdentity")}</p>
              </StripeLink>
            </div>
            <p className="warning">{t("accountVerificationTime")}</p>
          </>
        )}
        {!user?.uid && (
          <p className="error-message">&#9940;{t("signInToVerify")}</p>
        )}
      </div>
      <div className="personal-info-msg">
        <div className="personal-info-detail">
          <h2>{t("whatInfoShared")}</h2>
          <p>{t("whatInfoShared2")}</p>
        </div>
        <div className="personal-info-detail">
          <h2>{t("whichDetailsEdit")}</h2>
          <p>{t("whichDetailsEdit2")}</p>
        </div>
      </div>
    </VerifyWithStripeStyles>
  );
};
export default VerifyWithStripe;
