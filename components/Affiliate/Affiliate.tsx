import dynamic from "next/dynamic";
import Spinner from "../UI/Spinner";
const AffiliateHome = dynamic(() => import("./AffiliateHome"), {
  loading: () => <Spinner />,
});
const AffiliateSignUp = dynamic(() => import("./AffiliateSignUp"), {
  ssr: false,
  loading: () => <Spinner />,
});
const AffiliateSignIn = dynamic(() => import("./AffiliateSignIn"), {
  ssr: false,
  loading: () => <Spinner />,
});
import AffiliateHeader from "./AffiliateHeader";
import { AffiliateStyles } from "./styles/AffiliateStyles";
import { useTranslation } from "next-i18next";
const Affiliate: React.FC<{ page?: string }> = ({ page }) => {
  const { t } = useTranslation();
  return (
    <AffiliateStyles>
      <AffiliateHeader t={t} />
      {page === "sign-up" && <AffiliateSignUp t={t} />}
      {page === "sign-in" && <AffiliateSignIn t={t} />}
      {(!page || (page !== "sign-up" && page !== "sign-in")) && (
        <AffiliateHome t={t} />
      )}
    </AffiliateStyles>
  );
};
export default Affiliate;
