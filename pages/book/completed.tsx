import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
const BookCompleted = dynamic(
  () =>
    import(
      "../../components/Shops/Activities/ActivityBook/Completed/ActivityBookCompleted"
    ),
  {
    loading: () => <Spinner />,
  }
);
import Spinner from "../../components/UI/Spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation", "shops"])),
    },
  };
}
const BookCompletedPage: NextPage = (pageProps: any) => {
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
  if (!pageProps?._nextI18Next?.initialLocale) return <></>;
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <title>{t("shops:bookingCompleted")}</title>
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/book/completed`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/book/completed"
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/book/completed`}
            />
          );
        })}
        <meta
          name="twitter:title"
          content={`dekitabi | ${t("shops:bookingCompleted")}`}
        />
        <meta name="twitter:description" content={`${t("homeTitle")}`} />
        <meta name="title" content={`dekitabi | ${t("shops:bookingCompleted")}`} />
        <meta name="description" content={`${t("homeTitle")}`} />
        <meta
          property="og:title"
          content={`dekitabi | ${t("shops:bookingCompleted")}`}
        />
        <meta property="og:description" content={`${t("homeTitle")}`} />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/book/completed`}
        />
      </Head>
      <BookCompleted />
    </>
  );
};

export default BookCompletedPage;
