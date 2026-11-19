import type { NextPage } from "next";
import dynamic from "next/dynamic";
const Affiliate = dynamic(() => import("../components/Affiliate/Affiliate"), {
  loading: () => <Spinner />,
});
import Spinner from "../components/UI/Spinner";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
export const getServerSideProps = async function (
  ctx: GetServerSidePropsContext
) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string, ["affiliate"])),
    },
  };
};
import { useTranslation } from "next-i18next";
const AffiliateProgramPage: NextPage = (pageProps: any) => {
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
        <title>{t("affiliate:dekitabiAffiliate")}</title>
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/affiliate-program`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://www.dekitabi.com/affiliate-program`}
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/affiliate-program`}
            />
          );
        })}
        <meta name="twitter:title" content={`${t("affiliate:dekitabiAffiliate")}`} />
        <meta
          name="twitter:description"
          content={`${t("affiliate:dekitabiMetaDesc")}`}
        />
        <meta name="title" content={`${t("affiliate:dekitabiAffiliate")}`} />
        <meta
          name="description"
          content={`${t("affiliate:dekitabiMetaDesc")}`}
        />
        <meta
          property="og:title"
          content={`${t("affiliate:dekitabiAffiliate")}`}
        />
        <meta
          property="og:description"
          content={`${t("affiliate:dekitabiMetaDesc")}`}
        />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/affiliate-program`}
        />
      </Head>
      <Affiliate page={""} />
    </>
  );
};
export default AffiliateProgramPage;
