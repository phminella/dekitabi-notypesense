import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Spinner from "../../components/UI/Spinner";
// import getWaitingReviewItinerariesFromFirebase from "../../lib/ssr/getWaitingReviewItinerariesFromFirebase.js";
const ReviewForm = dynamic(
  () => import("../../components/Shops/Activities/ActivityReview/Review"),
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
        "translation",
        "shops",
      ])),
    },
  };
};
// export async function getStaticProps({ locale }: { locale: any }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["translation"])),
//       // Will be passed to the page component as props
//     },
//   };
// }
// export async function getStaticPaths() {
//   const itineraries = await getWaitingReviewItinerariesFromFirebase();
//   const paths = itineraries.map((itinerary) => ({
//     params: { id: itinerary },
//   }));
//   return {
//     paths, //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// }
const ReviewPage: NextPage = () => {
  const router = useRouter();
  const query = router.query;
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ReviewForm id={query?.id} />
    </>
  );
};

export default ReviewPage;
