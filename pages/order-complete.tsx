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
const OrderComplete = dynamic(
  () => import("../components/OrderComplete/OrderComplete"),
  {
    loading: () => <Spinner />,
  }
);
const OrderCompletePage: NextPage = () => {
  return <OrderComplete />;
};

export default OrderCompletePage;
