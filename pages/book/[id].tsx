import { useRouter } from "next/router";
import Spinner from "../../components/UI/Spinner";
import type { NextPage } from "next";
import Head from "next/head";
import getActivityFromFirestore from "../../lib/ssr/getActivityFromFirestore";
import dynamic from "next/dynamic";
const Book = dynamic(
  () => import("../../components/Shops/Activities/Activity"),
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
  const activity = await getActivityFromFirestore(ctx.query.id, ctx.locale);
  if (activity === "not-found") {
    return { notFound: true };
  }
  return {
    props: {
      dbActivity: activity,
      ...(await serverSideTranslations(ctx.locale as string, [
        "translation",
        "shops",
      ])),
    },
  };
};
const BookPage: NextPage = (pageProps: any) => {
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
  if (!pageProps?._nextI18Next || !pageProps?.dbActivity) return <></>;
  if (pageProps?.dbActivity === "not-found") {
    return <NotFound message={t("noActivity")} />;
  }
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
  const description = pageProps?.dbActivity?.translatedDescription
    ? pageProps?.dbActivity?.translatedDescription[dbLocale]?.length > 170
      ? `${pageProps?.dbActivity?.translatedDescription[dbLocale]
          ?.substring(0, 170)
          .split(dotStyle)
          .map((string: any, i: any) => {
            if (
              i <
              pageProps?.dbActivity?.translatedDescription[dbLocale]
                ?.substring(0, 170)
                .split(dotStyle).length -
                1
            ) {
              return `${string.replace("\n", " ").replace("\r", "")}.`;
            }
          })
          .join("")}`
      : pageProps?.dbActivity?.translatedDescription[dbLocale]
    : pageProps?.dbActivity?.description?.length > 170
    ? `${pageProps?.dbActivity?.description
        ?.substring(0, 170)
        .split(dotStyle)
        .map((string: any, i: any) => {
          if (
            i <
            pageProps?.dbActivity?.description
              ?.substring(0, 170)
              .split(dotStyle).length -
              1
          ) {
            return `${string.replace("\n", " ").replace("\r", "")}.`;
          }
        })
        .join("")}`
    : pageProps?.dbActivity?.description?.length < 1
    ? pageProps?.dbActivity?.name
    : pageProps?.dbActivity?.description;
  const title = `${t("shops:bookActivity", {
    activity: pageProps?.dbActivity?.translatedName
      ? pageProps?.dbActivity?.translatedName
      : pageProps?.dbActivity?.name,
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
          }/book/${pageProps.dbActivity?.url}`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://www.dekitabi.com/book/${pageProps.dbActivity?.url}`}
        />
        {languages?.map((lang, i) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/book/${pageProps?.dbActivity?.url}`}
            />
          );
        })}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/book/${pageProps.dbActivity?.url}`}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <Book id={query?.id} {...pageProps} />
    </>
  );
};
export default BookPage;
