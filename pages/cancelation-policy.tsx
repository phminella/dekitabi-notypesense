import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Spinner from "../components/UI/Spinner";
// import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "next-i18next";
export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
// export const getServerSideProps = async function (
//   ctx: GetServerSidePropsContext
// ) {
//   return {
//     props: {
//       ...(await serverSideTranslations(ctx.locale as string, ["translation"])),
//     },
//   };
// };
const CancelationPolicy = dynamic(
  () => import("../components/Misc/CancelationPolicy"),
  {
    loading: () => <Spinner />,
  }
);
const CancelationPolicyPage: NextPage = (pageProps: any) => {
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
          }/cancelation-policy`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/cancelation-policy"
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/cancelation-policy`}
            />
          );
        })}
        <title>{t("cancelationPolicy")}</title>
        <meta
          name="twitter:title"
          content={`dekitabi | ${t("cancelationPolicy")}`}
        />
        <meta name="twitter:description" content={t("cancelDescription")} />
        <meta name="title" content={`dekitabi | ${t("cancelationPolicy")}`} />
        <meta name="description" content={t("cancelDescription")} />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/cancelation-policy`}
        />
        <meta
          property="og:title"
          content={`dekitabi | ${t("cancelationPolicy")}`}
        />
        <meta property="og:description" content={t("cancelDescription")} />
      </Head>
      <CancelationPolicy />
    </>
  );
};

export default CancelationPolicyPage;
