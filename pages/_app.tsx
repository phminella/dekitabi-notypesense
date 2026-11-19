// @ts-nocheck
if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (search, replacement) {
    return this.split(search).join(replacement);
  };
}
import dynamic from "next/dynamic";
import { Suspense } from "react";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import "react-dates/lib/css/_datepicker.css";
import "../lib/css/react_dates_overrides.css";
// import "../components/styles/nprogress.css";
import { GlobalStyles } from "../components/styles/GlobalStyles";
import Router from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import store from "../store/store";
import { appWithTranslation, useTranslation } from "next-i18next";
import nextI18nextConfig from "../public/next-i18next.config";
import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import useNetwork from "../lib/useNetwork";
import isPwa from "../lib/isPwa";
import useLocalStorage from "../lib/useLocalStorage";
import { Poppins } from "next/font/google";

const Offline = dynamic(() => import("../components/UI/Offline"), {
  ssr: false,
  loading: () => null,
});
const FullscreenUI = dynamic(
  () => import("../components/Misc/FullscreenUI/FullscreenUI"),
  { ssr: false, loading: () => null }
);
const EnableCookies = dynamic(() => import("../components/UI/EnableCookies"), {
  ssr: false,
  loading: () => null,
});
const NetworkOffline = dynamic(
  () => import("../components/UI/NetworkOffline"),
  { ssr: false, loading: () => null }
);
const SideCart = dynamic(() => import("../components/Cart/SideCart"), {
  ssr: false,
  loading: () => null,
});

const Footer = dynamic(() => import("../components/Footer/Footer"), {
  ssr: false,
  loading: () => null,
});
const Chat = dynamic(() => import("../components/Chat/Chat"), {
  ssr: false,
  loading: () => null,
});
const UserProvider = dynamic(
  () => import("../lib/firebase/FirebaseUserContext"),
  { ssr: false, loading: () => null }
);

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { isOnline } = useNetwork();
  const { setItem } = useLocalStorage();
  const [pwa, setPwa] = useState(false);

  const handleAffiliate = async () => {
    if (!router.isReady) return;
    const affiliate = router.query?.affiliate;
    if (!affiliate) return;
    try {
      setItem("affiliateId", affiliate);
      const { getFirestore, doc, updateDoc, increment } = await import(
        "firebase/firestore/lite"
      );
      const db = getFirestore();
      const ref = doc(db, "affiliates", affiliate);
      await updateDoc(ref, { viewCounter: increment(1) });

      const { pathname, query } = router;
      const { affiliate: _, ...rest } = query;
      router.replace({ pathname, query: rest }, undefined, { shallow: true });
    } catch (err) {
      console.error("Affiliate tracking failed:", err);
    }
  };

  useEffect(() => {
    if (router.isReady && router?.query?.affiliate) handleAffiliate();
  }, [router.isReady]);

  let nprogressStylesAdded = false;
  useEffect(() => {
    setPwa(isPwa());
    const handleRouteChangeStart = async () => {
      if (!nprogressStylesAdded) {
        await import("nprogress/nprogress.css");
        await import("../components/styles/nprogress.css");
        nprogressStylesAdded = true;
      }
      const NProgress = (await import("nprogress")).default;
      NProgress.start();
    };

    const handleRouteDone = async () => {
      const NProgress = (await import("nprogress")).default;
      NProgress.done();
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "development" ||
      typeof window === "undefined" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      })
      .catch(() => undefined);
  }, []);
  const isRouteMatch = (pattern) => pattern.test(router.asPath);
  const isRouteInList = (patterns) =>
    patterns.some((pattern) => isRouteMatch(pattern));

  const hideHeaderRoutes = [
    /^\/affiliate\/.*$/,
    /^\/affiliate-program(\/.*)?$/,
    /^\/payment\/.*$/,
    /^\/shop\/sign-(up|in)$/,
    /^\/shop\/reset-password$/,
    /^\/order-complete-processing$/,
  ];

  const hideFooterRoutes = [
    /^\/affiliate\/.*$/,
    /^\/affiliate-program(\/.*)?$/,
    /^\/checkout$/,
    /^\/payment\/.*$/,
    /^\/order-complete-processing$/,
  ];

  const noChatRoutes = [
    /^\/checkout$/,
    /^\/affiliate-program(\/.*)?$/,
    /^\/affiliate\/.*$/,
    /^\/book\/(confirmation|completed)$/,
    /^\/payment\/.*$/,
    /^\/order-complete-processing$/,
  ];

  const showGuideOnlyLayout = [
    /^\/guide-at-dekitabi$/,
    /^\/affiliate\/.*$/,
    /^\/affiliate-program(\/.*)?$/,
  ];

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="height=device-height, width=device-width, minimum-scale=1, maximum-scale=5, initial-scale=1"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <style jsx global>{`
        html,
        input,
        select,
        textarea,
        p,
        div,
        body,
        ul,
        li,
        input,
        img,
        fieldset,
        h1,
        h2,
        h3,
        h4,
        h5,
        button {
          font-family: ${poppins.style.fontFamily}, "Verdana", Arial, sans-serif;
        }
      `}</style>
      <GlobalStyles />
      <Provider store={store}>
        {isRouteInList(showGuideOnlyLayout) ? (
          <>
            <main>
              <Component {...pageProps} />
            </main>
            <Footer />
          </>
        ) : (
          <UserProvider>
            {isOnline && !isRouteInList(hideHeaderRoutes) && (
              <Header {...pageProps} checkout={router.asPath === "/checkout"} />
            )}
            {isOnline ? (
              <main>
                <Component {...pageProps} />
              </main>
            ) : (
              <Offline />
            )}
            {typeof navigator !== "undefined" && !navigator.cookieEnabled && (
              <Suspense fallback={null}>
                <EnableCookies />
              </Suspense>
            )}
            <Suspense fallback={null}>
              <NetworkOffline isHome={router.asPath === "/"} />
            </Suspense>
            {isOnline &&
              !isRouteMatch(
                /^\/(affiliate\/.*|affiliate-program(\/.*)?|checkout|payment\/.*|shop\/.*|book\/.*|order-complete-processing)$/
              ) && (
                <Suspense fallback={null}>
                  <SideCart />
                </Suspense>
              )}
            {isOnline && !isRouteInList(hideFooterRoutes) && <Footer />}
            {!isRouteInList(noChatRoutes) && (
              <Suspense fallback={null}>
                <Chat />
              </Suspense>
            )}
            {pwa &&
              isOnline &&
              !isRouteMatch(
                /^\/(checkout|payment\/.*|order-complete-processing)$/
              ) && (
                <Suspense fallback={null}>
                  {" "}
                  <FullscreenUI />
                </Suspense>
              )}
          </UserProvider>
        )}
      </Provider>
    </>
  );
};

export default appWithTranslation(MyApp, nextI18nextConfig);
