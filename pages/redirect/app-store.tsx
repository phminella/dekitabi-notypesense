import Spinner from "../../components/UI/Spinner";
const RedirectApp = dynamic(() => import("../../components/Misc/RedirectApp"), {
  loading: () => <Spinner />,
});
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["translation"])),
    },
  };
}
const RedirectPage = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <RedirectApp />
    </>
  );
};
export default RedirectPage;
