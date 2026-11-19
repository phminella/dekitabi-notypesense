import { NextRequest, NextResponse } from "next/server";
const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }
  const languages: any = [
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
  let browserLang: any = req.headers.get("accept-language")?.split(",")[0];
  if (browserLang.split("-")[0] !== "zh") {
    browserLang = browserLang.split("-")[0];
  } else {
    if (browserLang.includes("hk") || browserLang.includes("tw")) {
      browserLang = "zh_tw";
    } else {
      browserLang = "zh_cn";
    }
  }
  if (!languages.includes(browserLang)) {
    browserLang = "en";
  }
  if (req.nextUrl.locale === "default") {
    const locale =
      req.cookies.get("firebase-language-override")?.value || browserLang;
    if (locale !== "en") {
      return NextResponse.redirect(
        new URL(
          `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
          req.url
        )
      );
    }
  }
}
