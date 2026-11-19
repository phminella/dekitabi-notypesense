import { HeaderUserStyles } from "./styles/HeaderUserStyles";
import Image from "next/legacy/image";
import { useDispatch } from "react-redux";
import { setShowLogin } from "../../store/appSlice";
const HeaderUser = ({ t }) => {
  const dispatch = useDispatch();
  return (
    <HeaderUserStyles>
      <button
        className="user-login sign-in header-icon"
        onClick={() => dispatch(setShowLogin(true))}
      >
        <Image
          src="/img/icon-add-guide.svg"
          height={28}
          width={28}
          alt="dekitabi-profile-sign-in"
          className="signin-img"
        />{" "}
        <b>{t("signIn")}</b>
      </button>
    </HeaderUserStyles>
  );
};
export default HeaderUser;
