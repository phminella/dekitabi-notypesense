import { PageNotFoundStyles } from "./styles/PageNotFoundStyles";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslation } from "next-i18next";
const PageNotFound = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <PageNotFoundStyles>
      <Head>
        <title>{t("pageDoesntExist")}</title>
      </Head>
      <div>
        <img
          width="100%"
          height="auto"
          src="/img/pageNotFound.webp"
          alt="not-found"
        />
        <h1>{t("pageDoesntExist")}</h1>
        <a onClick={() => router.back()}>{t("goBack")}</a>
      </div>
    </PageNotFoundStyles>
  );
};
export default PageNotFound;
