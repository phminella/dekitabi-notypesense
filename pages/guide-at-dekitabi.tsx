import type { NextPage } from "next";
import dynamic from "next/dynamic";
const BecomeGuide = dynamic(
  () => import("../components/BecomeGuide/BecomeGuide"),
  {
    loading: () => <Spinner />,
  }
);
import Spinner from "../components/UI/Spinner";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
export const getServerSideProps = async function (
  ctx: GetServerSidePropsContext
) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string, ["guides"])),
    },
  };
};
import { useTranslation } from "next-i18next";
const GuideAtDekitabiPage: NextPage = (pageProps: any) => {
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
        <title>{t("guides:guideTitle")}</title>
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/guide-at-dekitabi`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://www.dekitabi.com/guide-at-dekitabi`}
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/guide-at-dekitabi`}
            />
          );
        })}
        <meta name="twitter:title" content={`${t("guides:guideMetaTitle")}`} />
        <meta
          name="twitter:description"
          content={`${t("guides:guideMetaDesc")}`}
        />
        <meta name="title" content={`${t("guides:guideMetaTitle")}`} />
        <meta name="description" content={`${t("guides:guideMetaDesc")}`} />
        <meta property="og:title" content={`${t("guides:guideMetaTitle")}`} />
        <meta
          property="og:description"
          content={`${t("guides:guideMetaDesc")}`}
        />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/guide-at-dekitabi`}
        />
      </Head>
      <BecomeGuide />
    </>
  );
};
export default GuideAtDekitabiPage;
