import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ja from "javascript-time-ago/locale/ja";
import ko from "javascript-time-ago/locale/ko";
import fil from "javascript-time-ago/locale/fil";
import th from "javascript-time-ago/locale/th";
import vi from "javascript-time-ago/locale/vi";
import ms from "javascript-time-ago/locale/ms";
import id from "javascript-time-ago/locale/id";
import fr from "javascript-time-ago/locale/fr";
import es from "javascript-time-ago/locale/es";
import it from "javascript-time-ago/locale/it";
import zh from "javascript-time-ago/locale/zh";
import pt from "javascript-time-ago/locale/pt";
const setTimeAgoLocale = (language) => {
  if (language) {
    if (language?.code === "en") {
      TimeAgo.addLocale(en);
    } else if (language?.code === "ja") {
      TimeAgo.addLocale(ja);
    } else if (language?.code === "zh-CN" || language?.code === "zh-TW") {
      TimeAgo.addLocale(zh);
    } else if (language?.code === "ko") {
      TimeAgo.addLocale(ko);
    } else if (language?.code === "fil") {
      TimeAgo.addLocale(fil);
    } else if (language?.code === "th") {
      TimeAgo.addLocale(th);
    } else if (language?.code === "vi") {
      TimeAgo.addLocale(vi);
    } else if (language?.code === "fr") {
      TimeAgo.addLocale(fr);
    } else if (language?.code === "es") {
      TimeAgo.addLocale(es);
    } else if (language?.code === "it") {
      TimeAgo.addLocale(it);
    } else if (language?.code === "ms") {
      TimeAgo.addLocale(ms);
    } else if (language?.code === "id") {
      TimeAgo.addLocale(id);
    } else TimeAgo.addLocale(pt);
    return new TimeAgo(language?.code);
  }
};
export default setTimeAgoLocale;
