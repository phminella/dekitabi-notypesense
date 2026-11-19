import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import SSkeleton from "../../components/S/SSkeleton";
import AttractionsSkeleton from "../../components/S/Attractions/AttractionsSkeleton";
// import getAllCitiesFromFirebase from "../../lib/ssr/getAllCitiesFromFirebase";
import getAttractionsFromCity from "../../lib/ssr/getAttractionsFromCity";
import Head from "next/head";
const S = dynamic(() => import("../../components/S/S"), {
  loading: () => (
    <>
      <SSkeleton />
      <AttractionsSkeleton />
    </>
  ),
});
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import NotFound from "../../components/UI/NotFound";
import { useTranslation } from "next-i18next";
export const getServerSideProps = async function (
  ctx: GetServerSidePropsContext
) {
  const data = await getAttractionsFromCity(ctx.query.id);
  const randomBg = Math.floor(Math.random() * 4) + 1;
  return {
    props: {
      randomBg,
      ...(data && { data }),
      ...(await serverSideTranslations(ctx.locale as string, ["translation"])),
    },
  };
};
// export async function getStaticProps({ locale }: { locale: any }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["translation"])),
//       // Will be passed to the page component as props
//     },
//   };
// }
// export async function getStaticPaths() {
//   const cities = await getAllCitiesFromFirebase();
//   const paths = cities?.map((city: any) => ({
//     params: {
//       id: city?.id,
//       // country: "Japan",
//       // location: `${city?.location[0]}, ${city?.location[1]}`,
//       // search: city?.name,
//     },
//   }));
//   return {
//     paths, //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// }

