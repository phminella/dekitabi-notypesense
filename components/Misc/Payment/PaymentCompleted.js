import { PaymentCompletedStyles } from "./styles/PaymentCompletedStyles.js";
import Image from "next/image.js";
import Link from "next/link.js";
import Price from "../../UI/Price.js";
import { useCallback, useEffect, useState } from "react";
import useTour from "../../../lib/useTour.js";
import ConfirmingTour from "../../Account/AccountTours/ConfirmingTour.js";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getDoc, getFirestore, doc } from "firebase/firestore/lite";
import { useTranslation } from "next-i18next";
import TourError from "../TourError.js";
const PaymentCompleted = ({ t, user, tour }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { confirmTour } = useTour();
  const { i18n } = useTranslation();
  const confirmPaidTour = useCallback(async () => {
    if (!tour?.id || !user?.uid) {
      setError(true);
      setLoading(false);
      return;
    }
    try {
      await confirmTour(user, tour, tour?.paymentIntentId);
      const guideRef = doc(getFirestore(), "users", tour?.guide);
      const guideSnap = await getDoc(guideRef);
      const guide = guideSnap?.data();
      const guideLanguage =
        guide?.language?.code === "zh-TW"
          ? "zh_tw"
          : guide?.language?.code === "zh-CN"
          ? "zh_cn"
          : guide?.language?.code === "fil"
          ? "tl"
          : guide?.language?.code;
      i18n.loadLanguages(guideLanguage);
      const gl = i18n.getFixedT(guideLanguage);
      const functions = getFunctions(undefined, "asia-northeast1");
      const pushNotification = httpsCallable(functions, "pushNotification");
      const ok = await pushNotification({
        title: gl("paymentCompleted"),
        body: `${tour.name}: ${gl("paymentCompleted")}`,
        link: "https://www.dekitabi.com/account/tours",
        tokens: guide?.firebaseMessagingTokens ? guide.firebaseMessagingTokens : [],
        recipient: guide?.uid,
      });
      if (ok) {
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  }, [confirmTour, i18n, tour, user]);
  useEffect(() => {
    confirmPaidTour();
  }, [confirmPaidTour]);
  if (loading) return <ConfirmingTour t={t} />;
  if (error && !loading)
    return (
      <PaymentCompletedStyles>
        <div>
          <Image src="/img/logo.png" height={45} width={141} alt="logo" />
          <div className="payment-wrapper">
            <TourError t={t}></TourError>
          </div>
        </div>
      </PaymentCompletedStyles>
    );
  return (
    <PaymentCompletedStyles>
      <div>
        <Image src="/img/logo.png" height={45} width={141} alt="logo" />
        <div className="payment-wrapper">
          <div className="title-wrapper">
            <Image
              src="/img/icon-check.svg"
              height={50}
              width={50}
              alt="check"
            />
            <h1>{t("paymentCompleted")}</h1>
          </div>
          <p>{t("paymentCompletedMsg", { tourName: tour.name })}</p>
          <p>{t("paymentCompletedMsg2")}</p>
          <div className="payment-details-wrapper">
            <h3>{t("paymentDetails")}</h3>
            <ul className="payment-details">
              <li>
                <p>{t("tourPrice")}</p>
                <p>
                  <Price
                    currency={tour?.currency}
                    value={tour?.price}
                    conversionType={"priceWithoutFee"}
                    coupon={tour?.coupon}
                  />
                </p>
              </li>
              <li>
                <p>{t("serviceFee")}</p>
                <p>
                  <Price
                    currency={tour?.currency}
                    value={tour?.price}
                    conversionType={"priceFee"}
                    coupon={tour?.coupon}
                  />
                </p>
              </li>
              <li className="total">
                <p className="flex-wrapper-five">
                  <Image
                    src="/img/icon-check.svg"
                    height={20}
                    width={20}
                    alt="check"
                  />
                  {t("paid")}
                </p>
                <p>
                  <Price
                    currency={tour?.currency}
                    value={tour?.price}
                    conversionType={"priceWithFee"}
                    coupon={tour?.coupon}
                  />
                </p>
              </li>
            </ul>
          </div>
          <Link prefetch={false} href="/">
            {t("goHomePage")}
          </Link>
        </div>
      </div>
    </PaymentCompletedStyles>
  );
};
export default PaymentCompleted;
