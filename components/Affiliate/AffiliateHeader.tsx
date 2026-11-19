import { AffiliateHeaderStyles } from "./styles/AffiliateHeaderStyles";
import Image from "next/image";
import Link from "next/link";
const AffiliateHeader: React.FC<{
  t: (ns: string, options?: Record<string, any>) => string;
}> = ({ t }) => {
  return (
    <AffiliateHeaderStyles>
      <div className="header-wrapper">
        <Link href={`/`} prefetch={false}>
          <picture>
            <source srcSet="/img/logo.png" media="(min-width: 601px)" />
            <Image
              src="/img/logo-short.png"
              height={45}
              width={141}
              alt="dekitabi-logo"
              priority={true}
              className="logo"
            />
          </picture>
        </Link>
        <div className="buttons">
          <Link
            className="sign-in"
            href={`/affiliate-program/sign-in`}
            prefetch={false}
          >
            {t("affiliate:signIn")}
          </Link>
          <Link
            className="sign-in sign-up"
            href={`/affiliate-program/sign-up`}
            prefetch={false}
          >
            {t("affiliate:joinUs")}
          </Link>
        </div>
      </div>
    </AffiliateHeaderStyles>
  );
};
export default AffiliateHeader;
