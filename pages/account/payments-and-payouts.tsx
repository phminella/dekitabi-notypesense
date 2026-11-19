import type { NextPage } from "next";
import Head from "next/head";
import Spinner from "../../components/UI/Spinner";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getProps from "../../lib/getProps";
export const getServerSideProps = async function (
  ctx: GetServerSidePropsContext
) {
  return {
    ...getProps(ctx),
    props: {
      ...(await serverSideTranslations(ctx.locale as string, ["translation"])),
    },
  };
};
import dynamic from "next/dynamic";
const AccountPaymentsAndPayouts = dynamic(
  () =>
    import(
      "../../components/Account/AccountPayments/AccountPaymentsAndPayouts"
    ),
  {
    loading: () => <Spinner />,
  }
);
const PaymentsAndPayouts: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AccountPaymentsAndPayouts />
    </>
  );
};

export default PaymentsAndPayouts;
