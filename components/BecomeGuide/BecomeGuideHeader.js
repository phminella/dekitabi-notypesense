import { BecomeGuideHeaderStyles } from "./styles/BecomeGuideHeaderStyles";
import Image from "next/image";
import Link from "next/link";
const BecomeGuideHeader = ({ t, user }) => {
  return (
    <BecomeGuideHeaderStyles>
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
        {!user?.uid && (
          <div className="buttons">
            <Link
              className="sign-in"
              href={`/affiliate-program/sign-in`}
              prefetch={false}
            >
              {t("guides:signIn")}
            </Link>
            <Link
              className="sign-in sign-up"
              href={`/affiliate-program/sign-up`}
              prefetch={false}
            >
              {t("guides:joinUs")}
            </Link>
          </div>
        )}
      </div>
    </BecomeGuideHeaderStyles>
  );
};
export default BecomeGuideHeader;
