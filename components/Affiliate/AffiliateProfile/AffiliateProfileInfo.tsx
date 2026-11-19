import { AffiliateProfileInfoStyles } from "./styles/AffiliateProfileInfoStyles";
import Image from "next/image";
import Link from "next/link";
import type { Affiliate } from "../../../types/Affiliate/AffiliateProfile";
import type { NextRouter } from "next/router";
import {
  clearAffiliateSessionToken,
  withAffiliateSessionHeaders,
} from "../../../lib/affiliateSessionClient";
const AffiliateProfileInfo: React.FC<{
  affiliate: Affiliate | undefined;
  link: string | null;
  router: NextRouter;
  balance: number | null;
  loadingRest: boolean;
  t: (ns: string, options?: Record<string, any>) => string;
}> = ({ affiliate, link, router, balance, loadingRest, t }) => {
  const logout = async () => {
    await fetch("/api/affiliate/logout", {
      method: "POST",
      headers: withAffiliateSessionHeaders(),
    }).catch(() => null);
    clearAffiliateSessionToken();
    router.push("/affiliate-program");
  };
  return (
    <AffiliateProfileInfoStyles>
      <div className="balance">
        <div className="balance-label">
          <Image
            height={24}
            width={24}
            src="/img/icon-balance.svg"
            alt="balance"
            className="white-filter"
          />
          {t("affiliate:balance")}:
        </div>
        <div className="balance-value">
          {loadingRest ? (
            <Image
              src="/img/icon-spinner.svg"
              alt="spinner"
              height={30}
              width={30}
            />
          ) : (
            <>¥{balance?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</>
          )}
        </div>
      </div>
      <div className="list-buttons">
        <Link
          className="link title-link"
          href={`/affiliate/${affiliate?.id}/completed-tours`}
          prefetch={false}
        >
          {t("affiliate:viewTours")}
        </Link>
        <Link
          className="link title-link"
          href={`/affiliate/${affiliate?.id}/signed-guides`}
          prefetch={false}
        >
          {t("affiliate:viewGuides")}
        </Link>
      </div>
      <p className="centered">
        {t("affiliate:viewCounter", { counter: affiliate?.viewCounter })}
      </p>
      <div className="buttons">
        {affiliate?.stripeAccountId && link && !loadingRest && (
          <a
            href={link ? link : ""}
            target={"_self"}
            rel="noreferrer"
            className="normal-button"
          >
            {link ? (
              <> {t("affiliate:viewPayment")}</>
            ) : (
              <Image
                src="/img/icon-spinner-white.svg"
                alt="spinner"
                height={30}
                width={30}
              />
            )}
          </a>
        )}
        <button onClick={() => logout()} className="normal-button">
          {t("affiliate:logout")}
        </button>
      </div>
    </AffiliateProfileInfoStyles>
  );
};
export default AffiliateProfileInfo;
