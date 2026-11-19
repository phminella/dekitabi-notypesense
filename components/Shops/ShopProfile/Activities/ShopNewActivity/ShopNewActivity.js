import { useRouter } from "next/router";
import BasicModal from "../../../../UI/BasicModal";
import { ShopEditStyles } from "../../Edit/styles/ShopEditStyles";
import { ShopNewActivityStyles } from "./styles/ShopNewActivityStyles";
import { useState } from "react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import autoId from "../../../../../lib/autoId";
const ShopNewActivity = ({ t, setShowModal, shopProfile }) => {
  const [activityName, setActivityName] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const router = useRouter();
  const createActivity = async (e) => {
    e.preventDefault();
    setLoading(true);
    let activityId = autoId();
    let tempActivityName = activityName
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s\s+/g, " ")
      .toLowerCase()
      .trim();
    const activitiesRef = collection(getFirestore(), "activities");
    const q = query(
      activitiesRef,
      where("url", "==", tempActivityName.split(" ").join("-"))
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      const tempActivity = {
        activityHours: shopProfile?.openingHours,
        createdAt: new Date().getTime(),
        id: activityId,
        name: activityName,
        persons: {from:1, to:1},
        price: {},
        photos: [],
        shopId: shopProfile?.uid,
        contactEmail: shopProfile?.contactEmail,
        activityAddress: shopProfile?.address,
        activityPage: shopProfile?.website,
        description: "",
        included: [],
        notIncluded: [],
        availability: {},
        url: tempActivityName.split(" ").join("-")
      };
      setDoc(doc(getFirestore(), "activities", activityId), tempActivity)
        .then(() => {
          router
            .push(`/book/${tempActivity?.url}`)
            .then(() => {
              router.reload();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      setError(true);
      setLoading(false);
    }
  };
  return (
    <ShopEditStyles>
      <ShopNewActivityStyles>
        <BasicModal setShowModal={setShowModal} showModal={true}>
          <p className="new-activity-title">{t("shops:newActivity")}</p>
          <div className="new-activity-info-wrapper">
            <Image
              height={20}
              width={20}
              src="/img/icon-info2.svg"
              alt="payout-info"
            ></Image>
            <p
              className="new-activity-info"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(t("shops:newActivityInfo"), {
                  USE_PROFILES: { html: true },
                }),
              }}
            ></p>
          </div>
          <form onSubmit={createActivity}>
            <div className="input-wrapper">
              <label htmlFor="activity-name">
                {t("shops:activityName")}
                <input
                  name="activity-name"
                  className="activity-name-input"
                  type="text"
                  value={activityName}
                  onChange={(e) => {
                    let containsJapanese = e.target.value.match(
                      /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
                    );
                    if (error) {
                      setError(false);
                    }
                    if (!containsJapanese) setActivityName(e.target.value);
                  }}
                  placeholder={t("shops:activityNamePlaceholder")}
                  autoComplete="one-time-code"
                />
              </label>
              {error && (
                <p className="error-message">&#9940;{t("shops:nameError")}</p>
              )}
            </div>
            <button className="normal-button" disabled={loading} type="submit">
              {loading ? (
                <Image
                  src="/img/icon-spinner.svg"
                  alt="spinner"
                  height={40}
                  width={40}
                />
              ) : (
                t("shops:createActivity")
              )}
            </button>
          </form>
        </BasicModal>
      </ShopNewActivityStyles>
    </ShopEditStyles>
  );
};
export default ShopNewActivity;
