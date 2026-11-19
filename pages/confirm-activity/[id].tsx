import type { NextPage } from "next";
import Spinner from "../../components/UI/Spinner";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// import getPendingItinerariesFromFirebase from "../../lib/ssr/getPendingItinerariesFromFirebase";
const ActivityConfirm = dynamic(
  () =>
    import("../../components/Shops/Activities/ActivityConfirm/ActivityConfirm"),
  {
    loading: () => <Spinner />,
  }
);
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
export const getServerSideProps = async function (
  ctx: GetServerSidePropsContext
) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string, [
        "shops",
        "translation",
      ])),
    },
  };
};
const ActivityConfirmPage: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ActivityConfirm id={query?.id} />
    </>
  );
};

export default ActivityConfirmPage;
