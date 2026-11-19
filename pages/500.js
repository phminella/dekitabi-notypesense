import dynamic from "next/dynamic";
const ServerError = dynamic(() => import("../components/UI/ServerError"), {
  loading: () => <ServerError />,
});
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
export default function Custom500() {
  return <ServerError />;
}
