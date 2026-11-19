import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Spinner from "../components/UI/Spinner";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
const SuggestAttractions = dynamic(
  () => import("../components/Misc/SuggestAttractions"),
  {
    loading: () => <Spinner />,
  }
);
const SuggestAttractionsPage: NextPage = (pageProps: any) => {
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
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/suggest-attractions`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/suggest-attractions"
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/suggest-attractions`}
            />
          );
        })}
        <title>{t("buildWithUs")}</title>
        <meta name="twitter:title" content={t("buildWithUs")} />
        <meta
          name="twitter:description"
          content={"dekitabi " + t("buildTutorial1")}
        />
        <meta name="title" content={t("buildWithUs")} />
        <meta name="description" content={"dekitabi " + t("buildTutorial1")} />
        <meta property="og:title" content={t("buildWithUs")} />
        <meta
          property="og:description"
          content={"dekitabi " + t("buildWithUs")}
        />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/suggest-attractions`}
        />
      </Head>
      <SuggestAttractions />
    </>
  );
};

export default SuggestAttractionsPage;
