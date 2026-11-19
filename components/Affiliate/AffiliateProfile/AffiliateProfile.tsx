import { useCallback, useEffect, useMemo, useState } from "react";
import { AffiliateProfileStyles } from "./styles/AffiliateProfileStyles";
import Link from "next/link";
import Spinner from "../../UI/Spinner";
import { useRouter } from "next/router";
import Image from "next/image";
import { getFunctions, httpsCallable, HttpsCallable } from "firebase/functions";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import {
  Affiliate,
  StripeBalance,
} from "../../../types/Affiliate/AffiliateProfile";
import {
  clearAffiliateSessionToken,
  withAffiliateSessionHeaders,
} from "../../../lib/affiliateSessionClient";

const AffiliateProfileInfo = dynamic(() => import("./AffiliateProfileInfo"), {
  ssr: false,
  loading: () => <Spinner />,
});
const AffiliateProfileEdit = dynamic(() => import("./AffiliateProfileEdit"), {
  ssr: false,
  loading: () => <Spinner />,
});
const AffiliateGuides = dynamic(() => import("./AffiliateGuides"), {
  ssr: false,
  loading: () => <Spinner />,
});
const AffiliateTravelers = dynamic(() => import("./AffiliateTravelers"), {
  ssr: false,
  loading: () => <Spinner />,
});

