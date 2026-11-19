import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ItineraryLoader from "../../components/Itinerary/ItineraryLoader";
import Head from "next/head";
import getItineraryFromFirestore from "../../lib/ssr/getItineraryFromFirestore";
const Itinerary = dynamic(
  () => import("../../components/Itinerary/Itinerary"),
  {
    ssr: true,
    loading: () => <ItineraryLoader loading={true} />,
  }
);
const Itinerary404 = dynamic(
  () => import("../../components/Itinerary/Itinerary404"),
  {
    loading: () => <ItineraryLoader loading={true} />,
  }
);
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export const getServerSideProps = async function (ctx) {
  let itinerarySsr;
  if (ctx?.query?.id) {
    itinerarySsr = await getItineraryFromFirestore(ctx?.query?.id, ctx?.locale);
  }
  if (itinerarySsr === "not-found") {
    return { notFound: true };
  }
  return {
    props: {
      itinerarySsr,
      ...(await serverSideTranslations(ctx?.locale, ["translation"])),
    },
  };
};
// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["translation"])),
//       // Will be passed to the page component as props
//     },
//   };
// }
// export async function getStaticPaths({ slug: string }) {
//   const itineraries = await getAllItineraryFromFirebase();
//   const paths = itineraries.map((itinerary) => ({
//     params: { id: itinerary },
//   }));
//   return {
//     paths, //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// }

const ItineraryPage = (pageProps) => {
  const router = useRouter();
  const query = router?.query;
  const { t } = useTranslation();
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
  const dbLocale =
    pageProps?._nextI18Next?.initialLocale === "default" ||
    !pageProps?._nextI18Next?.initialLocale
      ? "en"
      : pageProps?._nextI18Next?.initialLocale === "zh_cn"
      ? "zh-CN"
      : pageProps?._nextI18Next?.initialLocale === "zh_tw"
      ? "zh-TW"
      : pageProps?._nextI18Next?.initialLocale === "tl"
      ? "fil"
      : pageProps?._nextI18Next?.initialLocale;
  const dotStyle =
    dbLocale === "ja" || dbLocale === "zh-CN" || dbLocale === "zh-TW"
      ? "。"
      : ".";
  const description = pageProps?.itinerarySsr?.translatedDescription
    ? pageProps?.itinerarySsr?.translatedDescription[dbLocale]?.length > 170
      ? `${pageProps?.itinerarySsr?.translatedDescription[dbLocale]
          ?.substring(0, 170)
          .split(dotStyle)
          .map((string, i) => {
            if (
              i <
              pageProps?.itinerarySsr?.translatedDescription[dbLocale]
                ?.substring(0, 170)
                .split(dotStyle).length -
                1
            ) {
              return `${string.replace("\n", " ").replace("\r", "")}.`;
            }
          })
          .join("")}`
      : pageProps?.itinerarySsr?.translatedDescription[dbLocale]
    : pageProps?.itinerarySsr?.description?.length > 170
    ? `${pageProps?.itinerarySsr?.description
        ?.substring(0, 170)
        .split(dotStyle)
        .map((string, i) => {
          if (
            i <
            pageProps?.itinerarySsr?.description
              ?.substring(0, 170)
              .split(dotStyle).length -
              1
          ) {
            return `${string.replace("\n", " ").replace("\r", "")}.`;
          }
        })
        .join("")}`
    : pageProps?.itinerarySsr?.description?.length < 1
    ? t("homeTitle")
    : pageProps?.itinerarySsr?.description;
  if (!pageProps?.itinerarySsr || !pageProps?._nextI18Next?.initialLocale)
    return <></>;
  if (pageProps?.itinerarySsr === "not-found") return <Itinerary404 t={t} />;
  return (
    <>
      <Head>
        {/* <meta name="robots" content="noindex,nofollow" /> */}
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/itinerary/${query?.url ? query?.url : query?.id}`}
        />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/itinerary/${
            query?.url ? query?.url : query?.id
          }`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://www.dekitabi.com/itinerary/${
            query?.url ? query?.url : query?.id
          }`}
        />
        {languages?.map((lang, i) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/itinerary/${
                query?.url ? query?.url : query?.id
              }`}
            />
          );
        })}
        <title>
          {pageProps?.itinerarySsr?.translatedName
            ? pageProps?.itinerarySsr?.translatedName[dbLocale]
            : pageProps?.itinerarySsr?.name}
        </title>{" "}
        <meta
          name="title"
          content={
            pageProps?.itinerarySsr?.translatedName
              ? pageProps?.itinerarySsr?.translatedName[dbLocale]
              : pageProps?.itinerarySsr?.name
          }
        />
        <meta name="description" content={description} />
        <meta
          property="og:title"
          content={
            pageProps?.itinerarySsr?.translatedName
              ? pageProps?.itinerarySsr?.translatedName[dbLocale]
              : pageProps?.itinerarySsr?.name
          }
        />{" "}
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/itinerary/${
            query?.url ? query?.url : query?.id
          }`}
        />
        <meta property="og:description" content={description} />
        <meta
          name="twitter:title"
          content={
            pageProps?.itinerarySsr?.translatedName
              ? pageProps?.itinerarySsr?.translatedName[dbLocale]
              : pageProps?.itinerarySsr?.name
          }
        />
        <meta name="twitter:description" content={description} />
      </Head>
      <Itinerary id={query?.id} fromLink={query?.fromLink} {...pageProps} />
    </>
  );
};
export default ItineraryPage;