// const title = (language: string, city: any, section: any) => {
//   const title = {
//     en: `Create your perfect tour for ${city}!`,
//     es: `Crea tu tour perfecto para ${city}!`,
//     fil: `Gawin ang iyong perpektong tour para sa ${city}!`,
//     fr: `Créez votre visite parfaite pour ${city}!`,
//     id: `Buat tur sempurna Anda untuk ${city}!`,
//     it: `Crea il tuo tour perfetto per ${city}!`,
//     ja: `${city}の好きなツアーを作りましょう！`,
//     ko: `${city}에 대한 완벽한 여행을 만들어보세요!`,
//     ms: `Buat lawatan sempurna anda untuk ${city}!`,
//     pt: `Crie seu tour perfeito para ${city}!`,
//     th: `สร้างทัวร์ที่สมบูรณ์แบบของคุณสำหรับ ${city}!`,
//     vi: `Tạo chuyến tham quan hoàn hảo của bạn với ${city}!`,
//     zh_cn: `为${city}打造完美旅程！`,
//     zh_tw: `花費 ${city} 創建您的完美之旅！`,
//   };
//   return title[language as keyof typeof title];
// };
const description = (language: string, city: any, section: any) => {
  const description = {
    en: `Find ${
      section === "itineraries"
        ? "itineraries"
        : section === "guides"
        ? "guides"
        : "attractions"
    } ${
      section === "build" ? "and suggest attractions " : ""
    }to create your perfect tour for ${city}.`,
    es: `Encuentre ${
      section === "itineraries"
        ? "itinerarios"
        : section === "guides"
        ? "guías turísticos"
        : "atracciones"
    } ${
      section === "build" ? "y sugiera atracciones " : ""
    }para crear su recorrido perfecto por ${city}.`,
    tl: `Maghanap ${
      section === "itineraries"
        ? "ng mga itinerary"
        : section === "guides"
        ? "ng mga tour guide"
        : "ng mga atraksyon"
    } ${
      section === "build" ? "at magmungkahi ng mga tourist spot " : ""
    }para gawin ang iyong perpektong tour para sa ${city}.`,
    fr: `Trouvez ${
      section === "itineraries"
        ? "des itinéraires"
        : section === "guides"
        ? "des guides touristiques"
        : "des attractions"
    } ${
      section === "build" ? "et suggérez des attractions " : ""
    } attractions, des itinéraires, des guides touristiques et suggérez des attractions pour créer votre visite parfaite pour ${city}.`,
    id: `Temukan ${
      section === "itineraries"
        ? "rencana perjalanan"
        : section === "guides"
        ? "pemandu wisata"
        : "objek wisata"
    } ${
      section === "build" ? "dan sarankan tempat wisata " : ""
    }untuk menciptakan tur sempurna Anda seharga ${city}.`,
    it: `Trova ${
      section === "itineraries"
        ? "itinerari"
        : section === "guides"
        ? "guide turistiche"
        : "luoghi turistici"
    } ${
      section === "build" ? "e suggerisci luoghi turistici " : ""
    }per creare il tuo tour perfetto per ${city}.`,
    ja: `${
      section === "itineraries"
        ? "旅程"
        : section === "guides"
        ? "ツアーガイド"
        : "観光スポット"
    }を検索し、${
      section === "build" ? "観光スポットを提案して、 " : ""
    }${city}の好きなツアーを作成します。`,
    ko: `${
      section === "itineraries"
        ? "여정"
        : section === "guides"
        ? "투어 가이드를"
        : "관광지"
    }검색하고 ${
      section === "build" ? "관광 명소를 제안하고, " : ""
    }${city}에 대한 완벽한 여행을 만들어보세요.`,
    ms: `Cari ${
      section === "itineraries"
        ? "jadual perjalanan"
        : section === "guides"
        ? "pemandu pelancong"
        : "tempat pelancongan"
    } ${
      section === "build" ? "dan cadangkan tempat pelancongan " : ""
    }untuk mencipta lawatan sempurna anda untuk ${city}.`,
    pt: `Encontre ${
      section === "itineraries"
        ? "roteiros"
        : section === "guides"
        ? "guias turísticos"
        : "pontos turísticos"
    } ${
      section === "build" ? "e sugira pontos turísticos " : ""
    }para criar seu tour perfeito para ${city}.`,
    th: `ค้นหา${
      section === "itineraries"
        ? "กำหนดการเดินทาง"
        : section === "guides"
        ? "มัคคุเทศก์"
        : "สถานที่ท่องเที่ยว"
    } ${
      section === "build" ? "มัคคุเทศก์ " : ""
    }ยวเพื่อสร้างทัวร์ที่สมบูรณ์แบบสำหรับ ${city}`,
    vi: `Tìm các ${
      section === "itineraries"
        ? "hành trình"
        : section === "guides"
        ? "มัคคุเทศก์"
        : "dẫn viên du lịch"
    } ${
      section === "build" ? "và đề xuất các địa điểm du lịch " : ""
    }để tạo chuyến tham quan hoàn hảo cho ${city}.`,
    zh_cn: `查找${
      section === "itineraries"
        ? "行程"
        : section === "guides"
        ? "导游"
        : "旅游景点"
    }を検索し、${
      section === "build" ? "并建议旅游景点以打造您" : ""
    }${city}的完美之旅。`,
    zh_tw: `尋找${
      section === "itineraries"
        ? "行程"
        : section === "guides"
        ? "導遊"
        : "旅遊景點"
    }、${
      section === "build" ? "並建議旅遊景點打造您" : ""
    }旅遊景點、行程、導覽並推薦旅遊景點，為您打造完美的 ${city} 的完美之旅。`,
  };
  return description[language as keyof typeof description];
};
const SPage: NextPage = (pageProps: any) => {
  const router = useRouter();
  const { t } = useTranslation();
  const query: any = router.query;
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
  const cityName = query?.id ? query?.id[0] : "";
  const section = query?.id?.length > 1 ? query?.id[1] : "";
  let metaTitle =
    section === "itineraries"
      ? t("toursIn", {
          city: pageProps.data?.city?.translatedCity
            ? pageProps.data?.city?.translatedCity[
                pageProps?._nextI18Next?.initialLocale === "default"
                  ? "en"
                  : pageProps?._nextI18Next?.initialLocale === "zh_cn"
                  ? "zh-CN"
                  : pageProps?._nextI18Next?.initialLocale === "zh_tw"
                  ? "zh-TW"
                  : pageProps?._nextI18Next?.initialLocale === "tl"
                  ? "fil"
                  : pageProps?._nextI18Next?.initialLocale
              ]
            : cityName,
        })
      : section === "guides"
      ? t("guidesIn", {
          state: pageProps.data?.city?.translatedCity
            ? pageProps.data?.city?.translatedCity[
                pageProps?._nextI18Next?.initialLocale === "default"
                  ? "en"
                  : pageProps?._nextI18Next?.initialLocale === "zh_cn"
                  ? "zh-CN"
                  : pageProps?._nextI18Next?.initialLocale === "zh_tw"
                  ? "zh-TW"
                  : pageProps?._nextI18Next?.initialLocale === "tl"
                  ? "fil"
                  : pageProps?._nextI18Next?.initialLocale
              ]
            : cityName,
        })
      : section === "build"
      ? t("buildIn", {
          city: pageProps.data?.city?.translatedCity[
            pageProps?._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps?._nextI18Next?.initialLocale === "zh_cn"
              ? "zh-CN"
              : pageProps?._nextI18Next?.initialLocale === "zh_tw"
              ? "zh-TW"
              : pageProps?._nextI18Next?.initialLocale === "tl"
              ? "fil"
              : pageProps?._nextI18Next?.initialLocale
          ],
        })
      : t("attractionsIn", {
          city: pageProps.data?.city?.translatedCity
            ? pageProps.data?.city?.translatedCity[
                pageProps?._nextI18Next?.initialLocale === "default"
                  ? "en"
                  : pageProps?._nextI18Next?.initialLocale === "zh_cn"
                  ? "zh-CN"
                  : pageProps?._nextI18Next?.initialLocale === "zh_tw"
                  ? "zh-TW"
                  : pageProps?._nextI18Next?.initialLocale === "tl"
                  ? "fil"
                  : pageProps?._nextI18Next?.initialLocale
              ]
            : cityName,
        });
  metaTitle = `dekitabi | ${metaTitle.replace(
    /(^\w{1})|(\s+\w{1})/g,
    (letter: any) => letter.toUpperCase()
  )}`;
  const dotStyle =
    pageProps?._nextI18Next?.initialLocale === "ja" ||
    pageProps?._nextI18Next?.initialLocale === "zh_cn" ||
    pageProps?._nextI18Next?.initialLocale === "zh_tw"
      ? "。"
      : ".";
  let whyDekitabi = t("whyDekitabiMsg5").split(dotStyle);
  whyDekitabi.pop();
  whyDekitabi.pop();
  whyDekitabi = `${whyDekitabi.join(dotStyle)}.`;
  if (!pageProps?.data) return <></>;
  return (
    <>
      <Head>
        {/* <meta name="robots" content="noindex,nofollow" /> */}
        <title>{metaTitle}</title>
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/s/${cityName}${section ? `/${section}` : ""}`}
        />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/s/${cityName}${
            section ? `/${section}` : ""
          }`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://www.dekitabi.com/s/${cityName}${
            section ? `/${section}` : ""
          }`}
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/s/${cityName}${
                section ? `/${section}` : ""
              }`}
            />
          );
        })}
        <meta
          name="title"
          // content={title(
          //   pageProps?._nextI18Next?.initialLocale === "default"
          //     ? "en"
          //     : pageProps?._nextI18Next?.initialLocale,
          //   pageProps.data?.city?.translatedCity[
          //     pageProps?._nextI18Next?.initialLocale === "default"
          //       ? "en"
          //       : pageProps?._nextI18Next?.initialLocale
          //   ],
          //   section
          // )}
          content={metaTitle}
        />
        <meta
          name="description"
          content={`${description(
            pageProps?._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps?._nextI18Next?.initialLocale,
            pageProps.data?.city?.translatedCity[
              pageProps?._nextI18Next?.initialLocale === "default"
                ? "en"
                : pageProps?._nextI18Next?.initialLocale === "zh_cn"
                ? "zh-CN"
                : pageProps?._nextI18Next?.initialLocale === "zh_tw"
                ? "zh-TW"
                : pageProps?._nextI18Next?.initialLocale === "tl"
                ? "fil"
                : pageProps?._nextI18Next?.initialLocale
            ],
            section
          )} ${whyDekitabi}`}
        />
        <meta
          property="og:title"
          // content={title(
          //   pageProps?._nextI18Next?.initialLocale === "default"
          //     ? "en"
          //     : pageProps?._nextI18Next?.initialLocale,
          //   pageProps.data?.city?.translatedCity[
          //     pageProps?._nextI18Next?.initialLocale === "default"
          //       ? "en"
          //       : pageProps?._nextI18Next?.initialLocale
          //   ],
          //   section
          // )}
          content={metaTitle}
        />
        <meta
          property="og:description"
          content={`${description(
            pageProps?._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps?._nextI18Next?.initialLocale,
            pageProps.data?.city?.translatedCity[
              pageProps?._nextI18Next?.initialLocale === "default"
                ? "en"
                : pageProps?._nextI18Next?.initialLocale === "zh_cn"
                ? "zh-CN"
                : pageProps?._nextI18Next?.initialLocale === "zh_tw"
                ? "zh-TW"
                : pageProps?._nextI18Next?.initialLocale === "tl"
                ? "fil"
                : pageProps?._nextI18Next?.initialLocale
            ],
            section
          )} ${whyDekitabi}`}
        />
        <meta
          name="twitter:title"
          // content={title(
          //   pageProps?._nextI18Next?.initialLocale === "default"
          //     ? "en"
          //     : pageProps?._nextI18Next?.initialLocale,
          //   pageProps.data?.city?.translatedCity[
          //     pageProps?._nextI18Next?.initialLocale === "default"
          //       ? "en"
          //       : pageProps?._nextI18Next?.initialLocale
          //   ],
          //   section
          // )}
          content={metaTitle}
        />
        <meta
          name="twitter:description"
          content={`${description(
            pageProps?._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps?._nextI18Next?.initialLocale,
            pageProps.data?.city?.translatedCity[
              pageProps?._nextI18Next?.initialLocale === "default"
                ? "en"
                : pageProps?._nextI18Next?.initialLocale === "zh_cn"
                ? "zh-CN"
                : pageProps?._nextI18Next?.initialLocale === "zh_tw"
                ? "zh-TW"
                : pageProps?._nextI18Next?.initialLocale === "tl"
                ? "fil"
                : pageProps?._nextI18Next?.initialLocale
            ],
            section
          )} ${whyDekitabi}`}
        />
      </Head>
      {pageProps.data === "not-found" ? (
        <div
          style={{
            height: "65vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5em",
            fontWeight: "bold",
          }}
        >
          <NotFound message={`${t("noAttractions")}.`} />
        </div>
      ) : (
        <S
          locale={
            pageProps?._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps?._nextI18Next?.initialLocale === "zh_cn"
              ? "zh-CN"
              : pageProps?._nextI18Next?.initialLocale === "zh_tw"
              ? "zh-TW"
              : pageProps?._nextI18Next?.initialLocale === "tl"
              ? "fil"
              : pageProps?._nextI18Next?.initialLocale
          }
          city={pageProps.data?.city}
          section={query?.id}
          ssrData={pageProps.data?.data}
          background={pageProps.randomBg}
        />
      )}
    </>
  );
};
export default SPage;
