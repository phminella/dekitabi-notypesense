import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Spinner from "../components/UI/Spinner";
const Account = dynamic(() => import("../components/Account/Account"), {
  loading: () => <Spinner />,
});
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getProps from "../lib/getProps";
import Head from "next/head";
export const getServerSideProps = async function (
  ctx: GetServerSidePropsContext
) {
  return {
    ...getProps(ctx),
    props: {
      ...(await serverSideTranslations(ctx.locale as string, [
        "translation",
      ])),
    },
  };
};
const AccountPage: NextPage = (props: any) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Account />
    </>
  );
};

export default AccountPage;
