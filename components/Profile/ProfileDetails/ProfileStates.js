import { ProfileStatesStyles } from "./styles/ProfileStatesStyles";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
const ProfileStates = ({ profile, t }) => {
  const language = useSelector((state) => state.app.language);
  const links = {
    東京都: `/s/Tokyo`,
    京都府: `/s/Kyoto-City`,
    大阪府: `/s/Osaka-city`,
    奈良県: `/s/Nara-City`,
    愛知県: `/s/Nagoya-city`,
    秋田県: `s/Akita-City`,
    青森県: `/s/Aomori-City`,
    千葉県: `/s/Chiba-City`,
    愛媛県: `/s/Matsuyama-City`,
    福井県: `/s/Fukui-City`,
    福岡県: `/s/Fukuoka-City`,
    福島県: `/s/Fukushima-City`,
    岐阜県: `/s/Takayama-City`,
    群馬県: `/s/Maebashi-City`,
    広島県: `/s/Hiroshima-city`,
    北海道: `/s/Sapporo`,
    兵庫県: `/s/Himeji-City`,
    茨城県: `/s/Mito-City`,
    石川県: `/s/Kanazawa-City`,
    岩手県: `/s/Morioka-City`,
    香川県: `/s/Takamatsu-City`,
    鹿児島県: `/s/Kagoshima-City`,
    神奈川県: `/s/Yokohama`,
    高知県: `/s/Kochi-City`,
    熊本県: `/s/Kumamoto-City`,
    三重県: `/s/Ise-City`,
    宮城県: `/s/Sendai-city`,
    宮崎県: `/s/Miyazaki-City`,
    長野県: `/s/Nagano-city`,
    長崎県: `/s/Nagasaki-city`,
    新潟県: `/s/Niigata-City`,
    大分県: `/s/Ota-City`,
    岡山県: `/s/Okayama-City`,
    沖縄県: `/s/Naha-city`,
    佐賀県: `/s/Saga-City`,
    埼玉県: `/s/Kawagoe-City`,
    滋賀県: `/s/Otsu-City`,
    島根県: `/s/Matsue-City`,
    静岡県: `/s/Shizuoka-City`,
    栃木県: `/s/Nikko-City`,
    徳島県: `/s/Tokushima-City`,
    鳥取県: `/s/Tottori-City`,
    富山県: `/s/Toyama-City`,
    和歌山県: `/s/Wakayama-City`,
    山形県: `/s/Yamagata-City`,
    山口県: `/s/Yamaguchi-City`,
    山梨県: `/s/Fujikawaguchiko-Town`,
  };
  return (
    <ProfileStatesStyles>
      <p className="profile-title">{t("prefecturesCanGuide")}</p>
      <div className="states">
        {!profile?.translatedStates[profile?.states?.length - 1] ? (
          <Image
            width={30}
            height={30}
            alt="loading-dekitabi-tour-guide-states"
            src={"/img/icon-spinner.svg"}
          />
        ) : (
          <>
            {profile?.states?.map((state, i) => (
              <Link prefetch={false} href={links[state]} key={i}>
                <div className="state">
                  {profile?.translatedStates[i][language?.code]}
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </ProfileStatesStyles>
  );
};
export default React.memo(ProfileStates);
