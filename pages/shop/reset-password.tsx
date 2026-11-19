import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
const ResetPassword = dynamic(
  () => import("../../components/Shops/ShopResetPassword"),
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
const ResetPasswordPage: NextPage = (pageProps: any) => {
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
        <title>{t("resetPassword")}</title>
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/about`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/about"
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/about`}
            />
          );
        })}
        <meta name="twitter:title" content={`dekitabi | ${t("about:about")}`} />
        <meta
          name="twitter:description"
          content={`${t("about:homeTitle")} ${t("about:whyDekitabiMsg5")}`}
        />
        <meta name="title" content={`dekitabi | ${t("about:about")}`} />
        <meta
          name="description"
          content={`${t("about:homeTitle")} ${t("about:whyDekitabiMsg5")}`}
        />
        <meta property="og:title" content={`dekitabi | ${t("about:about")}`} />
        <meta
          property="og:description"
          content={`${t("about:homeTitle")} ${t("about:whyDekitabiMsg5")}`}
        />
        <meta property="og:url" content={`https://www.dekitabi.com/about`} />
      </Head>
      <ResetPassword />
    </>
  );
};

export default ResetPasswordPage;
