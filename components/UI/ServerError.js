import { PageNotFoundStyles } from "./styles/PageNotFoundStyles";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
const PageNotFound = ({ err }) => {
  const router = useRouter();
  let functions;
  let sendEmail;
  try {
    functions = getFunctions(undefined, "asia-northeast1");
    sendEmail = httpsCallable(functions, "sendEmail");
  } catch (err) {
    console.log(err);
  }
  useEffect(() => {
    sendEmail({
      to: "contact@dekitabi.com",
      sender: "contact@dekitabi.com",
      subject: `dekitabi | Server Error`,
      body: `<p>page: <a href="https://www.dekitabi.com${
        router?.asPath
      }" target="_blank">https://www.dekitabi.com${
        router?.asPath
      }</a></p>  <p><strong>Error Message:</strong> ${
        err?.message || "No message"
      }</p>
          <p><strong>Stack Trace:</strong></p>
          <pre>${err?.stack || "No stack trace available"}</pre>`,
    });
  }, []);
  const errorTitle = {
    en: "An error has ocurred. We have received a message about it and will fix as soon as possible. Please try again later!",
    es: "Se ha producido un error. Hemos recibido un mensaje acerca de esto y lo solucionaremos lo antes posible. Por favor, vuelve a intentarlo más tarde.",
    tl: "May nangyaring pagakamali. Nakatanggap kami ng mensahe tungkol dito at aayusin ito sa lalong madaling panahon. Subukang muli mamaya!",
    fr: "Une erreur est survenue. Nous avons reçu un message à ce sujet et le corrigerons dès que possible. Veuillez réessayer plus tard!",
    id: "Sebuah kesalahan telah terjadi. Kami telah menerima pesan tentang hal itu dan akan memperbaikinya sesegera mungkin. Silakan coba lagi nanti!",
    it: "C'è stato un errore. Abbiamo ricevuto un messaggio a riguardo e risolveremo il problema il prima possibile. Per favore riprova più tardi!",
    ja: "エラーが発生しました。エラーに関するメッセージを受け取りました。申し訳ございませんがしばらくしてからもう一度お試しください。",
    ko: "오류가 발생했습니다. 오류에 대한 메시지를 받았습니다. 죄송합니다. 잠시 후 다시 시도해 주세요.",
    ms: "Ralat telah berlaku. Kami telah menerima mesej mengenainya dan akan membetulkannya secepat mungkin. Sila cuba sebentar lagi!",
    pt: "Ocorreu um erro. Recebemos uma mensagem sobre isso e iremos corrigi-lo o mais rápido possível. Por favor, tente novamente mais tarde!",
    th: "เกิดข้อผิดพลาด. เราได้รับข้อความเกี่ยวกับเรื่องนี้และจะแก้ไขโดยเร็วที่สุด กรุณาลองใหม่อีกครั้งในภายหลัง!",
    vi: "Một lỗi đã xảy ra. Chúng tôi đã nhận được thông báo về vấn đề này và sẽ khắc phục trong thời gian sớm nhất. Vui lòng thử lại sau!",
    zh_cn:
      "发生了错误。我收到一条有关错误的消息。对于给您带来的不便，我们深表歉意，但请稍后重试。",
    zh_tw:
      "發生了錯誤。我收到一條有關錯誤的訊息。對於造成您的不便，我們深表歉意，但請稍後再試。",
  };
  const goBack = {
    en: "Go back",
    es: "Regresa",
    tl: "Bumalik",
    fr: "Retourner",
    id: "Kembali",
    it: "Tornare",
    ja: "戻る",
    ko: "뒤로",
    ms: "Kembali",
    pt: "Voltar",
    th: "กลับ!",
    vi: "Quay lại",
    zh_cn: "返回",
    zh_tw: "返回",
  };
  console.log(router?.locale);
  return (
    <PageNotFoundStyles>
      <Head>
        <title>dekitabi</title>
      </Head>
      <div>
        <img
          width="100%"
          height="auto"
          src="/img/pageNotFound.webp"
          alt="not-found"
        />
        <h2>
          {errorTitle[router?.locale === "default" ? "en" : router?.locale]}
        </h2>
        <a
          className="error-back"
          onClick={() => (window.location = document.referrer)}
          style={{ display: "inline-text", textAlign: "center" }}
        >
          <Image height={15} width={15} src="/img/icon-back.svg" alt="map2" />
          {goBack[router?.locale === "default" ? "en" : router?.locale]}
        </a>
      </div>
    </PageNotFoundStyles>
  );
};
export default PageNotFound;
