import { SignInModalStyles } from "./styles/SignInModalStyles";
import { SignInResponsiveStyles } from "./styles/responsive/SignInResponsiveStyles";
import SignIn from "./SignIn";
import SignUpModal from "./SignUpModal";
import ResetPassword from "./ResetPassword";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowLogin } from "../../store/appSlice";
import BasicModal from "../UI/BasicModal";
import { useRouter } from "next/router";
const SignInModal = ({ user, t }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [action, setAction] = useState("signup");
  const showLogin = useSelector((state) => state.app.showLogin);
  const closeSignIn = (close) => {
    if (action === "laststep") {
      setTimeout(() => {
        setAction("signup");
      }, 500);
      router.push(`/${user.username}`);
      dispatch(setShowLogin(false));
    } else {
      setTimeout(() => {
        setAction("signup");
      }, 500);
      dispatch(setShowLogin(false));
    }
  };
  const isiOS = () => {
    if (typeof window === `undefined` || typeof navigator === `undefined`)
      return false;

    return /(Mac|iPhone|iPod|iPad)/i.test(
      navigator.userAgent ||
        navigator.vendor ||
        (window.opera && opera.toString() === `[object Opera]`)
    );
  };
  return (
    <SignInResponsiveStyles>
      <SignInModalStyles>
        <BasicModal showModal={showLogin} setShowModal={closeSignIn}>
          {action === "signin" && (
            <SignIn
              t={t}
              setAction={setAction}
              dispatch={dispatch}
              isiOS={isiOS}
            ></SignIn>
          )}
          {(action === "signup" || action === "laststep") && (
            <SignUpModal
              t={t}
              action={action}
              setAction={setAction}
              dispatch={dispatch}
              user={user}
              isiOS={isiOS}
            ></SignUpModal>
          )}
          {action === "resetpassword" && (
            <ResetPassword t={t} setAction={setAction}></ResetPassword>
          )}
        </BasicModal>
      </SignInModalStyles>
    </SignInResponsiveStyles>
  );
};
export default SignInModal;
