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
const PaymentsAndPayoutsPolicy = dynamic(
  () => import("../components/Misc/PaymentsAndPayoutsPolicy"),
  {
    loading: () => <Spinner />,
  }
);
const PaymentsAndPayoutsPolicyPage: NextPage = (pageProps: any) => {
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
          }/payments-and-payouts-policy`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/payments-and-payouts-policy"
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/payments-and-payouts-policy`}
            />
          );
        })}
        <title>{t("paymentsAndPayouts")}</title>
        <meta
          name="twitter:title"
          content={`dekitabi | ${t("viewPaymentsAndPayoutsPolicy")}`}
        />
        <meta
          name="twitter:description"
          content={`${t("receivingPaymentsMsg").split(".")[0]}${
            t("receivingPaymentsMsg").split(".")[1]
          }.`}
        />
        <meta
          name="title"
          content={`dekitabi | ${t("viewPaymentsAndPayoutsPolicy")}`}
        />
        <meta
          name="description"
          content={`${t("receivingPaymentsMsg").split(".")[0]}${
            t("receivingPaymentsMsg").split(".")[1]
          }.`}
        />
        <meta
          property="og:title"
          content={`dekitabi | ${t("viewPaymentsAndPayoutsPolicy")}`}
        />
        <meta
          property="og:description"
          content={`${t("receivingPaymentsMsg").split(".")[0]}${
            t("receivingPaymentsMsg").split(".")[1]
          }.`}
        />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/payments-and-payouts-policy`}
        />
      </Head>
      <PaymentsAndPayoutsPolicy />
    </>
  );
};

export default PaymentsAndPayoutsPolicyPage;