const AffiliateProfile: React.FC<{ id: string | string[] }> = ({ id }) => {
  const { t } = useTranslation();
  const routeParts = Array.isArray(id) ? id : [id];
  const affiliateId = String(routeParts[0] ?? "").toLowerCase();
  const section = routeParts[1];
  const background = require("../../../public/img/bg/Japan/5.webp");
  const router = useRouter();

  const callables = useMemo(() => {
    let deleteStripeAccount: HttpsCallable<string, void> | undefined;
    let createStripeExpressLink:
      | HttpsCallable<{ id: string }, { url: string }>
      | undefined;
    let createStripeLink:
      | HttpsCallable<{ id: string }, { url: string }>
      | undefined;
    let retrieveStripeAccountBalance:
      | HttpsCallable<string, StripeBalance>
      | undefined;

    try {
      const functions = getFunctions(undefined, "asia-northeast1");
      deleteStripeAccount = httpsCallable(functions, "deleteStripeAccount");
      createStripeExpressLink = httpsCallable(
        functions,
        "createStripeExpressLink"
      );
      retrieveStripeAccountBalance = httpsCallable(
        functions,
        "retrieveStripeAccountBalance"
      );
      createStripeLink = httpsCallable(functions, "createStripeLink");
    } catch (err) {
      console.log(err);
    }

    return {
      deleteStripeAccount,
      createStripeExpressLink,
      createStripeLink,
      retrieveStripeAccountBalance,
    };
  }, []);

  const [balance, setBalance] = useState(0);
  const [loadingRest, setLoadingRest] = useState(true);
  const [link, setLink] = useState("");
  const [noStripe, setNoStripe] = useState(false);
  const [loading, setLoading] = useState(true);
  const [affiliate, setAffiliate] = useState<Affiliate>();

  const getAffiliate = useCallback(async () => {
    if (!affiliateId) {
      router.push("/affiliate-program");
      return;
    }

    try {
      const response = await fetch(
        `/api/affiliate/me?id=${encodeURIComponent(affiliateId)}`,
        {
          headers: withAffiliateSessionHeaders(),
        }
      );
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data?.affiliate) {
        if (response.status === 401 || response.status === 403) {
          clearAffiliateSessionToken();
        }
        router.push("/affiliate-program");
        return;
      }

      const currentAffiliate = data.affiliate as Affiliate;
      setAffiliate(currentAffiliate);
      setLoading(false);

      let tempBalance = currentAffiliate?.balance ?? 0;
      if (
        currentAffiliate?.stripeAccountId &&
        callables.retrieveStripeAccountBalance &&
        callables.createStripeExpressLink &&
        callables.createStripeLink
      ) {
        try {
          const stripeBalance = await callables.retrieveStripeAccountBalance(
            currentAffiliate?.stripeAccountId
          );
          tempBalance = stripeBalance?.data?.available?.[0]?.amount ?? 0;
        } catch (err) {
          tempBalance = 0;
          console.log(err);
        }

        let stripeLink = await callables.createStripeExpressLink({
          id: currentAffiliate?.stripeAccountId,
        });
        if (stripeLink?.data?.url) {
          setLink(stripeLink?.data?.url);
        } else {
          setNoStripe(true);
          stripeLink = await callables.createStripeLink({
            id: currentAffiliate?.stripeAccountId,
          });
          setLink(stripeLink?.data?.url);
        }
      }

      setBalance(tempBalance);
      setLoadingRest(false);
    } catch (err) {
      console.log(err);
      router.push("/affiliate-program");
    }
  }, [
    affiliateId,
    callables,
    router,
  ]);

  useEffect(() => {
    getAffiliate();
  }, [getAffiliate]);

  if (loading || !affiliate) return <Spinner />;

  return (
    <AffiliateProfileStyles>
      <div className="bg-wrapper">
        <Image
          style={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
          className="wrapper-background"
          alt="background"
          fill
          priority={true}
          src={background}
          quality={70}
          sizes="100vw, (max-width: 280px) 50vw"
          loading="eager"
          placeholder="blur"
        />
        <h1>{t("affiliate:makeTravelBetter")}</h1>
      </div>
      <div className="profile-wrapper">
        {!loadingRest &&
          (noStripe ||
            !affiliate?.coupon ||
            (!affiliate?.payPalId && !affiliate?.stripeAccountId)) && (
            <ul className="profile-errors">
              {noStripe && (
                <li>
                  {t("affiliate:noPayments")}{" "}
                  <a
                    href={link ? link : ""}
                    target={"_self"}
                    rel="noreferrer"
                    className="link"
                  >
                    {t("affiliate:verify")}
                  </a>
                </li>
              )}
              {!affiliate?.coupon && (
                <li>
                  {t("affiliate:addPromo")}{" "}
                  <Link
                    className="link"
                    href={`/affiliate/${affiliate?.id}/edit`}
                    prefetch={false}
                  >
                    {t("affiliate:add")}
                  </Link>
                </li>
              )}
              {!affiliate?.payPalId && !affiliate?.stripeAccountId && (
                <li>
                  {t("affiliate:addPayPal")}{" "}
                  <Link
                    className="link"
                    href={`/affiliate/${affiliate?.id}/edit`}
                    prefetch={false}
                  >
                    {t("affiliate:add")}
                  </Link>
                </li>
              )}
            </ul>
          )}
        <div className="avatar-wrapper">
          <Image
            src="/img/logo.png"
            height={51}
            width={154}
            alt="logo"
            className="logo"
          />
        </div>
        {!section && (
          <>
            <h3>
              {t("affiliate:affiliateId")}: {affiliate?.id}
            </h3>
            <Link
              className="link edit-button title-link"
              href={`/affiliate/${affiliate?.id}/edit`}
              prefetch={false}
            >
              {t("affiliate:editProfile")}
            </Link>
          </>
        )}
        {!section && (
          <AffiliateProfileInfo
            link={link}
            loadingRest={loadingRest}
            affiliate={affiliate}
            router={router}
            balance={balance}
            t={t}
          />
        )}
        {section === "edit" && callables.deleteStripeAccount && (
          <AffiliateProfileEdit
            affiliate={affiliate}
            setAffiliate={setAffiliate}
            deleteStripeAccount={callables.deleteStripeAccount}
            router={router}
            t={t}
          />
        )}
        {section === "signed-guides" && (
          <AffiliateGuides affiliate={affiliate} t={t} />
        )}
        {section === "completed-tours" && (
          <AffiliateTravelers affiliate={affiliate} t={t} />
        )}
      </div>
    </AffiliateProfileStyles>
  );
};

export default AffiliateProfile;
