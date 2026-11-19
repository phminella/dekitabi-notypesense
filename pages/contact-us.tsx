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
const ContactUs = dynamic(() => import("../components/Misc/ContactUs"), {
  loading: () => <Spinner />,
});

const title = (language: string) => {
  const title = {
    en: "Contact us",
    es: "Contacta con nosotros",
    tl: "Makipag-ugnayan sa amin",
    fr: "Contactez-nous",
    id: "Hubungi kami",
    it: "Contattaci",
    ja: "お問い合わせ",
    ko: "문의하기",
    ms: "Hubungi Kami",
    pt: "Contate-nos",
    th: "ติดต่อเรา",
    vi: "Liên hệ chúng tôi",
    zh_cn: "联系我们",
    zh_tw: "聯絡我們",
  };
  return title[language as keyof typeof title];
};
const description = (language: string) => {
  const description = {
    en: "Questions about account, guides, itinerary, bookings, etc? Send us a message!",
    es: "¿Preguntas sobre cuenta, guías, itinerario, reservas, etc? ¡Mandanos un mensaje!",
    tl: "Mga tanong tungkol sa account, mga gabay, itinerary, mga booking, atbp? Padalhan kami ng mensahe!",
    fr: "Des questions sur le compte, les guides, l'itinéraire, les réservations, etc. ? Envoie-nous un message!",
    id: "Pertanyaan tentang akun, panduan, rencana perjalanan, pemesanan, dll? Kirimkan pesan kepada kami!",
    it: "Domande su account, guide, itinerario, prenotazioni, ecc.? Mandaci un messaggio!",
    ja: "アカウント、ガイド、旅程、予約などについてご質問がございましたらメッセージをお送りください。",
    ko: "계정, 가이드, 여정, 예약 등에 대해 궁금한 점이 있으면 메시지를 보내주십시오.",
    ms: "Soalan tentang akaun, panduan, jadual perjalanan, tempahan, dll? Hantar mesej kepada kami!",
    pt: "Dúvidas sobre conta, guias, itinerário, reservas, etc? Envie-nos uma mensagem!",
    th: "มีคำถามเกี่ยวกับบัญชี คู่มือ แผนการเดินทาง การจอง ฯลฯ ไหม? ส่งข้อความถึงเรา!",
    vi: "Các câu hỏi về tài khoản, hướng dẫn, hành trình, đặt chỗ, v.v.? Gửi tin nhắn cho chúng tôi!",
    zh_cn: "对帐户、指南、行程、预订等有疑问？请给我们留言！",
    zh_tw: "對帳戶、指南、行程、預訂等有疑問嗎？給我們發訊息！",
  };
  return description[language as keyof typeof description];
};
const ContactUsPage: NextPage = (pageProps: any) => {
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
          }/contact-us`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.dekitabi.com/contact-us"
        />
        {languages?.map((lang: string, i: any) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/contact-us`}
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
          content={`${description(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale
          )} ${t("returnMsg", { time: "48" })}`}
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
          content={`${description(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale
          )} ${t("returnMsg", { time: "48" })}`}
        />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/contact-us`}
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
          content={`${description(
            pageProps._nextI18Next?.initialLocale === "default"
              ? "en"
              : pageProps._nextI18Next?.initialLocale
          )} ${t("returnMsg", { time: "48" })}`}
        />
      </Head>
      <ContactUs suggestions={false} auth={false} />
    </>
  );
};

export default ContactUsPage;
