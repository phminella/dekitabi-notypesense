import { HeaderShopStyles } from "./styles/HeaderShopStyles";
import Link from "next/link";
import Avatar from "../UI/Avatar";
import dynamic from "next/dynamic";
import { getAuth, signOut } from "firebase/auth";
const StripeLink = dynamic(() => import("../UI/StripeLink"), { ssr: false });
const HeaderShop = ({ t, user }) => {
  const logout = () => {
    const auth = getAuth();
    signOut(auth);
  };
  return (
    <HeaderShopStyles className="">
      <Avatar
        width={40}
        height={40}
        src={user?.photos?.length > 0 ? user?.photos[0] : "/img/avatar.png"}
      />
      <ul className="shop-popup">
        <li>
          <Link href={`/shop/${user?.url}`} prefetch={false}>
            {t("profile")}
          </Link>
        </li>
        <li>
          <StripeLink
            buttonText={t("shops:stripeAccount")}
            // onClick={() => setShowSettings(false)}
          />
        </li>
        <li>
          <button onClick={() => logout()}>{t("signOut")}</button>
        </li>
      </ul>
    </HeaderShopStyles>
  );
};
export default HeaderShop;
