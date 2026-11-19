import { AccountProfileInfoStyles } from "./styles/AccountProfileInfoStyles";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import ProfileInfoName from "./ProfileInfoName";
import ProfileInfoAvatar from "./ProfileInfoAvatar";
import ProfileInfoLanguages from "./ProfileInfoLanguages";
import { doc, updateDoc, getFirestore } from "firebase/firestore/lite";
import Spinner from "../../UI/Spinner";
import Head from "next/head";
import { useSelector, shallowEqual } from "react-redux";
const AccountProfileInfo = () => {
  const user = useSelector((state) => state.app.user, shallowEqual);
  const { t } = useTranslation();
  const updateProfile = async (update) => {
    const userRef = doc(getFirestore(), "users", user?.uid);
    await updateDoc(userRef, update);
    return true;
  };
  if (!user?.languages) return <Spinner />;
  return (
    <AccountProfileInfoStyles>
      <Head>
        <title>{`${t("account")}/${t("profileDetails")}`}</title>
      </Head>
      <div className="page-header">
        <p className="breadcrumbs">
          <Link prefetch={false} href="/account">
            {" "}
            {t("account")}
          </Link>{" "}
          <span>&gt;</span> <span>{t("profileDetails")}</span>
        </p>
        <h1 className="title">{t("profileDetails")}</h1>
        <div className="sub-title">
          <p>{t("profileDetailsDesc")}</p>
        </div>
      </div>
      <div className="profile-info-wrapper">
        <div className="profile-info">
          <ProfileInfoAvatar user={user} t={t} />
          <ProfileInfoName user={user} t={t} updateProfile={updateProfile} />
          <ProfileInfoLanguages
            user={user}
            t={t}
            updateProfile={updateProfile}
          />
        </div>
        <div className="personal-info-msg">
          <div className="personal-info-detail">
            <h2>{t("whyUpdateIt")}</h2>
            <p>{t("whyUpdatedItMsg")}</p>
          </div>
          <div className="personal-info-detail">
            <h2>{t("whichDetailsEdit")}</h2>
            <p>{t("whichDetailsEditTraveler")}</p>
          </div>
        </div>
      </div>
    </AccountProfileInfoStyles>
  );
};
export default AccountProfileInfo;
