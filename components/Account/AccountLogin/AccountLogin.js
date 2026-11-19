import { AccountLoginStyles } from "./styles/AccountLoginStyles";
import AccountEmail from "./AccountEmail";
import AccountPassword from "./AccountPassword";
import AccountDelete from "./AccountDelete";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Head from "next/head";
import { useSelector, shallowEqual } from "react-redux";
import { getAuth } from "firebase/auth";
const AccountLogin = () => {
  const user = useSelector((state) => state.app.user, shallowEqual);
  const { t } = useTranslation();
  let currentUser;
  let provider;
  try {
    currentUser = getAuth()?.currentUser;
    provider =
      getAuth()?.currentUser?.providerData?.length > 1
        ? getAuth()?.currentUser?.providerData[0].providerId === "password"
          ? getAuth()?.currentUser?.providerData[0].providerId
          : getAuth()?.currentUser?.providerData[1].providerId
        : getAuth()?.currentUser?.providerData[0].providerId;
  } catch (error) {
    currentUser = undefined;
    provider = undefined;
  }
  return (
    <AccountLoginStyles>
      <Head>
        <title>{`${t("account")}/${t("loginAndSecurity")}`}</title>
      </Head>
      <div className="page-header">
        <p className="breadcrumbs">
          <Link prefetch={false} href="/account">
            {" "}
            {t("account")}
          </Link>{" "}
          <span>&gt;</span> <span>{t("loginAndSecurity")}</span>
        </p>
        <h1 className="title">{t("loginAndSecurity")}</h1>
      </div>
      <AccountEmail
        t={t}
        user={user}
        provider={provider}
        currentUser={currentUser}
      />
      <AccountPassword
        t={t}
        user={user}
        provider={provider}
        currentUser={currentUser}
      />
      <AccountDelete
        t={t}
        user={user}
        provider={provider}
        currentUser={currentUser}
      />
    </AccountLoginStyles>
  );
};
export default AccountLogin;
