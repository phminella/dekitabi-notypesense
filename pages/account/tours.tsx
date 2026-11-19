import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Spinner from "../../components/UI/Spinner";
const AccountTours = dynamic(
  () => import("../../components/Account/AccountTours/AccountTours"),
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
const ToursPage: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AccountTours />
    </>
  );
};

export default ToursPage;
