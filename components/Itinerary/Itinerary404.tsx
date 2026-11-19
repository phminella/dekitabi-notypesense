import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import { Itinerary404Styles } from "./styles/Itinerary404Styles";
import React from "react";

interface Itinerary404Props {
  t: (key: string) => string;
}

const Itinerary404 = ({ t }: Itinerary404Props) => {
  const router = useRouter();
  return (
    <Itinerary404Styles>
      <div className="loader-text">
        <h1>
          404<span>!</span>dekitabi
        </h1>
        <p>{t("itinerary404")}</p>
        <a onClick={() => router?.back()}>
          <Image height={15} width={15} src="/img/icon-back.svg" alt="map2" />
          {t("goBack")}
        </a>
      </div>
    </Itinerary404Styles>
  );
};
export default React.memo(Itinerary404);
