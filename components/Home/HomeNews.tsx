import { HomeNewsStyles } from "./styles/HomeNewsStyles";
import Image from "next/image";
import { TFunction } from "next-i18next";
import { Language, RailPassUrls } from "../../types/home";

interface HomeNewsProps {
  t: TFunction;
  language: Language;
}

/**
 * Per-locale rail pass URL mappings.
 * Extracted from the original chained-if logic (IMPROVEMENT-3, ERROR-3):
 * - eliminates duplicate "es" condition
 * - prevents state-clobbering from two sequential if-blocks
 * - makes additions/corrections trivial
 */
const RAIL_PASS_URLS: Record<string, RailPassUrls> = {
  en: {
    japanRailPassUrl: "https://japanrailpass.net/en/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/en/pass/eastpass_t.html",
    seishun18Url: "https://www.jreast.co.jp/multi/en/pass/tokyowidepass.html",
  },
  vi: {
    japanRailPassUrl: "https://japanrailpass.net/en/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/en/pass/eastpass_t.html",
    seishun18Url: "https://www.jreast.co.jp/multi/en/pass/tokyowidepass.html",
  },
  fil: {
    japanRailPassUrl: "https://japanrailpass.net/en/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/en/pass/eastpass_t.html",
    seishun18Url: "https://www.jreast.co.jp/multi/en/pass/tokyowidepass.html",
  },
  pt: {
    japanRailPassUrl: "https://japanrailpass.net/en/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/es/pass/eastpass_t.html",
    seishun18Url: "https://www.jreast.co.jp/multi/es/pass/tokyowidepass.html",
  },
  it: {
    japanRailPassUrl: "https://japanrailpass.net/en/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/es/pass/eastpass_t.html",
    seishun18Url: "https://www.jreast.co.jp/multi/es/pass/tokyowidepass.html",
  },
  es: {
    japanRailPassUrl: "https://japanrailpass.net/en/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/es/pass/eastpass_t.html",
    seishun18Url: "https://www.jreast.co.jp/multi/es/pass/tokyowidepass.html",
  },
  id: {
    japanRailPassUrl: "https://japanrailpass.net/en/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/id/pass/eastpass_t.html",
    seishun18Url: "https://www.jreast.co.jp/multi/id/pass/tokyowidepass.html",
  },
  ms: {
    japanRailPassUrl: "https://japanrailpass.net/en/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/id/pass/eastpass_t.html",
    seishun18Url: "https://www.jreast.co.jp/multi/id/pass/tokyowidepass.html",
  },
  fr: {
    japanRailPassUrl: "https://japanrailpass.net/fr/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/fr/pass/eastpass_t.html",
    seishun18Url: "https://www.jreast.co.jp/multi/fr/pass/tokyowidepass.html",
  },
  th: {
    japanRailPassUrl: "https://japanrailpass.net/th/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/th/pass/eastpass_t.html",
    seishun18Url: "https://www.jreast.co.jp/multi/th/pass/tokyowidepass.html",
  },
  ko: {
    japanRailPassUrl: "https://japanrailpass.net/kr/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/ko/pass/eastpass_t.html",
    seishun18Url: "https://www.jreast.co.jp/multi/ko/pass/tokyowidepass.html",
  },
  "zh-CN": {
    japanRailPassUrl: "https://japanrailpass.net/cn/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/zh-CHS/pass/eastpass_t.html",
    seishun18Url:
      "https://www.jreast.co.jp/multi/zh-CHS/pass/tokyowidepass.html",
  },
  "zh-TW": {
    japanRailPassUrl: "https://japanrailpass.net/zh/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/zh-CHT/pass/eastpass_t.html",
    seishun18Url:
      "https://www.jreast.co.jp/multi/zh-CHT/pass/tokyowidepass.html",
  },
  ja: {
    japanRailPassUrl: "https://japanrailpass.net/purchase/price/",
    tohokuUrl: "https://www.jreast.co.jp/multi/pass/eastpass_t.html",
    seishun18Url: "https://www.jreast.co.jp/multi/pass/tokyowidepass.html",
  },
};

const FALLBACK_URLS: RailPassUrls = {
  japanRailPassUrl: "https://japanrailpass.net/en/purchase/price/",
  tohokuUrl: "https://www.jreast.co.jp/multi/en/pass/eastpass_t.html",
  seishun18Url: "https://www.jreast.co.jp/multi/en/pass/tokyowidepass.html",
};

const HomeNews = ({ t, language }: HomeNewsProps): JSX.Element => {
  const urls = RAIL_PASS_URLS[language?.code] ?? FALLBACK_URLS;

  const { japanRailPassUrl, tohokuUrl, seishun18Url } = urls;

  return (
    <HomeNewsStyles>
      <div className="announcements">
        <p className="news-title">{String(t("suggestedPasses"))}</p>
        <ul className="news">
          <li className="news-mobile">
            <Image
              src="/img/home/jr-1.png"
              alt="jr-pass-1"
              height={80}
              width={80}
              className="rail-pass"
            />
            <div className="pass-content">
              <p className="pass-name">Japan Rail Pass</p>
              <a href={japanRailPassUrl} target="_blank" rel="noreferrer">
                {String(t("open24h"))}
              </a>
            </div>
          </li>
          <li className="news-mobile">
            <Image
              src="/img/home/jr-logo.svg"
              alt="jr-pass-2"
              height={80}
              width={80}
            />
            <div className="pass-content">
              <p className="pass-name">JR Tohoku</p>
              <a href={tohokuUrl} target="_blank" rel="noreferrer">
                {String(t("open24h"))}
              </a>
            </div>
          </li>
          <li className="news-mobile">
            <Image
              src="/img/home/jr-logo.svg"
              alt="jr-pass-3"
              height={80}
              width={80}
            />
            <div className="pass-content">
              <p className="pass-name">JR Tokyo</p>
              <a href={seishun18Url} target="_blank" rel="noreferrer">
                {String(t("open24h"))}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </HomeNewsStyles>
  );
};

export default HomeNews;
