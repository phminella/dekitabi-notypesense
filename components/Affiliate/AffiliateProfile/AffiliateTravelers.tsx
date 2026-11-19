import { AffiliateTravelersStyles } from "./styles/AffiliateTravelersStyles.js";
import Link from "next/link";
import AttractionImage from "../../S/Attractions/AttractionImage.js";
import Spinner from "../../UI/Spinner.js";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  orderBy,
  limit,
  getFirestore,
  startAfter,
  doc,
  or,
  and,
} from "firebase/firestore/lite";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Affiliate } from "../../../types/Affiliate/AffiliateProfile.js";
import type {
  AffiliateTour,
  Guide,
} from "../../../types/Affiliate/AffiliateTravelers.js";

type TravelerSortOrder = {
  key: "date";
  value: "asc" | "desc";
};

const AffiliateTravelers: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
  affiliate: Affiliate;
}> = ({ t, affiliate }) => {
  const [tours, setTours] = useState<AffiliateTour[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<TravelerSortOrder>({
    key: "date",
    value: "desc",
  });
  const sortOptions = [
    {
      value: JSON.stringify({ key: "date", value: "desc" }),
      label: t("affiliate:newest"),
    },
    {
      value: JSON.stringify({ key: "date", value: "asc" }),
      label: t("affiliate:oldest"),
    },
  ];
  const getMoreTours = useCallback(async () => {
    setLoadingMore(true);
    const queryCursor = await getDoc(
      doc(getFirestore(), "itineraries", tours[tours?.length - 1]?.id)
    );
    let q;
    q = query(
      collection(getFirestore(), "itineraries"),
      and(
        where("status", "==", "completed"),
        or(
          where("guideAffiliateId", "==", affiliate?.id),
          where("affiliateId", "==", affiliate?.id)
        )
      ),
      orderBy(order?.key, order?.value),
      limit(6),
      startAfter(queryCursor)
    );
    const querySnapshot = await getDocs(q);
    let tempTours: AffiliateTour[] = [];
    querySnapshot.forEach((data) => {
      tempTours.push({
        share:
          data.data()?.affiliateId === affiliate?.id
            ? data.data()?.price * 0.07
            : data.data()?.price * 0.05,
        name: data.data()?.name,
        date: data.data()?.date,
        photo: data.data()?.attractions[0],
        id: data.data()?.id,
        guide: data.data()?.guide,
      });
    });
    if (tempTours?.length === 6) {
      setHasMore(true);
      tempTours.pop();
    } else {
      setHasMore(false);
    }
    let tempTours2 = await Promise.all(
      tempTours.map(async (tour) => {
        if (typeof tour.guide !== "string") return tour;
        const userRef = doc(getFirestore(), "users", tour.guide);
        const userSnap = await getDoc(userRef);
        const guide: Guide = {
          firstname: userSnap?.data()?.firstname ?? "Guide",
          lastname: userSnap?.data()?.lastname ?? "",
          username: userSnap?.data()?.username ?? "guide",
        };
        return { ...tour, guide };
      })
    );
    setLoadingMore(false);
    setTours((prev) => [...prev, ...tempTours2]);
  }, [affiliate?.id, order?.key, order?.value, tours]);

  const getTours = useCallback(async () => {
    let q;
    q = query(
      collection(getFirestore(), "itineraries"),
      and(
        where("status", "==", "completed"),
        or(
          where("guideAffiliateId", "==", affiliate?.id),
          where("affiliateId", "==", affiliate?.id)
        )
      ),
      orderBy(order?.key, order?.value),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    let tempTours: AffiliateTour[] = [];
    querySnapshot.forEach(async (data) => {
      tempTours.push({
        share:
          data.data()?.affiliateId === affiliate?.id
            ? data.data()?.price * 0.07
            : data.data()?.price * 0.05,
        name: data.data()?.name,
        date: data.data()?.date,
        photo: data.data()?.attractions[0],
        id: data.data()?.id,
        guide: data.data()?.guide,
      });
    });
    if (tempTours?.length === 6) {
      setHasMore(true);
      tempTours.pop();
    } else {
      setHasMore(false);
    }
    let tempTours2 = await Promise.all(
      tempTours.map(async (tour) => {
        if (typeof tour.guide !== "string") return tour;
        const userRef = doc(getFirestore(), "users", tour.guide);
        const userSnap = await getDoc(userRef);
        const guide = {
          firstname: userSnap?.data()?.firstname ?? "Guide",
          lastname: userSnap?.data()?.lastname ?? "",
          username: userSnap?.data()?.username ?? "guide",
        };
        return { ...tour, guide };
      })
    );
    setTours(tempTours2);
    setLoading(false);
  }, [affiliate?.id, order?.key, order?.value]);

  useEffect(() => {
    setLoading(true);
    setTours([]);
    setHasMore(false);
    getTours();
  }, [getTours]);
  if (loading) return <Spinner />;
  return (
    <AffiliateTravelersStyles>
      <p className="title">{t("affiliate:referencedTours")}</p>
      <Link
        className="link title-link"
        href={`/affiliate/${affiliate?.id}`}
        prefetch={false}
      >
        {t("affiliate:goBack")}
      </Link>
      <select
        value={JSON.stringify(order)}
        onChange={(e) => {
          setOrder(JSON.parse(e?.target?.value) as TravelerSortOrder);
        }}
      >
        {sortOptions?.map((option, i) => (
          <option value={option.value} key={i}>
            {option.label}
          </option>
        ))}
      </select>
      {tours?.length === 0 && !loading && (
        <div className="not-found">
          <p>
            <b>{t("affiliate:noTours")}</b>
          </p>
          <div>
            <Image
              width={250}
              height={160}
              src="/img/pageNotFound.webp"
              alt="not-found"
            />
          </div>
        </div>
      )}
      {tours?.map((tour, i) => (
        <div className="tour-wrapper" key={i}>
          <div className="image-wrapper">
            <AttractionImage
              attraction={tour?.photo?.split(" ").join("-")}
              size={300}
              sizes={"(max-width:460px) 100vw, 100px"}
              priority={null}
            />
          </div>
          <div className="guide-info">
            <Link
              href={`/${tour?.id}`}
              target="_blank"
              rel="noreferrer"
              className="link"
              prefetch={false}
            >
              {tour?.name}
            </Link>
            <p className="date">{tour?.date}</p>
            <p>
              {t("affiliate:guide")}:{" "}
              <Link
                href={`/${
                  typeof tour?.guide === "string"
                    ? tour?.guide
                    : tour?.guide?.username
                }`}
                target="_blank"
                rel="noreferrer"
                className="link"
                prefetch={false}
              >
                {typeof tour?.guide === "object" ? (
                  <>
                    {tour?.guide?.firstname} {tour?.guide?.lastname}{" "}
                  </>
                ) : (
                  t("guide")
                )}
              </Link>
            </p>
            <p>
              <b>¥{tour?.share}</b>
            </p>
          </div>
        </div>
      ))}
      {hasMore && (
        <div className="show-more-wrapper">
          {loadingMore ? (
            <div className="loading-more show-more">
              <Image
                height={30}
                width={30}
                src="/img/icon-spinner.svg"
                alt="spinner"
              ></Image>
            </div>
          ) : (
            <button className="show-more" onClick={getMoreTours}>
              <Image
                height={15}
                width={15}
                src="/img/icon-arrow-down.svg"
                alt="clock"
              ></Image>{" "}
              {t("affiliate:showMore")}
            </button>
          )}
        </div>
      )}
    </AffiliateTravelersStyles>
  );
};
export default AffiliateTravelers;
