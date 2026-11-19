import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Spinner from "../../components/UI/Spinner";
const AccountProfileInfo = dynamic(
  () =>
    import("../../components/Account/AccountProfileInfo/AccountProfileInfo"),
  {
    loading: () => <Spinner />,
  }
);
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getProps from "../../lib/getProps";
export const getServerSideProps = async function (
  ctx: GetServerSidePropsContext
) {
  return {
    ...getProps(ctx),
    props: {
      ...(await serverSideTranslations(ctx.locale as string, [
        "translation"])),
    },
  };
};
const ProfileInfoPage: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AccountProfileInfo />
    </>
  );
};

export default ProfileInfoPage;
