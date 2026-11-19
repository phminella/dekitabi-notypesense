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
const CommunityGuidelines = dynamic(
  () => import("../components/Misc/CommunityGuidelines"),
  {
    loading: () => <Spinner />,
  }
);
const CommunityGuidelinesPage: NextPage = (pageProps: any) => {
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
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/community-guidelines`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/community-guidelines"
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/community-guidelines`}
            />
          );
        })}{" "}
        <title>{`dekitabi | ${t("communityGuidelines")}`}</title>
        <meta
          name="twitter:title"
          content={`dekitabi | ${t("communityGuidelines")}`}
        />
        <meta name="twitter:description" content={t("onlyEnglish")} />
        <meta name="title" content={`dekitabi | ${t("communityGuidelines")}`} />
        <meta name="description" content={t("onlyEnglish")} />
        <meta
          property="og:title"
          content={`dekitabi | ${t("communityGuidelines")}`}
        />
        <meta property="og:description" content={t("onlyEnglish")} />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/community-guidelines`}
        />
      </Head>
      <CommunityGuidelines />
    </>
  );
};

export default CommunityGuidelinesPage;
