import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
const SignUp = dynamic(() => import("../../components/Shops/ShopSignUp"), {
  loading: () => <Spinner />,
});
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
const SignUpPage: NextPage = (pageProps: any) => {
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
        <title>{t("signUp")}</title>
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/shop/sign-up`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/shop/sign-up"
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/shop/sign-up`}
            />
          );
        })}
        <meta name="twitter:title" content={`dekitabi | ${t("signUp")}`} />
        <meta name="twitter:description" content={`${t("homeTitle")}`} />
        <meta name="title" content={`dekitabi | ${t("signUp")}`} />
        <meta name="description" content={`${t("homeTitle")}`} />
        <meta property="og:title" content={`dekitabi | ${t("signUp")}`} />
        <meta property="og:description" content={`${t("homeTitle")}`} />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/shop/sign-up`}
        />
      </Head>
      <SignUp />
    </>
  );
};

export default SignUpPage;
