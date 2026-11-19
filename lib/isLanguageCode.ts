export const isLanguageCode: (code: string | undefined) => boolean = (code) => {
  return [
    "en",
    "ja",
    "zh-CN",
    "zh-TW",
    "ko",
    "fil",
    "th",
    "vi",
    "ms",
    "fr",
    "es",
    "it",
    "pt",
    "id",
  ].includes(code ?? "false");
};
