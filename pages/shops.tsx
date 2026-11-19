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
      ...(await serverSideTranslations(locale, [
        "affiliate",
        "translation",
        "shops",
      ])),
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
const Shops = dynamic(() => import("../components/Shops/ShopsHome/Shops"), {
  loading: () => <Spinner />,
});
const ShopsPage: NextPage = (pageProps: any) => {
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
          }/shops`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/shops"
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/shops`}
            />
          );
        })}
        <title>{t("shops:shopsTitle")}</title>
        <meta
          name="twitter:title"
          content={`dekitabi | ${t("shops:shopsTitle")}`}
        />
        <meta name="twitter:description" content={t("shops:shopsSubtitle")} />
        <meta name="title" content={`dekitabi | ${t("shops:shopsTitle")}`} />
        <meta name="description" content={t("shops:shopsSubtitle")} />
        <meta property="og:url" content={`https://www.dekitabi.com/shops`} />
        <meta
          property="og:title"
          content={`dekitabi | ${t("shops:shopsTitle")}`}
        />
        <meta property="og:description" content={t("shops:shopsSubtitle")} />
      </Head>
      <Shops />
    </>
  );
};

export default ShopsPage;
