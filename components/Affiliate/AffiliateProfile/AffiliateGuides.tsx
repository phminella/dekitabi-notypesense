import type { Affiliate } from "../../../types/Affiliate/AffiliateProfile";
interface Guide {
  completedTours: number;
  avatar: string;
  firstname: string;
  lastname: string;
  username: string;
  uid: string;
  createdAt: string;
}
import { AffiliateTravelersStyles } from "./styles/AffiliateTravelersStyles";
import Link from "next/link";
import Avatar from "../../UI/Avatar";
import Spinner from "../../UI/Spinner";
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
} from "firebase/firestore/lite";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";

type SortOrder = {
  key: "completedTours" | "createdAt";
  value: "asc" | "desc";
};

const AffiliateGuides: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
  affiliate: Affiliate;
}> = ({ t, affiliate }) => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<SortOrder>({
    key: "createdAt",
    value: "desc",
  });
  const sortOptions = [
    {
      value: JSON.stringify({ key: "completedTours", value: "asc" }),
      label: t("affiliate:moreTours"),
    },
    {
      value: JSON.stringify({ key: "completedTours", value: "desc" }),
      label: t("affiliate:lessTours"),
    },
    {
      value: JSON.stringify({ key: "createdAt", value: "desc" }),
      label: t("affiliate:newest"),
    },
    {
      value: JSON.stringify({ key: "createdAt", value: "asc" }),
      label: t("affiliate:oldest"),
    },
  ];
  const getMoreGuides = useCallback(async () => {
    setLoadingMore(true);
    const queryCursor = await getDoc(
      doc(getFirestore(), "users", guides[guides?.length - 1]?.uid)
    );
    let q;
    q = query(
      collection(getFirestore(), "users"),
      where("affiliateId", "==", affiliate?.id),
      where("guide", "==", "true"),
      orderBy(order?.key, order?.value),
      startAfter(queryCursor),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    let tempGuides: Guide[] = [];
    querySnapshot.forEach((data) => {
      tempGuides.push({
        completedTours: data?.data()?.completedTours,
        avatar: data.data()?.avatar,
        firstname: data.data()?.firstname,
        lastname: data.data()?.lastname,
        username: data.data()?.username,
        uid: data.data()?.uid,
        createdAt: data.data()?.createdAt,
      });
    });
    if (tempGuides?.length === 6) {
      setHasMore(true);
      tempGuides.pop();
    } else {
      setHasMore(false);
    }
    setLoadingMore(false);
    setGuides((prev) => [...prev, ...tempGuides]);
  }, [affiliate?.id, guides, order?.key, order?.value]);

  const getGuides = useCallback(async () => {
    let q;
    q = query(
      collection(getFirestore(), "users"),
      where("affiliateId", "==", affiliate?.id),
      where("guide", "==", "true"),
      orderBy(order?.key, order?.value),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    let tempGuides: Guide[] = [];
    querySnapshot.forEach((data) => {
      tempGuides.push({
        completedTours: data?.data()?.completedTours,
        avatar: data.data()?.avatar,
        firstname: data.data()?.firstname,
        lastname: data.data()?.lastname,
        username: data.data()?.username,
        uid: data.data()?.uid,
        createdAt: data.data()?.createdAt,
      });
    });
    if (tempGuides?.length === 6) {
      setHasMore(true);
      tempGuides.pop();
    } else {
      setHasMore(false);
    }
    setGuides(tempGuides);
    setLoading(false);
  }, [affiliate?.id, order?.key, order?.value]);

  useEffect(() => {
    setLoading(true);
    setGuides([]);
    setHasMore(false);
    getGuides();
  }, [getGuides]);
  if (loading) return <Spinner />;
  return (
    <AffiliateTravelersStyles>
      <p className="title">{t("affiliate:signedGuides")}</p>
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
          setOrder(JSON.parse(e?.target?.value) as SortOrder);
        }}
      >
        {sortOptions?.map((option, i) => (
          <option value={option.value} key={i}>
            {option.label}
          </option>
        ))}
      </select>
      {guides?.length === 0 && !loading && (
        <div className="not-found">
          <p>
            <b>{t("affiliate:noSignedGuides")}</b>
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
      {guides?.map((guide, i) => (
        <div className="guide-wrapper" key={i}>
          <Avatar width={60} height={60} src={guide?.avatar} />
          <div className="guide-info">
            <Link
              href={`/${guide?.username}`}
              target="_blank"
              rel="noreferrer"
              className="link"
              prefetch={false}
            >
              {guide?.firstname} {guide?.lastname}
            </Link>
            <p>
              {t("affiliate:completedTours")}:{" "}
              <b>{guide?.completedTours ? guide?.completedTours : 0}</b>
            </p>
            <p className="registered">
              {t("affiliate:joined")}:{" "}
              {dayjs(guide?.createdAt).format("MM/DD/YYYY")}
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
            <button className="show-more" onClick={getMoreGuides}>
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
export default AffiliateGuides;
