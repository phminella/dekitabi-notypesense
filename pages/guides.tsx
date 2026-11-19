import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
const GuidesList = dynamic(() => import("../components/Misc/Guides"), {
  loading: () => <Spinner />,
});
import Spinner from "../components/UI/Spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}

const title = (language: string) => {
  const title = {
    en: "dekitabi Guides",
    es: "Guías de dekitabi",
    tl: "Mga Gabay sa dekitabi",
    fr: "Guides dekitabi",
    id: "Panduan dekitabi",
    it: "Guide dekitabi",
    ja: "dekitabiガイド",
    ko: "dekitabi가이드",
    ms: "Panduan dekitabi",
    pt: "Guias da dekitabi",
    th: "dekitabi ทัวร์ไกด์",
    vi: "Hướng dẫn viên du lịch dekitabi",
    zh_cn: "dekitabi导游",
    zh_tw: "dekitabi導遊",
  };
  return title[language as keyof typeof title];
};
const description = (language: string) => {
  const description = {
    en: "Find the best guides to see the most beautiful parts of Japan with you!",
    es: "¡Encuentra las mejores guías para ver las partes más bellas de Japón contigo!",
    tl: "Hanapin ang pinakamahusay na mga gabay upang makita ang pinakamagandang bahagi ng Japan kasama mo!",
    fr: "Trouvez les meilleurs guides pour voir avec vous les plus belles régions du Japon !",
    id: "Temukan panduan terbaik untuk melihat bagian terindah Jepang bersama Anda!",
    it: "Trova le migliori guide per vedere insieme a te le parti più belle del Giappone!",
    ja: "一緒に日本の最も美しい場所を見るための最高のガイドを見つけましょう！",
    ko: "함께 일본의 가장 아름다운 장소를 볼 수있는 최고의 가이드를 찾으십시오!",
    ms: "Cari panduan terbaik untuk melihat bahagian paling indah di Jepun bersama anda!",
    pt: "Encontre os melhores guias para ver as partes mais bonitas do Japão com você!",
    th: "ค้นหาไกด์ที่ดีที่สุดเพื่อดูส่วนที่สวยงามที่สุดของญี่ปุ่นไปกับคุณ!",
    vi: "Hãy tìm những hướng dẫn viên tốt nhất để cùng bạn ngắm nhìn những phần đẹp nhất của Nhật Bản!",
    zh_cn: "找到最好的导游，与您一起游览日本最美丽的地方！",
    zh_tw: "尋找最好的導遊，與您一起遊覽日本最美麗的地方！",
  };
  return description[language as keyof typeof description];
};
const GuidesPage: NextPage = (pageProps: any) => {
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
  if (!pageProps?._nextI18Next) return <></>;
  return (
    <>
      <Head>
        <title>
          {title(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale
          )}
        </title>
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/guides`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/guides"
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
              href={`https://www.dekitabi.com/${lang}/guides`}
            />
          );
        })}
        <meta
          name="title"
          content={title(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale
          )}
        />
        <meta
          name="description"
          content={description(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale
          )}
        />
        <meta
          property="og:title"
          content={title(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale
          )}
        />
        <meta
          property="og:description"
          content={description(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale
          )}
        />
        <meta property="og:url" content={`https://www.dekitabi.com/guides`} />
        <meta
          name="twitter:title"
          content={title(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale
          )}
        />
        <meta
          name="twitter:description"
          content={description(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale
          )}
        />
      </Head>
      <GuidesList />
    </>
  );
};

export default GuidesPage;
