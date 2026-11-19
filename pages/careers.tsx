import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
const Careers = dynamic(() => import("../components/Careers/Careers"), {
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
    en: "Work at dekitabi!",
    es: "¡Trabaja en dekitabi!",
    tl: "Nagtatrabaho sa dekitabi!",
    fr: "Travaillez chez dekitabi!",
    id: "Bekerja di dekitabi!",
    it: "Lavora in dekitabi!",
    ja: "dekitabiで仕事しましょう！",
    ko: "dekitabi에서 일합시다!",
    ms: "Bekerja di dekitabi!",
    pt: "Trabalhe na dekitabi!",
    th: "หางานที่เดคิทาบิ!",
    vi: "Tìm việc làm tại dekitabi!",
    zh_cn: "让我们在dekitabi工作吧！",
    zh_tw: "讓我們在dekitabi工作吧！",
  };
  return title[language as keyof typeof title];
};
const description = (language: string) => {
  const description = {
    en: "Work with us promoting all the amazing places in Japan to the World. Work with us creating a more sustainable tourism in Japan while promoting all the amazing places in Japan to the World.",
    es: "Trabaja con nosotros creando un turismo más sostenible en Japón mientras promocionas todos los lugares increíbles de Japón en el mundo.",
    tl: "Makipagtulungan sa amin sa paglikha ng isang mas napapanatiling turismo sa Japan habang nagpo-promote ng lahat ng kamangha-manghang lugar sa Japan sa Mundo.",
    fr: "Travaillez avec nous pour créer un tourisme plus durable au Japon tout en faisant la promotion de tous les endroits incroyables du Japon dans le monde.",
    id: "Bekerja sama dengan kami menciptakan pariwisata yang lebih berkelanjutan di Jepang sambil mempromosikan semua tempat menakjubkan di Jepang kepada Dunia.",
    it: "Lavora con noi creando un turismo più sostenibile in Giappone, promuovendo al contempo tutti i meravigliosi luoghi del Giappone nel mondo.",
    ja: "dekitabiで日本の素晴らしいスポットを世界に伝えながら、より持続可能な日本の観光を創造しましょう！",
    ko: "dekitabi로 일본의 멋진 명소를 세계에 전달하면서 보다 지속 가능한 일본의 관광을 창조합시다!",
    ms: "Bekerjasama dengan kami mewujudkan pelancongan yang lebih mampan di Jepun sambil mempromosikan semua tempat yang menakjubkan di Jepun kepada Dunia.",
    pt: "Trabalhe conosco criando um turismo mais sustentável no Japão e ao mesmo tempo promovendo todos os lugares incríveis do Japão para o mundo.",
    th: "ทำงานร่วมกับเราเพื่อสร้างการท่องเที่ยวที่ยั่งยืนมากขึ้นในญี่ปุ่น ในขณะเดียวกันก็ส่งเสริมสถานที่น่าทึ่งในญี่ปุ่นให้โลกได้รับรู้",
    vi: "Hãy hợp tác với chúng tôi để tạo ra một nền du lịch bền vững hơn ở Nhật Bản đồng thời quảng bá tất cả những địa điểm tuyệt vời ở Nhật Bản ra Thế giới.",
    zh_cn:
      "与我们合作，在日本创造更可持续的旅游业，同时向世界推广日本所有令人惊叹的地方。",
    zh_tw:
      "與我們一起創造更永續的日本旅遊業，同時向世界宣傳日本所有令人驚嘆的地方。",
  };
  return description[language as keyof typeof description];
};
const CareersPage: NextPage = (pageProps: any) => {
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
  if (!pageProps._nextI18Next) return <></>;
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
          }/careers`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/careers"
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/careers`}
            />
          );
        })}
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
        <meta property="og:url" content={`https://www.dekitabi.com/careers`} />
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
      </Head>
      <Careers />
    </>
  );
};

export default CareersPage;
