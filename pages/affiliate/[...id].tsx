import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const AffiliateProfile = dynamic(
  () => import("../../components/Affiliate/AffiliateProfile/AffiliateProfile"),
  {
    loading: () => <Spinner />,
  },
);
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { SSRConfig } from "next-i18next";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from "next";
type Props = SSRConfig;
import Spinner from "../../components/UI/Spinner";
import Head from "next/head";
export const getServerSideProps: GetServerSideProps<Props> = async function (
  ctx: GetServerSidePropsContext,
) {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? "en", [
        "translation",
        "affiliate",
      ])),
    },
  };
};
import { useTranslation } from "next-i18next";
const AffiliatePage: NextPage<Props> = (pageProps) => {
  const router = useRouter();
  const query = router.query;
  const routeId = query?.id as string | string[] | undefined;
  const firstSegment = Array.isArray(routeId) ? routeId[0] : routeId;
  const { t } = useTranslation();
  if (!routeId) return <></>;
  if (firstSegment === "sign-up" || firstSegment === "sign-in") return <></>;
  if (!pageProps?._nextI18Next?.initialLocale) return <></>;
  return (
    <>
      <Head>
        <title>{t("affiliate:dekitabiAffiliate")}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AffiliateProfile id={routeId} {...pageProps} />
    </>
  );
};
export default AffiliatePage;
