import Link from "next/link";
import { ItineraryPublishedStyles } from "./styles/ItineraryPublishedStyles";
import Image from "next/image";
import React from "react";

interface ItineraryPublishedProps {
  published: boolean;
  t: (key: string, options?: any) => string;
  state: string;
  translatedState: string;
}

const ItineraryPublished = ({
  published,
  t,
  state,
  translatedState,
}: ItineraryPublishedProps) => {
  const links = {
    東京都tokyo: `/s/Tokyo`,
    京都府kyoto: `/s/Kyoto-City`,
    大阪府osaka: `/s/Osaka-city`,
    奈良県nara: `/s/Nara-City`,
    愛知県aichi: `/s/Nagoya-city`,
    秋田県akita: `s/Akita-City`,
    青森県aomori: `/s/Aomori-City`,
    千葉県chiba: `/s/Chiba-City`,
    愛媛県ehime: `/s/Matsuyama-City`,
    福井県fukui: `/s/Fukui-City`,
    福岡県fukuoka: `/s/Fukuoka-City`,
    福島県fukushima: `/s/Fukushima-City`,
    岐阜県gifu: `/s/Takayama-City`,
    群馬県gunma: `/s/Maebashi-City`,
    広島県hiroshima: `/s/Hiroshima-city`,
    北海道hokkaido: `/s/Sapporo`,
    兵庫県hyogo: `/s/Himeji-City`,
    茨城県ibaraki: `/s/Mito-City`,
    石川県ishikawa: `/s/Kanazawa-City`,
    岩手県iwate: `/s/Morioka-City`,
    香川県kagawa: `/s/Takamatsu-City`,
    鹿児島県kagoshima: `/s/Kagoshima-City`,
    神奈川県kanagawa: `/s/Yokohama`,
    高知県kochi: `/s/Kochi-City`,
    熊本県kumamoto: `/s/Kumamoto-City`,
    三重県mie: `/s/Ise-City`,
    宮城県miyagi: `/s/Sendai-city`,
    宮崎県miyazaki: `/s/Miyazaki-City`,
    長野県nagano: `/s/Nagano-city`,
    長崎県nagasaki: `/s/Nagasaki-city`,
    新潟県niigata: `/s/Niigata-City`,
    大分県ota: `/s/Ota-City`,
    岡山県okayama: `/s/Okayama-City`,
    沖縄県okinawa: `/s/Naha-city`,
    佐賀県saga: `/s/Saga-City`,
    埼玉県saitama: `/s/Kawagoe-City`,
    滋賀県shiga: `/s/Otsu-City`,
    島根県shimane: `/s/Matsue-City`,
    静岡県shizuoka: `/s/Shizuoka-City`,
    栃木県tochigi: `/s/Nikko-City`,
    徳島県tokushima: `/s/Tokushima-City`,
    鳥取県tottori: `/s/Tottori-City`,
    富山県toyama: `/s/Toyama-City`,
    和歌山県wakayama: `/s/Wakayama-City`,
    山形県yamagata: `/s/Yamagata-City`,
    山口県yamaguchi: `/s/Yamaguchi-City`,
    山梨県yamanashi: `/s/Fujikawaguchiko-Town`,
  };
  return (
    <ItineraryPublishedStyles className={published ? "show" : ""}>
      <Link
        href={
          (() => {
            const matchedKey = Object.keys(links).find((key) =>
              key.includes(state?.toLowerCase())
            ) as keyof typeof links | undefined;
            return matchedKey ? links[matchedKey] : "/";
          })()
        }
        target="_blank"
        prefetch={false}
      >
        <Image
          height={20}
          width={20}
          src="/img/icon-publish.svg"
          alt="checked"
        />
        {t("publishedIn", { state: translatedState })}
      </Link>
    </ItineraryPublishedStyles>
  );
};
export default React.memo(ItineraryPublished);
