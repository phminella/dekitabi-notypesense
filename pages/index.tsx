import Home from "../components/Home/Home";
import Head from "next/head";
import type { NextPage } from "next";
import getNewGuidesFromTypesense from "../lib/ssr/getNewGuidesFromTypesense";
import getItinerariesFromTypesense from "../lib/ssr/getItinerariesFromTypesense";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
export const getServerSideProps = async function (
  ctx: GetServerSidePropsContext
) {
  function sanitizeForNextJS(obj: any) {
    return JSON.parse(
      JSON.stringify(obj, (_, value) => (value === undefined ? null : value))
    );
  }
  // const popularAttractions = await getPopularAttractionsFromFirestore();
  const newGuides = await getNewGuidesFromTypesense();
  const itineraries = await getItinerariesFromTypesense();
  const UA = ctx.req.headers["user-agent"] ?? "";
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
  let prefectures = [
    {
      _geoloc: [33.55888889, 133.5313889],
      name: "Shikoku",
      search: "Kochi-City",
    },
    {
      _geoloc: [35.01777778, 135.8547222],
      name: "Shiga",
      search: "Otsu-City",
    },
    {
      _geoloc: [31.59694444, 130.5572222],
      name: "Kagoshima",
      search: "Kagoshima-City",
    },
    {
      _geoloc: [36.36583333, 140.4713889],
      name: "Ibaraki",
      search: "Mito-City",
    },
    {
      _geoloc: [34.655, 133.9197222],
      name: "Okayama",
      search: "Okayama-City",
    },
    {
      _geoloc: [36.7479, 139.6195],
      name: "Tochigi",
      search: "Nikko-City",
    },
  ];
  const lessVisited = prefectures.sort(() => Math.random() - 0.5).slice(0, 4);
  return {
    props: {
      isMobile,
      // popularAttractions,
      newGuides: sanitizeForNextJS(newGuides),
      itineraries,
      lessVisited,
      lang: ctx?.locale,
      ...(await serverSideTranslations(ctx.locale as string, ["translation"])),
    },
  };
};
const HomePage: NextPage = (pageProps: any) => {
  const languages = [
    "en",
    "ja",
    "zh_cn",
    "zh_tw",
    "ko",
    "tl",
    "id",
    "th",
    "vi",
    "ms",
    "fr",
    "es",
    "it",
    "pt",
  ];
  const { t } = useTranslation();
  if (!pageProps?._nextI18Next?.initialLocale) return <></>;
  return (
    <>
      <Head>
        <title>{t("homeTitle")}</title>
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com"
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}`}
            />
          );
        })}
        <meta name="twitter:title" content={t("dekitabi")} />
        <meta
          name="twitter:description"
          content={`${t("homeTitle")} ${t("whyDekitabiMsg5")}`}
        />
        <meta name="title" content={t("dekitabi")} />
        <meta
          name="description"
          content={`${t("homeTitle")} ${t("whyDekitabiMsg5")}`}
        />
        <meta property="og:url" content={`https://www.dekitabi.com`} />
        <meta property="og:title" content={t("dekitabi")} />
        <meta
          property="og:description"
          content={`${t("homeTitle")} ${t("whyDekitabiMsg5")}`}
        />
      </Head>
      <Home {...pageProps}></Home>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
  "@context": "https://schema.org/",
  "@type": "WebSite",
  "name": "dekitabi",
  "url": "https://www.dekitabi.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.dekitabi.com/s/{search_term_string}",
    "query-input": "required name=search_term_string"
  }
}`,
        }}
      ></script>
    </>
  );
};

export default HomePage;
