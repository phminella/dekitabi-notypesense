const i18n = require("i18next");
const getCalendarLocales = async (language) => {
  return import(
    "../i18n/translation/calendar/translation-" + language?.code + ".json"
  ).then(async (resource) => {
    await i18n.init({
      lng: language.code,
      resources: {
        [language.code]: resource,
      },
      fallbackLng: {
        default: ["en"],
      },
    });
    const t = i18n.t;
    return {
      name: "calendarLocales",
      months: [
        [t("january"), t("jan")],
        [t("february"), t("feb")],
        [t("march"), t("mar")],
        [t("april"), t("apr")],
        [t("may"), t("shortMay")],
        [t("june"), t("jun")],
        [t("july"), t("jul")],
        [t("august"), t("aug")],
        [t("september"), t("sep")],
        [t("october"), t("oct")],
        [t("november"), t("nov")],
        [t("december"), t("dec")],
      ],
      weekDays: [
        [t("saturday"), t("sat")],
        [t("sunday"), t("sun")],
        [t("monday"), t("mon")],
        [t("tuesday"), t("tue")],
        [t("wednesday"), t("wed")],
        [t("thursday"), t("thu")],
        [t("friday"), t("fri")],
      ],
      digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      meridiems: [
        [t("AM"), t("am")],
        [t("PM"), t("pm")],
      ],
    };
  });
};

export default getCalendarLocales;
