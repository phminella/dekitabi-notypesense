import { useRouter } from "next/router";
import Spinner from "../../components/UI/Spinner";
import type { NextPage } from "next";
import Head from "next/head";
import getShopFromFirestore from "../../lib/ssr/getShopFromFirestore";
import dynamic from "next/dynamic";
const ShopProfileWrapper = dynamic(
  () => import("../../components/Shops/ShopProfileWrapper"),
  {
    ssr: true,
    loading: () => <Spinner />,
  }
);
const NotFound = dynamic(() => import("../../components/UI/NotFound"), {
  loading: () => <Spinner />,
});
import { GetStaticPropsContext, GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
// export const getServerSideProps = async function (
//   ctx: GetServerSidePropsContext
// ) {
//   if (!ctx?.query?.id || (ctx?.query?.id && ctx?.query?.id?.length === 0)) {
//     return { notFound: true };
//   }
//   let shop = "not-found";
//   if (
//     ctx?.query?.id &&
//     ctx?.query?.id?.length > 0 &&
//     ctx?.query?.id[0] !== "sign-up" &&
//     ctx?.query?.id[0] !== "sign-in"
//   ) {
//     shop = await getShopFromFirestore(ctx.query.id, ctx.locale);
//     if (shop === "not-found") {
//       return { notFound: true };
//     }
//   }
//   return {
//     props: {
//       shop,
//       ...(await serverSideTranslations(ctx.locale as string, [
//         "translation",
//         "shops",
//       ])),
//     },
//   };
// };
export const getStaticProps = async function (ctx: GetStaticPropsContext) {
  const id = ctx?.params?.id;

  if (!id || !Array.isArray(id) || id.length === 0) {
    return { notFound: true };
  }

  const shopId = id[0];
  if (shopId === "sign-up" || shopId === "sign-in") {
    return { notFound: true };
  }

  const shop = await getShopFromFirestore(id, ctx.locale ?? "en");

  if (shop === "not-found") {
    return { notFound: true };
  }

  return {
    props: {
      shop,
      ...(await serverSideTranslations(ctx.locale ?? "en", [
        "translation",
        "shops",
      ])),
    },
    revalidate: 60, // ISR: update this page every 60 seconds
  };
};

// Optional: if you don't want to pre-render any paths at build time
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking", // generate pages on first request
  };
};
const ShopPage: NextPage = (pageProps: any) => {
  const router = useRouter();
  const query = router.query;
  const { t } = useTranslation();
  const languages = [
    "en",
    "ja",
    "zh_cn",
    "zh_tw",
    "ko",
    "tl",
    "id",
    "th",
    "vi",
    "ms",
    "fr",
    "es",
    "it",
    "pt",
  ];
  if (query?.id && query?.id?.length > 0) {
    if (query?.id[0] === "sign-up" || query?.id[0] === "sign-in") {
      return <ShopProfileWrapper id={query?.id} {...pageProps} />;
    }
  }
  if (!pageProps?._nextI18Next || !pageProps?.shop) return <></>;
  if (pageProps?.shop === "not-found") {
    return <NotFound message={t("noShop")} />;
  }
  const dbLocale =
    pageProps?._nextI18Next?.initialLocale === "default" ||
    !pageProps?._nextI18Next?.initialLocale
      ? "en"
      : pageProps?._nextI18Next?.initialLocale === "zh_cn"
      ? "zh-CN"
      : pageProps?._nextI18Next?.initialLocale === "zh_tw"
      ? "zh-TW"
      : pageProps?._nextI18Next?.initialLocale === "tl"
      ? "fil"
      : pageProps?._nextI18Next?.initialLocale;
  const dotStyle =
    dbLocale === "ja" || dbLocale === "zh-CN" || dbLocale === "zh-TW"
      ? "。"
      : ".";
  const title = pageProps?.shop?.translatedName
    ? pageProps?.shop?.translatedName
    : pageProps?.shop?.name;
  const description = pageProps?.shop?.translatedHeadline
    ? pageProps?.shop?.translatedHeadline[dbLocale]?.length > 170
      ? `${pageProps?.shop?.translatedHeadline[dbLocale]
          ?.substring(0, 170)
          .split(dotStyle)
          .map((string: any, i: any) => {
            if (
              i <
              pageProps?.shop?.translatedHeadline[dbLocale]
                ?.substring(0, 170)
                .split(dotStyle).length -
                1
            ) {
              return `${string.replace("\n", " ").replace("\r", "")}.`;
            }
          })
          .join("")}`
      : pageProps?.shop?.translatedHeadline[dbLocale]
    : pageProps?.shop?.headline?.length > 170
    ? `${pageProps?.shop?.headline
        ?.substring(0, 170)
        .split(dotStyle)
        .map((string: any, i: any) => {
          if (
            i <
            pageProps?.shop?.headline?.substring(0, 170).split(dotStyle)
              .length -
              1
          ) {
            return `${string.replace("\n", " ").replace("\r", "")}.`;
          }
        })
        .join("")}`
    : pageProps?.shop?.headline?.length < 1
    ? pageProps?.shop?.name
    : pageProps?.shop?.headline;
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link
          rel="canonical"
          href={`https://www.dekitabi.com${
            pageProps?._nextI18Next?.initialLocale !== "default"
              ? `/${pageProps?._nextI18Next?.initialLocale}`
              : ""
          }/shop/${pageProps?.shop?.id}`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://www.dekitabi.com/shop/${pageProps?.shop?.id}`}
        />
        {languages?.map((lang, i) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={
                lang === "zh_cn" ? "zh" : lang === "zh_tw" ? "zh-TW" : lang
              }
              href={`https://www.dekitabi.com/${lang}/shop/${pageProps?.shop?.id}`}
            />
          );
        })}

        {/* ✅ Preload LCP image if available */}
        {pageProps?.shop?.photos?.[0] && (
          <link
            rel="preload"
            as="image"
            href={`/_next/image?url=${encodeURIComponent(
              ((u) => {
                u.searchParams.delete("token");
                return u.toString();
              })(new URL(pageProps.shop.photos[0]))
            )}&w=1080&q=65`}
            {...({ fetchpriority: "high" } as any)}
          />
        )}

        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:url"
          content={`https://www.dekitabi.com/shop/${pageProps?.shop?.id}`}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <ShopProfileWrapper id={query?.id} {...pageProps} />
    </>
  );
};
export default ShopPage;
