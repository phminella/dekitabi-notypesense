import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import ProfileSkeleton from "../components/Profile/Skeleton/ProfileSkeleton";
import getUserFromFirestore from "../lib/ssr/getUserFromFirestore";
const Profile = dynamic(() => import("../components/Profile/Profile"), {
  loading: () => <ProfileSkeleton />,
});
const PageNotFound = dynamic(() => import("../components/UI/PageNotFound"));
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
export const getServerSideProps = async function (ctx) {
  let userSsr = {};
  if (ctx.query.id) {
    userSsr = await getUserFromFirestore(ctx.query.id);
  }
  if (userSsr === "not-found") {
    return { notFound: true };
  }
  return {
    props: {
      userSsr,
      ...(await serverSideTranslations(ctx.locale, ["translation"])),
    },
  };
};
// export async function getStaticProps({ locale, params }) {
//   let userSsr = {};
//   if (params.id) {
//     userSsr = await getUserFromFirestore(params.id);
//   }
//   return {
//     revalidate: 1,
//     props: {
//       userSsr,
//       ...(await serverSideTranslations(locale, ["translation"])),
//       // Will be passed to the page component as props
//     },
//   };
// }
// export async function getStaticPaths({ slug: string }) {
//   const users = await getAllUsersFromFirebase();
//   const paths = users.map((user) => ({
//     params: { id: user },
//   }));
//   return {
//     paths, //indicates that no page needs be created at build time
//     fallback: true, //indicates the type of fallback
//   };
// }

