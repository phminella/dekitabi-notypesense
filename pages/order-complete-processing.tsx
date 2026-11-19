import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Spinner from "../components/UI/Spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
const OrderCompleteProcessing = dynamic(
  () => import("../components/OrderComplete/OrderCompleteProcessing"),
  {
    loading: () => <Spinner />,
  }
);
const OrderCompleteProcessingPage: NextPage = () => {
  return <OrderCompleteProcessing />;
};

export default OrderCompleteProcessingPage;
