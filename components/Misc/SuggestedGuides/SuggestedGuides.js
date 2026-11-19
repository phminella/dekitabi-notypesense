import { useEffect, useState, useCallback } from "react";
import { SuggestedGuidesStyles } from "./styles/SuggestedGuidesStyles";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import {
  getDocs,
  getFirestore,
  collection,
  query,
  where,
  limit,
  or,
  orderBy,
} from "firebase/firestore/lite";
const SuggestedGuides = ({ t, itineraryAttractions, setShowGuideList }) => {
  const [guides, setGuides] = useState([]);
  const [guidesFrom, setGuidesFrom] = useState();
  const [loading, setLoading] = useState(true);
  const hasAttractions = (itineraryAttractions?.length || 0) > 0;
  const firstAttractionState = itineraryAttractions?.[0]?.state;
  const getSuggestedGuides = useCallback(async () => {
    const states = {
      東京都tokyo: `東京都`,
      京都府kyoto: `京都府`,
      大阪府osaka: `大阪府`,
      奈良県nara: `奈良県`,
      愛知県aichi: `愛知県`,
      秋田県akita: `秋田県`,
      青森県aomori: `青森県`,
      千葉県chiba: `千葉県`,
      愛媛県ehime: `愛媛県`,
      福井県fukui: `福井県`,
      福岡県fukuoka: `福岡県`,
      福島県fukushima: `福島県`,
      岐阜県gifu: `岐阜県`,
      群馬県gunma: `群馬県`,
      広島県hiroshima: `広島県`,
      北海道hokkaido: `北海道`,
      兵庫県hyogo: `兵庫県`,
      茨城県ibaraki: `茨城県`,
      石川県ishikawa: `石川県`,
      岩手県iwate: `岩手県`,
      香川県kagawa: `香川県`,
      鹿児島県kagoshima: `鹿児島県`,
      神奈川県kanagawa: `神奈川県`,
      高知県kochi: `高知県`,
      熊本県kumamoto: `熊本県`,
      三重県mie: `三重県`,
      宮城県miyagi: `宮城県`,
      宮崎県miyazaki: `宮崎県`,
      長野県nagano: `長野県`,
      長崎県nagasaki: `長崎県`,
      新潟県niigata: `新潟県`,
      大分県ota: `大分県`,
      岡山県okayama: `岡山県`,
      沖縄県okinawa: `沖縄県`,
      佐賀県saga: `佐賀県`,
      埼玉県saitama: `埼玉県`,
      滋賀県shiga: `滋賀県`,
      島根県shimane: `島根県`,
      静岡県shizuoka: `静岡県`,
      栃木県tochigi: `栃木県`,
      徳島県tokushima: `徳島県`,
      鳥取県tottori: `鳥取県`,
      富山県toyama: `富山県`,
      和歌山県wakayama: `和歌山県`,
      山形県yamagata: `山形県`,
      山口県yamaguchi: `山口県`,
      山梨県yamanashi: `山梨県`,
    };
    let tempStates = [];
    await Promise.all(
      itineraryAttractions?.map(async (attraction, i) => {
        if (attraction?.state) {
          const attractionState = attraction?.state;
          let stateToAdd = Object.keys(states).filter((key) =>
            key.includes(attractionState?.split(" ")[0]?.toLowerCase())
          );
          if (!tempStates?.includes(states[stateToAdd[0]])) {
            tempStates.push(states[stateToAdd[0]]);
          }
        }
      })
    );
    // tempStates = "[" + tempStates?.slice(0, tempStates?.length - 2) + "]";
    const usersRef = collection(getFirestore(), "users");
    const q = query(
      usersRef,
      where("states", "array-contains-any", tempStates),
      where("verified", "==", "true"),
      limit(15),
      orderBy("avatar", "desc"),
      orderBy("fee.halfDay", "desc")
    );
    const querySnapshot = await getDocs(q);
    let tempGuides = [];
    let tempGuidesFrom = 99999999;
    querySnapshot.forEach((doc) => {
      if (
        doc.data().avatar !== "/img/avatar.png" ||
        doc.data().photos?.length > 0
      ) {
        let currentGuideFee = 99999999;
        currentGuideFee = doc.data()?.fee?.halfDay
          ? doc.data()?.fee?.halfDay
          : doc.data()?.fee?.fullDay;
        tempGuides.push(doc.data());
        tempGuidesFrom =
          tempGuidesFrom > currentGuideFee ? currentGuideFee : tempGuidesFrom;
      }
    });
    function shuffle(array) {
      let currentIndex = array.length;

      // While there remain elements to shuffle...
      while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    }
    let shuffledGuides = shuffle(tempGuides);
    setGuides(shuffledGuides.slice(0, 5));
    setGuidesFrom(tempGuidesFrom);
    setLoading(false);
  }, [itineraryAttractions]);
  useEffect(() => {
    if (hasAttractions && firstAttractionState) {
      getSuggestedGuides();
    }
  }, [firstAttractionState, getSuggestedGuides, hasAttractions]);
  if (loading) return <></>;
  if (guides?.length === 0 || loading)
    return (
      <div className="choose-guide">
        <Image
          width={70}
          height={70}
          src={"/img/icon-add-guide.svg"}
          alt="guide-avatar"
          className="guide-avatar"
        />
        <button
          className="normal-button"
          onClick={() => setShowGuideList(true)}
        >
          {t("chooseGuide")}
        </button>
      </div>
    );
  return (
    <SuggestedGuidesStyles>
      <div className="guides-wrapper">
        {/* <button className="add-guide" onClick={() => setShowGuideList(true)}>
          <Image
            src={"/img/icon-plus.svg"}
            alt={"add-guide"}
            height={25}
            width={25}
          />
        </button> */}
        {guides?.map((guide, i) => {
          return (
            <Link
              href={`/${guide?.username}`}
              target="_blank"
              rel="noreferrer"
              key={i}
              prefetch={false}
            >
              <Image
                style={{ zIndex: (6 - i).toString() }}
                alt={guide?.username}
                height={80}
                width={80}
                className="guide"
                src={
                  guide?.avatar !== "/img/avatar.png"
                    ? guide?.avatar
                    : guide?.photos?.length > 0
                    ? guide?.photos[0]
                    : "/img/avatar.png"
                }
              />
            </Link>
          );
        })}
      </div>
      <p
        className="guides-title"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(
            t("fromPerGroup", {
              price: guidesFrom
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            }),
            {
              USE_PROFILES: { html: true },
            }
          ),
        }}
      ></p>
      <button className="normal-button" onClick={() => setShowGuideList(true)}>
        <div className="button-text">
          <Image
            width={20}
            height={20}
            alt="select-guide"
            src={"/img/icon-check.svg"}
          />
          {t("chooseGuide")}
        </div>
      </button>
    </SuggestedGuidesStyles>
  );
};
export default SuggestedGuides;
