import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setLanguage } from "../store/appSlice";
import { useSelector } from "react-redux";
import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
const useChangeLanguage = () => {
  const user = useSelector((state) => state.app.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const changeLanguage = (language, initial) => {
    let locale;
    if (!language?.code) {
      const languages = [
        { code: "en", language: "English" },
        { code: "ja", language: "日本語" },
        { code: "zh-CN", language: "简体中文" },
        { code: "zh-TW", language: "繁體中文(台湾)" },
        { code: "zh-TW", language: "繁體中文(香港)" },
        { code: "ko", language: "한국어" },
        { code: "fil", language: "Filipino" },
        { code: "id", language: "Bahasa Indonesia" },
        { code: "th", language: "ไทย" },
        { code: "vi", language: "Tiếng Việt" },
        { code: "ms", language: "Bahasa Melayu" },
        { code: "fr", language: "Français" },
        { code: "es", language: "Español" },
        { code: "it", language: "Italiano" },
        { code: "pt", language: "Português" },
      ];
      if (router?.locale === "zh_tw") {
        locale = { code: "zh-TW", language: "繁體中文(台湾)" };
      } else if (router?.locale === "zh_cn") {
        locale = { code: "zh-CN", language: "繁體中文(台湾)" };
      } else if (router?.locale === "tl") {
        locale = { code: "fil", language: "Filipino" };
      } else {
        let index = languages.findIndex((lng) => lng.code === router.locale);
        if (index > -1) {
          locale = languages[index];
        } else {
          locale = { code: "en", language: "English" };
        }
      }
    } else {
      locale = language;
    }
    import("./momentLocales/" + locale?.code.toLowerCase()).then(async () => {
      // moment.locale(locale?.code.toLowerCase());
      if (user?.uid && !user?.shopId) {
        const userRef = doc(getFirestore(), "users", user.uid);
        await updateDoc(userRef, { language: locale });
      }
      if (user?.uid && user?.shopId) {
        const userRef = doc(getFirestore(), "shops", user.uid);
        await updateDoc(userRef, { language: locale });
      }
      dispatch(setLanguage(locale));
      if (locale?.code !== router.locale) {
        let routerLocale;
        if (locale?.code === "zh-TW") {
          routerLocale = "zh_tw";
        } else if (locale?.code === "zh-CN") {
          routerLocale = "zh_cn";
        } else if (locale?.code === "fil") {
          routerLocale = "tl";
        } else {
          routerLocale = locale?.code;
        }
        // document.cookie = `NEXT_LOCALE=${routerLocale};`;
        const setCookie = (name, value, days) => {
          var expires = "";
          if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
          }
          document.cookie =
            name +
            "=" +
            (value || "") +
            "; SameSite=Lax" +
            expires +
            "; path=/";
        };
        setCookie("firebase-language-override", routerLocale, 360);
        if (
          ((locale?.code !== "fil" &&
            locale?.code !== "zh-TW" &&
            router?.locale !== "default" &&
            locale?.code !== "zh-CN" &&
            locale?.code !== router.locale) ||
            (locale?.code === "en" &&
              router.locale !== "default" &&
              router.locale !== "en") ||
            (router.locale === "default" && locale?.code !== "en") ||
            (locale?.code === "zh-TW" && router.locale !== "zh_tw") ||
            (locale?.code === "fil" && router.locale !== "tl") ||
            (locale?.code === "zh-CN" && router.locale !== "zh_cn")) &&
          !initial
        ) {
          router.push(
            {
              pathname: router.pathname,
              query: router.query,
            },
            router.asPath,
            {
              locale: routerLocale,
              scroll: false,
            }
          );
          router.events.on("routeChangeComplete", () => {
            router.reload();
          });
        }
      }
    });
  };
  return { changeLanguage };
};
export default useChangeLanguage;
