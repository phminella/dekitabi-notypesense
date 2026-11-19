import { ChatInputStyles } from "./styles/ChatInputStyles";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import useChat from "../../lib/useChat";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore/lite";
import { useSelector } from "react-redux";
const ChatInput = ({ currentChat, user, hasDeletedChat }) => {
  const language = useSelector((state) => state?.app?.language);
  const [message, setMessage] = useState("");
  const { sendMessage } = useChat();
  const messageHandler = () => {
    // Example usage in a Next.js API Route (or Server-Side):
    if (message?.replace(/\s/g, "")?.length > 0) {
      const intentKeywords = {
        en: [
          "no fees",
          "10%",
          "book directly",
          "contact me",
          "pay outside",
          "let’s talk somewhere else",
          "bypass the platform",
          "avoid the fees",
          "send me a message",
          "email me",
          "call me",
          "my phone number is",
          "I’ll pay you outside",
          "let’s skip the platform",
          "I have a better way to pay",
          "we can meet elsewhere",
          "contact me on whatsapp",
          "let's move this to email",
          "message me on line",
          "give me your contact details",
          "facebook",
          "instagram",
          "insta",
          "social media",
          "tiktok",
          "threads",
          "twitter",
          "x",
          "fb",
          "add me",
          "follow"
        ],
        es: [
          "10%",
          "reservar directamente",
          "contáctame",
          "pagar fuera",
          "fuera de la plataforma",
          "evitar los cargos",
          "envíame un mensaje",
          "mándame un correo",
          "llámame",
          "mi número es",
          "te pagaré fuera",
          "podemos vernos en otro lugar",
          "contáctame por whatsapp",
          "pasemos esto a email",
          "mándame un mensaje por line",
          "facebook",
          "instagram",
          "insta",
          "redes sociales",
          "tiktok",
          "threads",
          "twitter",
          "x",
        ],
        fr: [
          "10%",
          "réserver directement",
          "contacte-moi",
          "payer en dehors",
          "en dehors de la plateforme",
          "éviter les frais",
          "envoie-moi un message",
          "contacte-moi par email",
          "appelle-moi",
          "mon numéro est",
          "je vais te payer en dehors",
          "on peut se rencontrer ailleurs",
          "contacte-moi sur whatsapp",
          "passons à l'email",
          "envoie-moi un message sur line",
          "facebook",
          "instagram",
          "insta",
          "réseaux sociaux",
          "tiktok",
          "threads",
          "twitter",
          "x",
        ],
        id: [
          "10%",
          "pesan langsung",
          "hubungi saya",
          "bayar di luar",
          "lakukan di luar platform",
          "hindari biaya tambahan",
          "kirimi saya pesan",
          "kirimkan email",
          "telepon saya",
          "nomor saya adalah",
          "bayar di luar platform",
          "kita bisa bertemu di tempat lain",
          "hubungi saya lewat whatsapp",
          "pindah ke email",
          "kirim pesan di line",
          "facebook",
          "instagram",
          "insta",
          "media sosial",
          "tiktok",
          "threads",
          "twitter",
          "x",
        ],
        it: [
          "10%",
          "prenota direttamente",
          "contattami",
          "pagare fuori",
          "fuori dalla piattaforma",
          "evitare le commissioni",
          "mandami un messaggio",
          "contattami via email",
          "chiamami",
          "il mio numero è",
          "ti pago fuori dalla piattaforma",
          "possiamo incontrarci da un'altra parte",
          "contattami su whatsapp",
          "passiamo a email",
          "mandami un messaggio su line",
          "facebook",
          "instagram",
          "insta",
          "social media",
          "tiktok",
          "threads",
          "twitter",
          "x",
        ],
        ja: [
          "10%",
          "直接予約",
          "連絡して",
          "外で支払いたい",
          "このサイトを使わずに",
          "手数料を避ける",
          "メッセージを送って",
          "メールして",
          "電話して",
          "私の電話番号は",
          "外で支払う",
          "別の場所で会おう",
          "LINEで連絡して",
          "メールに移行しよう",
          "LINEでメッセージして",
          "フェイスブック",
          "インスタグラム",
          "インスタ",
          "ソーシャルメディア",
          "SNS",
          "ティックトック",
          "スレッズ",
          "ツイッター",
          "エックス",
        ],
        ko: [
          "10%",
          "직접 예약",
          "연락해",
          "외부에서 결제",
          "플랫폼을 벗어나서",
          "수수료를 피하다",
          "메시지 보내줘",
          "이메일로 연락해",
          "전화해",
          "내 번호는",
          "플랫폼 외부에서 결제할게",
          "다른 곳에서 만날까",
          "whatsapp으로 연락해",
          "이메일로 가자",
          "line에서 메시지 보내",
          "페이스북",
          "인스타그램",
          "인스타",
          "소셜미디어",
          "틱톡",
          "스레드",
          "트위터",
          "엑스",
        ],
        ms: [
          "10%",
          "tempah terus",
          "hubungi saya",
          "bayar luar",
          "di luar platform",
          "elakkan yuran",
          "hantar mesej kepada saya",
          "hubungi saya melalui email",
          "telefon saya",
          "nombor saya adalah",
          "bayar di luar",
          "kita boleh bertemu di tempat lain",
          "hubungi saya di whatsapp",
          "berpindah ke email",
          "hantar mesej di line",
          "facebook",
          "instagram",
          "insta",
          "media sosial",
          "tiktok",
          "threads",
          "twitter",
          "x",
        ],
        pt: [
          "10%",
          "reservar diretamente",
          "me contate",
          "pagar fora",
          "fora da plataforma",
          "evitar taxas",
          "me envie uma mensagem",
          "contate-me por email",
          "me ligue",
          "meu número é",
          "vou te pagar fora",
          "podemos nos encontrar em outro lugar",
          "me contate pelo whatsapp",
          "vamos para o email",
          "me mande uma mensagem no line",
          "facebook",
          "instagram",
          "insta",
          "mídias sociais",
          "tiktok",
          "threads",
          "twitter",
          "x",
        ],
        th: [
          "10%",
          "จองโดยตรง",
          "ติดต่อฉัน",
          "จ่ายนอกระบบ",
          "ออกจากแพลตฟอร์ม",
          "หลีกเลี่ยงค่าธรรมเนียม",
          "ส่งข้อความหาฉัน",
          "ติดต่อทางอีเมล",
          "โทรหาฉัน",
          "หมายเลขโทรศัพท์ของฉันคือ",
          "ฉันจะจ่ายข้างนอก",
          "เราสามารถพบกันที่อื่น",
          "ติดต่อฉันทาง whatsapp",
          "ไปที่อีเมล",
          "ส่งข้อความใน line",
          "เฟสบุ๊ค",
          "อินสตาแกรม",
          "อินสตา",
          "โซเชียลมีเดีย",
          "ติ๊กต๊อก",
          "เธรด",
          "ทวิตเตอร์",
          "เอ็กซ์",
        ],
        tl: [
          "10%",
          "diretsong pag-book",
          "kontakin ako",
          "bayad sa labas",
          "sa labas ng platforma",
          "iwasan ang bayarin",
          "magpadala ng mensahe",
          "kontakin ako sa email",
          "tawagan mo ako",
          "ang numero ko ay",
          "magbabayad ako sa labas",
          "pwede tayong magtagpo sa ibang lugar",
          "kontakin ako sa whatsapp",
          "pumunta sa email",
          "magpadala ng mensahe sa line",
          "facebook",
          "instagram",
          "insta",
          "social media",
          "tiktok",
          "threads",
          "twitter",
          "x",
        ],
        vi: [
          "10%",
          "đặt trực tiếp",
          "liên hệ tôi",
          "thanh toán ngoài",
          "ngoài nền tảng",
          "tránh phí",
          "gửi tin nhắn cho tôi",
          "liên hệ qua email",
          "gọi tôi",
          "số của tôi là",
          "tôi sẽ thanh toán ngoài",
          "chúng ta có thể gặp nhau ở nơi khác",
          "liên hệ tôi qua whatsapp",
          "chuyển sang email",
          "gửi tin nhắn qua line",
          "facebook",
          "instagram",
          "insta",
          "mạng xã hội",
          "tiktok",
          "threads",
          "twitter",
          "x",
        ],
        zh_cn: [
          "10%",
          "直接预订",
          "联系我",
          "微信转账",
          "不通过平台",
          "避免收费",
          "给我发消息",
          "发邮件给我",
          "打电话给我",
          "我的电话是",
          "我将在外部付款",
          "我们可以在其他地方见面",
          "通过 whatsapp 联系我",
          "转到邮件",
          "通过 line 发消息",
          "脸书",
          "Instagram",
          "Instagram",
          "社交媒体",
          "抖音",
          "Threads",
          "推特",
          "X",
        ],
        zh_tw: [
          "10%",
          "直接預訂",
          "聯絡我",
          "微信轉帳",
          "不通過平台",
          "避免收費",
          "發送消息給我",
          "發送電子郵件給我",
          "打電話給我",
          "我的電話是",
          "我會在外部付款",
          "我們可以在其他地方見面",
          "通過 whatsapp 聯絡我",
          "轉到電子郵件",
          "通過 line 發送消息",
          "臉書",
          "Instagram",
          "Instagram",
          "社交媒體",
          "抖音",
          "Threads",
          "推特",
          "X",
        ],
      };
      function containsSensitiveData(message) {
        const regexList = [
          /\b(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(?:\/\S*)?\b/g, // Website URLs
          /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, // Email addresses
          /\b(?:\+?(\d{1,3})[-.\s]?)?(?:\(?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,9}\b/g, // Phone numbers
          /(?:instagram\.com\/|@)[a-zA-Z0-9_.]+/g, // Instagram handles
          /(?:https?:\/\/)?(?:wa\.me\/|api\.whatsapp\.com\/send\?phone=)(?:\+?[1-9]{1}[0-9]{3,14})/g, // WhatsApp links
          /(?:https?:\/\/)?line\.me\/R\/ti\/p\/[a-zA-Z0-9]+/g, // Line links
          /(?:https?:\/\/)?t\.me\/([a-zA-Z0-9_]+)/g, // Telegram handles
          /(?:https?:\/\/)?viber\.me\/([a-zA-Z0-9_]+)/g, // Viber links
          /(?:https?:\/\/)?(?:web\.wechat\.com|mp\.wechat\.com|wechat\.com)\/[a-zA-Z0-9_]+/g, // WeChat IDs
          /(?:https?:\/\/)?kakao\.me\/[a-zA-Z0-9_]+/g, // KakaoTalk IDs
          /(?:https?:\/\/)?skype:\+?[0-9a-zA-Z\.\_\-]+(?:\?call)?/g, // Skype links
          /(?:https?:\/\/)?zoom\.us\/j\/[0-9]{9,12}/g, // Zoom links
          /(?:https?:\/\/)?meet\.google\.com\/[a-zA-Z0-9\-_]{10,}/g, // Google Meet links
          /(?:https?:\/\/)?[a-zA-Z0-9-]+\.slack\.com/g, // Slack links
          /(?:https?:\/\/)?teams\.microsoft\.com\/l\/meetup-join\/[a-zA-Z0-9\-_]+/g, // Microsoft Teams links
          /(?:https?:\/\/)?m\.me\/[a-zA-Z0-9_]+/g, // Facebook Messenger links
          /(?:https?:\/\/)?(live|lync)\.com\/[a-zA-Z0-9\.\-_]+/g, // Skype for Business links
          /(?:https?:\/\/)?discord\.gg\/[a-zA-Z0-9]+/g, // Discord links
          /(?:https?:\/\/)?(?:www\.)?pinterest\.com\/[a-zA-Z0-9_]+/g, // Pinterest links
          /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[a-zA-Z0-9_]+/g, // TikTok links
          /(?:https?:\/\/)?(?:www\.)?qq\.com\/[a-zA-Z0-9]+/g, // QQ links
          /(?:https?:\/\/)?(?:weibo\.com\/)([a-zA-Z0-9_]+)/g, // Sina Weibo links
        ];
        const matches = regexList
          .map((regex) => [...message.matchAll(regex)])
          .flat();
        return matches.map((match) => match[0]);
      }
      // detectIntent.js
      const lower = message.toLowerCase();
      const patterns =
        Array.from(
          new Set([...intentKeywords[language?.code], intentKeywords["en"]])
        ) || [];
      // Check for suspicious keywords (booking outside the platform)
      const suspiciousIntent = patterns.some((keyword) =>
        lower.includes(keyword)
      );
      // Check if message contains any website, email, phone number, or Instagram handle
      const containsSensitiveInfo = containsSensitiveData(message);
      console.log(containsSensitiveInfo);
      if (suspiciousIntent || containsSensitiveInfo?.length > 0) {
        const suspiciousChatRef = doc(getFirestore(), "misc", "suspiciousChat");
        updateDoc(suspiciousChatRef, {
          chats: arrayUnion({
            chat: `${user?.guide === "true" ? user?.uid : currentChat?.uid}${
              user?.guide === "false" ? user?.uid : currentChat?.uid
            }`,
            user: {
              email: user?.email,
              uid: user?.uid,
              firstname: user?.firstname,
              lastname: user?.lastname,
            },
            message,
            chatingWith: {
              email: currentChat?.email,
              uid: currentChat?.uid,
              firstname: currentChat?.firstname,
              lastname: currentChat?.lastname,
            },
            time: new Date().getTime(),
          }),
        });
      }
      const userRef = doc(getFirestore(), "users", user.uid);
      updateDoc(userRef, {
        lastVisit: new Date().getTime(),
      });
      sendMessage(
        user,
        user?.guide === "true" ? user : currentChat,
        user?.guide === "false" ? user : currentChat,
        message,
        hasDeletedChat
      );
      setMessage("");
      var textarea = document.getElementById("chat-input");
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  useEffect(() => {
    var textarea = document.getElementById("chat-input");
    textarea.addEventListener("keydown", autosize);
    function autosize(e) {
      var el = this;
      setTimeout(function () {
        el.style.cssText = "height:auto";
        el.style.cssText = "height:" + el.scrollHeight + "px";
      }, 0);
    }
  }, []);
  return (
    <ChatInputStyles>
      <textarea
        id="chat-input"
        type="text"
        maxLength={220}
        minLength={1}
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (message.replace(/\s/g, "")?.length > 0) {
              messageHandler();
            }
          }
        }}
      />
      <button
        onClick={messageHandler}
        disabled={message.replace(/\s/g, "")?.length < 1}
      >
        <Image
          height={20}
          width={20}
          src="/img/icon-send.svg"
          alt="send-dekitabi-chat-message"
        />
      </button>
    </ChatInputStyles>
  );
};
export default ChatInput;
