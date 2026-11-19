import Document, { Html, Head, NextScript, Main } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { i18n } from "next-i18next";
export default class myDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html
        lang={
          i18n?.language === "default"
            ? "en"
            : i18n?.language === "zh_cn"
            ? "zh-CN"
            : i18n?.language === "zh_tw"
            ? "zh-TW"
            : i18n?.language
        }
      >
        <Head>
          <link
            href="/img/splashscreens/iphone5_splash.png"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/img/splashscreens/iphone6_splash.png"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/img/splashscreens/iphoneplus_splash.png"
            media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/img/splashscreens/iphonex_splash.png"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/img/splashscreens/iphonexr_splash.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/img/splashscreens/iphonexsmax_splash.png"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/img/splashscreens/ipad_splash.png"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/img/splashscreens/ipadpro1_splash.png"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/img/splashscreens/ipadpro3_splash.png"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          <link
            href="/img/splashscreens/ipadpro2_splash.png"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
            rel="apple-touch-startup-image"
          />
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700"
            rel="preload"
            as="style"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700"
            rel="stylesheet"
          /> */}
          <meta httpEquiv="Cache-Control" content="public, max-age=0" />
          <link rel="shortcut icon" href="/img/favicon/icon-48x48.png" />
          <link rel="icon" sizes="48x48" href="/img/favicon/icon-48x48.png" />
          <link
            rel="mask-icon"
            href="/img/favicon/icon-48x48.png"
            color="#1a2b49"
          ></link>
          <meta name="apple-mobile-web-app-status-bar" content="#F3F3F3" />
          <link rel="icon" sizes="32x32" href="/img/favicon/icon-32x32.png" />
          <link
            rel="icon"
            sizes="192x192"
            href="/img/favicon/icon-192x192.png"
          />
          <link
            rel="icon"
            sizes="512x512"
            href="/img/favicon/icon-512x512.png"
          />
          <link rel="icon" sizes="16x16" href="/img/favicon/icon-16x16.png" />
          <meta name="application-name" content="dekitabi" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="dekitabi" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#fc0165" />
          <meta name="msapplication-tap-highlight" content="no" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/img/favicon/icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/img/favicon/icon-180x180.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/img/favicon/icon-167x167.png"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="#F3F3F3"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="author" content="dekitabi" />
          <link
            rel="mask-icon"
            href="/img/favicon/icon-512x512-maskable.png"
            color="#F3F3F3"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://www.dekitabi.com" />
          <meta
            name="twitter:image"
            content="https://www.dekitabi.com/img/favicon/icon-192x192.png"
          />

          <meta name="twitter:creator" content="@dekitabi" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="dekitabi" />
          <meta
            property="og:image"
            content="https://www.dekitabi.com/img/favicon/icon-192x192.png"
          />
          <meta property="al:ios:app_store_id" content="6478531877" />
          <meta property="al:ios:app_name" content="dekitabi" />
          <meta property="al:android:package" content="com.dekitabi" />
          <meta property="al:android:app_name" content="dekitabi" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
