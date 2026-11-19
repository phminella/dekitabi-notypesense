import { AccountOrdersStyles } from "./styles/AccountOrdersStyles";
import { AccountOrdersResponsiveStyles } from "./styles/responsive/AccountOrdersResponsiveStyles";
import { useTranslation } from "next-i18next";
import NotFound from "../../UI/NotFound";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import Spinner from "../../UI/Spinner";
import OrdersSort from "./OrdersSort";
import OrderActivity from "./OrderActivity";
import Order from "./Order";
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
  or
} from "firebase/firestore/lite";
import Image from "next/image";
import Head from "next/head";
import { useSelector, shallowEqual } from "react-redux";
const AccountOrders = () => {
  const user = useSelector((state) => state.app.user, shallowEqual);
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState("newest");
  const [order, setOrder] = useState({ value: "createdAt", order: "desc" });
  const [orders, setOrders] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const getMoreOrders = async () => {
    setLoadingMore(true);
    const queryCursor = await getDoc(
      doc(getFirestore(), "orders", orders[orders?.length - 1]?.id)
    );
    let q;
    q = query(
      collection(getFirestore(), "orders"),
      or(where("travelerId", "==", user?.uid),
      where("customerId", "==", user?.uid)),
      orderBy(order?.value, order?.order),
      startAfter(queryCursor),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    let tempOrders = [];
    querySnapshot.forEach((doc) => {
      tempOrders.push(doc.data());
    });
    if (tempOrders?.length === 10) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    setLoadingMore(false);
    setOrders([...orders, ...tempOrders]);
  };
  const getOrders = useCallback(async () => {
    setLoading(true);
    let q;
    q = query(
      collection(getFirestore(), "orders"),
      or(where("travelerId", "==", user?.uid),
      where("customerId", "==", user?.uid)),
      orderBy(order?.value, order?.order),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    let tempOrders = [];
    querySnapshot.forEach((doc) => {
      tempOrders.push(doc.data());
    });

    if (tempOrders?.length === 10) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
    setOrders(tempOrders);
    setLoading(false);
  }, [order?.order, order?.value, user?.uid]);
  useEffect(() => {
    if (user?.uid) {
      getOrders();
    }
  }, [getOrders, user?.uid]);
  if (!orders || loading) return <Spinner />;
  return (
    <AccountOrdersResponsiveStyles>
      <AccountOrdersStyles>
        <Head>
          <title>{`${t("account")}/${t("orders")}`}</title>
        </Head>
        <div className="page-header">
          <p className="breadcrumbs">
            <Link prefetch={false} href="/account">
              {" "}
              {t("account")}
            </Link>{" "}
            <span>&gt;</span> <span> {t("orders")}</span>
          </p>
          <h1 className="title"> {t("orders")}</h1>
          <div className="sub-title">
            <p>{t("ordersDesc")}</p>
          </div>
        </div>
        <OrdersSort
          t={t}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setOrder={setOrder}
          ordersLength={user?.ordersCounter}
        />
        <div className="orders-wrapper">
          {orders.length === 0 && <NotFound message={`${t("noOrders")}.`} />}
          {orders?.map((order, i) => {
            return order?.customerId ? <OrderActivity key={i} t={t} order={order} /> : <Order key={i} t={t} order={order} />
          })}
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
                <button className="show-more" onClick={getMoreOrders}>
                  <Image
                    height={15}
                    width={15}
                    src="/img/icon-arrow-down.svg"
                    alt="show-more"
                  ></Image>{" "}
                  {t("showMore")}
                </button>
              )}
            </div>
          )}
        </div>
      </AccountOrdersStyles>
    </AccountOrdersResponsiveStyles>
  );
};
export default AccountOrders;
