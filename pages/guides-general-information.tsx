import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Spinner from "../components/UI/Spinner";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
export const getServerSideProps = async function (
  ctx: GetServerSidePropsContext
) {
  const UA: any = ctx.req.headers["user-agent"];
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );
  return {
    props: {
      isMobile,
      ...(await serverSideTranslations(ctx.locale as string, ["translation"])),
    },
  };
};
const GuidesGeneralInformation = dynamic(
  () => import("../components/Misc/GuidesGeneralInformation"),
  {
    loading: () => <Spinner />,
  }
);

const title = (language: string) => {
  const title = {
    en: "How to become a guide at dekitabi",
    es: "Cómo ser guía en dekitabi",
    tl: "Paano maging isang tour guide sa dekitabi",
    fr: "Comment devenir guide touristique chez dekitabi",
    id: "Bagaimana menjadi pemandu wisata di dekitabi",
    it: "Come diventare guida turistica presso dekitabi",
    ja: "dekitabiでツアーガイドになる案内",
    ko: "dekitabi로 투어 가이드가 되는 안내",
    ms: "Bagaimana untuk menjadi panduan di dekitabi",
    pt: "Como se tornar um guia com dekitabi",
    th: "จะเป็นไกด์ที่เดคิทาบิได้อย่างไร",
    vi: "Làm thế nào để trở thành hướng dẫn viên tại dekitabi",
    zh_cn: "如何成为 dekitabi 的导游",
    zh_tw: "如何成為 dekitabi 的導遊",
  };
  return title[language as keyof typeof title];
};
const description = (language: string) => {
  const description = {
    en: "Learn how to create your account, customize your profile, create your own itinerary and more! Get ready to show travelers the beauty of Japan with dekitabi.",
    es: "¡Aprenda cómo crear su cuenta, personalizar su perfil, crear su propio itinerario y más! Muestre a los viajeros la belleza de Japón con dekitabi.",
    tl: "Matutunan kung paano gumawa ng iyong account, i-customize ang iyong profile, gumawa ng sarili mong itinerary at higit pa! Ipakita sa mga manlalakbay ang kagandahan ng Japan sa pamamagitan ng dekitabi.",
    fr: "Apprenez à personnaliser votre profil, créer votre propre itinéraire et bien plus encore ! Montrez aux voyageurs la beauté du Japon avec dekitabi.",
    id: "Pelajari cara membuat akun, menyesuaikan profil, membuat rencana perjalanan sendiri, dan banyak lagi! Tunjukkan kepada wisatawan keindahan Jepang dengan dekitabi.",
    it: "Scopri come creare il tuo account, personalizzare il tuo profilo, creare il tuo itinerario e altro ancora! Mostra ai viaggiatori la bellezza del Giappone con dekitabi.",
    ja: "アカウントの作成方法、プロフィールのカスタマイズ方法、旅程の作成方法などの案内。dekitabiで観光客に日本の魅力を伝えましょう。",
    ko: "계정을 만드는 방법, 프로필을 맞춤설정하는 방법, 일정을 만드는 방법 등의 안내 dekitabi로 관광객들에게 일본의 매력을 전하세요.",
    ms: "Ketahui cara membuat akaun anda, menyesuaikan profil anda, membuat jadual perjalanan anda sendiri dan banyak lagi!　Mari sampaikan keindahan Jepun kepada pengembara dengan dekitabi.",
    pt: "Aprenda como criar sua conta, personalizar seu perfil, criar seu próprio roteiro e muito mais! Vamos mostrar a beleza do Japão aos viajantes com dekitabi.",
    th: "เรียนรู้วิธีสร้างบัญชีของคุณ ปรับแต่งโปรไฟล์ สร้างแผนการเดินทางของคุณเอง และอื่นๆ อีกมากมาย! แสดงให้นักเดินทางเห็นถึงความงามของญี่ปุ่นด้วยเดคิทาบิ",
    vi: "Tìm hiểu cách tạo tài khoản, tùy chỉnh hồ sơ của bạn, tạo hành trình của riêng bạn và hơn thế nữa! Cho du khách thấy vẻ đẹp của Nhật Bản với dekitabi.",
    zh_cn: "了解如何建立您的帳戶、自訂您的個人資料、建立自己的行程等等！通过 dekitabi 向旅行者展示日本的美丽。",
    zh_tw: "了解如何建立您的帳戶、自訂您的個人資料、建立自己的行程等等！透過 dekitabi 向旅客展示日本之美。",
  };
  return description[language as keyof typeof description];
};
const GuidesGeneralInformationPage: NextPage = (pageProps: any) => {
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
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/guides-general-information`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/guides-general-information"
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
              href={`https://www.dekitabi.com/${lang}/guides-general-information`}
            />
          );
        })}
        <title>
          {title(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale
          )}
        </title>
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
          property="og:url"
          content={`https://www.dekitabi.com/guides-general-information`}
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
      <GuidesGeneralInformation {...pageProps} />
    </>
  );
};

export default GuidesGeneralInformationPage;
