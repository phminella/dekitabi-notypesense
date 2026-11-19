import { NoAttractionsStyles } from "./styles/NoAttractionsStyles";
import Head from "next/head";
import OrderBackground from "../OrderComplete/OrderBackground";
import Image from "next/image";
import React from "react";

interface ItineraryEnableCookiesProps {
  t: (key: string) => string;
}

const ItineraryEnableCookies = ({ t }: ItineraryEnableCookiesProps) => {
  return (
    <NoAttractionsStyles>
      <Head>
        <title>{t("enableCookiesItinerary")}</title>
      </Head>
      <OrderBackground />
      <div className="noattractions-wrapper" style={{ textAlign: "center" }}>
        <h2 className="flex-wrapper-ten">
          <Image height={45} width={45} src="/img/icon-alert.svg" alt="alert" />
          {t("enableCookiesItinerary")}
        </h2>
      </div>
    </NoAttractionsStyles>
  );
};
export default React.memo(ItineraryEnableCookies);