const title = (language, name) => {
  const title = {
    en: `${name}'s dekitabi profile`,
    es: `perfil dekitabi de ${name}`,
    tl: `dekitabi profile ni ${name}`,
    fr: `Profil dekitabi de ${name}`,
    id: `Profil dekitabi ${name}`,
    it: `Profilo dekitabi di ${name}`,
    ja: `${name}のdekitabiプロフィール`,
    ko: `${name}의 dekitabi 프로필`,
    ms: `Profil dekitabi ${name}`,
    pt: `Perfil dekitabi de ${name}`,
    th: `โปรไฟล์ dekitabi ของ ${name}`,
    vi: `Hồ sơ dekitabi của ${name}`,
    zh_cn: `${name} 的 dekitabi 个人资料`,
    zh_tw: `${name} 的 dekitabi 個人資料`,
  };
  return title[language];
};
const description = (language, name) => {
  const description = {
    en: `Book tours in Japan with ${name}! Select itineraries or create your own to visit the most interesting places in Japan!`,
    es: `¡Reserva tours en Japón con ${name}! ¡Selecciona itinerarios o crea el tuyo propio para visitar los lugares más interesantes de Japón!`,
    tl: `Mag-book ng mga tour sa Japan gamit ang ${name}! Pumili ng mga itineraryo o lumikha ng iyong sarili upang bisitahin ang mga pinakakawili-wiling lugar sa Japan!`,
    fr: `Réservez des visites au Japon avec ${name} ! Sélectionnez des itinéraires ou créez le vôtre pour visiter les endroits les plus intéressants du Japon !`,
    id: `Pesan tur di Jepang dengan ${name}! Pilih rencana perjalanan atau buat rencana perjalanan Anda sendiri untuk mengunjungi tempat-tempat paling menarik di Jepang!`,
    it: `Prenota tour in Giappone con ${name}! Seleziona gli itinerari o creane uno tuo per visitare i luoghi più interessanti del Giappone!`,
    ja: `${name} を予約しましょう! 旅程を選択するか、旅程を作成し、日本で最も興味深い場所を訪れましょう!`,
    ko: `${name} 예약하세요! 여정을 선택하거나 여정을 만들어 일본에서 가장 흥미로운 장소를 찾아보세요!`,
    ms: `Tempah lawatan di Jepun dengan ${name}! Pilih jadual perjalanan atau cipta sendiri untuk melawat tempat paling menarik di Jepun!`,
    pt: `Reserve passeios no Japão com ${name}! Selecione itinerários ou crie o seu próprio para visitar os lugares mais interessantes do Japão!`,
    th: `จองทัวร์ญี่ปุ่นกับ ${name}! เลือกแผนการเดินทางหรือสร้างของคุณเองเพื่อเยี่ยมชมสถานที่ที่น่าสนใจที่สุดในญี่ปุ่น!`,
    vi: `Đặt chuyến tham quan Nhật Bản với ${name}! Chọn hành trình hoặc tạo hành trình của riêng bạn để ghé thăm những địa điểm thú vị nhất ở Nhật Bản!`,
    zh_cn: `与 ${name} 预订日本之旅！选择行程或创建自己的行程，游览日本最有趣的地方！`,
    zh_tw: `以${name}預訂日本旅遊！選擇行程或創建自己的行程，參觀日本最有趣的地方！`,
  };
  return description[language];
};
const ProfilePage = (pageProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const query = router.query;
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
  const dbLocale =
    pageProps?._nextI18Next?.initialLocale === "default" ||
    !pageProps?._nextI18Next?.initialLocale
      ? "en"
      : pageProps?._nextI18Next?.initialLocale === "zh_cn"
      ? "zh-CN"
      : pageProps?._nextI18Next?.initialLocale === "zh_tw"
      ? "zh-TW"
      : pageProps?._nextI18Next?.initialLocale === "tl"
      ? "fil"
      : pageProps?._nextI18Next?.initialLocale;
  const dotStyle =
    dbLocale === "ja" || dbLocale === "zh-CN" || dbLocale === "zh-TW"
      ? "。"
      : ".";
  const metaDescription = pageProps?.userSsr?.translatedDescription
    ? pageProps?.userSsr?.translatedDescription[dbLocale]?.length > 170
      ? `${pageProps?.userSsr?.translatedDescription[dbLocale]
          ?.substring(0, 170)
          .split(dotStyle)
          .map((string, i) => {
            if (
              i <
              pageProps?.userSsr?.translatedDescription[dbLocale]
                ?.substring(0, 170)
                .split(dotStyle).length -
                1
            ) {
              return `${string.replace("\n", " ").replace("\r", "")}.`;
            }
          })
          .join("")}`
      : pageProps?.userSsr?.translatedDescription[dbLocale]
    : pageProps?.userSsr?.description?.length > 170
    ? `${pageProps?.userSsr?.description
        ?.substring(0, 170)
        .split(dotStyle)
        .map((string, i) => {
          if (
            i <
            pageProps?.userSsr?.description?.substring(0, 170).split(dotStyle)
              .length -
              1
          ) {
            return `${string.replace("\n", " ").replace("\r", "")}.`;
          }
        })
        .join("")}`
    : pageProps?.userSsr?.description?.length < 1
    ? description(
        pageProps._nextI18Next?.initialLocale,
        `${
          pageProps.userSsr?.firstname
            ? `${pageProps.userSsr?.firstname} ${pageProps.userSsr?.lastname}`
            : pageProps.userSsr?.username
        }`
      )
    : pageProps?.userSsr?.description;
  if (!pageProps?.userSsr || !pageProps?._nextI18Next) return <></>;
  if (pageProps?.userSsr === "not-found") return <PageNotFound />;
  return (
    <>
      <Head>
        {t && (
          <title>
            {title(
              pageProps._nextI18Next?.initialLocale === "default"
                ? "en"
                : pageProps._nextI18Next?.initialLocale,
              `${
                pageProps.userSsr?.firstname
                  ? `${pageProps.userSsr?.firstname} ${pageProps.userSsr?.lastname}`
                  : pageProps.userSsr?.username
              }`
            )}
          </title>
        )}
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/${pageProps.userSsr?.username}`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://www.dekitabi.com/${pageProps.userSsr?.username}`}
        />
        {languages?.map((lang, i) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/${pageProps.userSsr?.username}`}
            />
          );
        })}
        <meta
          name="title"
          content={title(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale,
            `${
              pageProps.userSsr?.firstname
                ? `${pageProps.userSsr?.firstname} ${pageProps.userSsr?.lastname}`
                : pageProps.userSsr?.username
            }`
          )}
        />
        <meta name="description" content={metaDescription} />
        <meta
          property="og:title"
          content={title(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale,
            `${
              pageProps.userSsr?.firstname
                ? `${pageProps.userSsr?.firstname} ${pageProps.userSsr?.lastname}`
                : pageProps.userSsr?.username
            }`
          )}
        />{" "}
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/${pageProps.userSsr?.username}`}
        />
        <meta property="og:description" content={metaDescription} />
        <meta
          name="twitter:title"
          content={title(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale,
            `${
              pageProps.userSsr?.firstname
                ? `${pageProps.userSsr?.firstname} ${pageProps.userSsr?.lastname}`
                : pageProps.userSsr?.username
            }`
          )}
        />
        <meta name="twitter:description" content={metaDescription} />
      </Head>
      <Profile id={query?.id} {...pageProps} />
    </>
  );
};
export default ProfilePage;
