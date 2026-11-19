import { AccountToursStyles } from "./styles/AccountToursStyles";
import { AccountToursResponsiveStyles } from "./styles/responsive/AccountToursResponsiveStyles";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import Link from "next/link";
import ToursTab from "./ToursTab";
import ResponsiveToursTab from "./ResponsiveToursTab";
import Tours from "./Tours";
import ToursSort from "./ToursSort";
import { useSelector, shallowEqual } from "react-redux";
import ChangeMessage from "../../UI/ChangeMessage";
import Head from "next/head";
import Spinner from "../../UI/Spinner";
const AccountTours = () => {
  const user = useSelector((state) => state.app.user, shallowEqual);
  const currency = useSelector((state) => state.app.currency, shallowEqual);
  const { t } = useTranslation();
  const [tab, setTab] = useState("pending");
  const [sortBy, setSortBy] = useState("newest");
  const [order, setOrder] = useState({ value: "date", order: "desc" });
  const [statusChanged, setStatusChanged] = useState(false);
  const tourStatusChanged = async () => {
    setStatusChanged(true);
    setTimeout(() => {
      setStatusChanged(false);
    }, 5000);
  };
  if (!user?.guide) return <Spinner />;
  return (
    <AccountToursResponsiveStyles>
      <AccountToursStyles className="account-tours">
        <Head>
          <title>{`${t("account")}/${t("tours")}`}</title>
        </Head>
        <div className="page-header">
          <p className="breadcrumbs">
            <Link prefetch={false} href="/account">
              {" "}
              {t("account")}
            </Link>{" "}
            <span>&gt;</span> <span> {t("tours")}</span>
          </p>
          <h1 className="title"> {t("tours")}</h1>
          <div className="sub-title">
            {user?.guide === "true" ? (
              <p>{t("toursDescGuide")}</p>
            ) : (
              <p>{t("toursDescTraveler")}</p>
            )}
          </div>
        </div>
        <ChangeMessage showMsg={statusChanged} message={"tourStatusUpdated"} />
        <div className="tours-section">
          <ResponsiveToursTab user={user} t={t} setTab={setTab} tab={tab} />
          <ToursTab user={user} t={t} setTab={setTab} tab={tab} />
          <ToursSort
            t={t}
            tab={tab}
            setOrder={setOrder}
            setSortBy={setSortBy}
            sortBy={sortBy}
          />
          <Tours
            user={user}
            t={t}
            currency={currency}
            tourStatusChanged={tourStatusChanged}
            setTab={setTab}
            tab={tab}
            order={order}
          />
        </div>
      </AccountToursStyles>
    </AccountToursResponsiveStyles>
  );
};
export default AccountTours;
