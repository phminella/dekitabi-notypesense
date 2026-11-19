import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Spinner from "../components/UI/Spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
const Checkout = dynamic(() => import("../components/Checkout/Checkout"), {
  loading: () => <Spinner />,
  ssr: false,
});
const CheckoutPage: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Checkout />
    </>
  );
};

export default CheckoutPage;
