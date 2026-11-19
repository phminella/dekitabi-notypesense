import { useRouter } from "next/router";
import { AffiliateTabsStyles } from "./styles/AffiliateTabsStyles";
import Link from "next/link";
const AffiliateTabs = () => {
  const router = useRouter();
  console.log(router?.query);
  return (
    <AffiliateTabsStyles>
      <li>
        <Link href={`/affiliate-program`} prefetch={false}>
          Home
        </Link>
      </li>
      <li
        className={
          router?.query?.page === "introduce-to-travelers" ||
          !router?.query?.page ||
          (router?.query?.page !== "introduce-to-guides" &&
            router?.query?.page !== "sign-up" &&
            router?.query?.page !== "sign-in")
            ? "active"
            : ""
        }
      >
        <Link
          href={`/affiliate-program/introduce-to-travelers`}
          prefetch={false}
        >
          Introduce to travelers
        </Link>
      </li>
      <li
        className={
          router?.query?.page === "introduce-to-guides" ? "active" : ""
        }
      >
        <Link href={`/affiliate-program/introduce-to-guides`} prefetch={false}>
          Introduce to guides
        </Link>
      </li>
    </AffiliateTabsStyles>
  );
};
export default AffiliateTabs;
