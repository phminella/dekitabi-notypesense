import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Spinner from "../components/UI/Spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
const TermsAndConditions = dynamic(
  () => import("../components/Misc/TermsAndConditions"),
  {
    loading: () => <Spinner />,
  }
);
const TermsAndConditionsPage: NextPage = (pageProps: any) => {
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
          }/terms-and-conditions`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/terms-and-conditions"
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn"
                  ? "zh"
                  : lang === "zh_tw"
                  ? "zh-TW"
                  : lang
              }
              href={`https://www.dekitabi.com/${lang}/terms-and-conditions`}
            />
          );
        })}{" "}
        <title>{`dekitabi | ${t("termsAndConditions")}`}</title>
        <meta
          name="twitter:title"
          content={`dekitabi | ${t("termsAndConditions")}`}
        />
        <meta name="twitter:description" content={t("onlyEnglish")} />
        <meta name="title" content={`dekitabi | ${t("termsAndConditions")}`} />
        <meta name="description" content={t("onlyEnglish")} />
        <meta
          property="og:title"
          content={`dekitabi | ${t("termsAndConditions")}`}
        />
        <meta property="og:description" content={t("onlyEnglish")} />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/terms-and-conditions`}
        />
      </Head>
      <TermsAndConditions />
    </>
  );
};

export default TermsAndConditionsPage;
