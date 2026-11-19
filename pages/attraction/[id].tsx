import { useRouter } from "next/router";
import Spinner from "../../components/UI/Spinner";
import type { NextPage } from "next";
import Head from "next/head";
// import getAllAttractionsFromFirebase from "../../lib/ssr/getAllAttractionsFromFirebase";
import getAttractionFromFirestore from "../../lib/ssr/getAttractionFromFirestore";
// import Attraction from "../../components/Attraction/Attraction";
import dynamic from "next/dynamic";
const Attraction = dynamic(
  () => import("../../components/Attraction/Attraction"),
  {
    loading: () => <Spinner />,
  }
);
const NotFound = dynamic(() => import("../../components/UI/NotFound"), {
  loading: () => <Spinner />,
});
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
export const getServerSideProps = async function (
  ctx: GetServerSidePropsContext
) {
  const attraction = await getAttractionFromFirestore(ctx.query.id, ctx.locale);
  if (attraction === "not-found") {
    return { notFound: true };
  }
  return {
    props: {
      attraction,
      ...(await serverSideTranslations(ctx.locale as string, ["translation"])),
    },
  };
};
// export async function getStaticProps({
//   locale,
//   params,
// }: {
//   locale: any;
//   params: any;
// }) {
//   const attraction = await getAttractionFromFirestore(params.id);
//   return {
//     props: {
//       attraction,
//       ...(await serverSideTranslations(locale, ["translation"])),
//       // Will be passed to the page component as props
//     },
//   };
// }
// export async function getStaticPaths() {
//   const attractions = await getAllAttractionsFromFirebase();
//   const paths = attractions?.map((attraction: any) => ({
//     params: { id: attraction },
//   }));
//   return {
//     paths, //indicates that no page needs be created at build time
//     fallback: true, //indicates the type of fallback
//     revalidate: 600,
//   };
// }
const AttractionPage: NextPage = (pageProps: any) => {
  const router = useRouter();
  const query = router.query;
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
  if (!pageProps?._nextI18Next || !pageProps?.attraction) return <></>;
  if (pageProps?.attraction === "not-found") {
    return <NotFound message={t("noAttractions")} />;
  }
  const title = `${t("addTo", {
    attraction: pageProps?.attraction?.translatedName
      ? pageProps?.attraction?.translatedName[
          pageProps._nextI18Next?.initialLocale === "default"
            ? "en"
            : pageProps?._nextI18Next?.initialLocale === "zh_cn"
            ? "zh-CN"
            : pageProps?._nextI18Next?.initialLocale === "zh_tw"
            ? "zh-TW"
            : pageProps?._nextI18Next?.initialLocale === "tl"
            ? "fil"
            : pageProps?._nextI18Next?.initialLocale
        ]
      : pageProps?.attraction?.name,
  })}`;
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <title>{title}</title>
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/attraction/${pageProps.attraction?.url}`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://www.dekitabi.com/attraction/${pageProps.attraction?.url}`}
        />
        {languages?.map((lang, i) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/attraction/${pageProps?.attraction?.url}`}
            />
          );
        })}
        <meta name="title" content={title} />
        <meta
          name="description"
          content={
            pageProps?.attraction?.translatedDescription
              ? pageProps?.attraction?.translatedDescription[
                  pageProps._nextI18Next?.initialLocale === "default"
                    ? "en"
                    : pageProps?._nextI18Next?.initialLocale === "zh_cn"
                    ? "zh-CN"
                    : pageProps?._nextI18Next?.initialLocale === "zh_tw"
                    ? "zh-TW"
                    : pageProps?._nextI18Next?.initialLocale === "tl"
                    ? "fil"
                    : pageProps?._nextI18Next?.initialLocale
                ]
              : pageProps?.attraction?.description
              ? pageProps?.attraction?.description
              : "Tourist Spot in Japan"
          }
        />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={
            pageProps?.attraction?.translatedDescription
              ? pageProps?.attraction?.translatedDescription[
                  pageProps._nextI18Next?.initialLocale === "default"
                    ? "en"
                    : pageProps?._nextI18Next?.initialLocale === "zh_cn"
                    ? "zh-CN"
                    : pageProps?._nextI18Next?.initialLocale === "zh_tw"
                    ? "zh-TW"
                    : pageProps?._nextI18Next?.initialLocale === "tl"
                    ? "fil"
                    : pageProps?._nextI18Next?.initialLocale
                ]
              : pageProps?.attraction?.description
              ? pageProps?.attraction?.description
              : "Tourist Spot in Japan"
          }
        />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/attraction/${pageProps.attraction?.url}`}
        />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content={
            pageProps?.attraction?.translatedDescription
              ? pageProps?.attraction?.translatedDescription[
                  pageProps._nextI18Next?.initialLocale === "default"
                    ? "en"
                    : pageProps?._nextI18Next?.initialLocale === "zh_cn"
                    ? "zh-CN"
                    : pageProps?._nextI18Next?.initialLocale === "zh_tw"
                    ? "zh-TW"
                    : pageProps?._nextI18Next?.initialLocale === "tl"
                    ? "fil"
                    : pageProps?._nextI18Next?.initialLocale
                ]
              : pageProps?.attraction?.description
              ? pageProps?.attraction?.description
              : "Tourist Spot in Japan"
          }
        />
      </Head>
      <Attraction id={query?.id} {...pageProps} />
    </>
  );
};
export default AttractionPage;
