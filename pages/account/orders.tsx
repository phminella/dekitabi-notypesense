import type { NextPage } from "next";
import Head from "next/head";
import Spinner from "../../components/UI/Spinner";
import dynamic from "next/dynamic";
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
        "translation",
        "shops",
      ])),
    },
  };
};
const AccountOrders = dynamic(
  () => import("../../components/Account/AccountOrders/AccountOrders"),
  { loading: () => <Spinner /> }
);
const Orders: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AccountOrders />
    </>
  );
};

export default Orders;
