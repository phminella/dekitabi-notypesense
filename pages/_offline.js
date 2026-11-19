import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const Offline = dynamic(() => import("../components/UI/Offline"), {
  loading: () => <Offline />,
});
export const getServerSideProps = async function (ctx) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale, ["translation"])),
    },
  };
};
export default function OfflinePage() {
  return <Offline />;
}
