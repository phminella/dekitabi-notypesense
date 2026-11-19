import dynamic from "next/dynamic";
const PageNotFound = dynamic(() => import("../components/UI/PageNotFound"));
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
export default function Custom404() {
  return <PageNotFound />;
}
