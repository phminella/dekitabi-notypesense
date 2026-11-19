import { CheckoutSigninStyles } from "./styles/CheckoutSigninStyles";
import CheckoutGuest from "./CheckougGuest";
import CheckoutSignUp from "./CheckougSignUp";
import Skeleton from "@mui/material/Skeleton";
const CheckoutSignin = ({
  withSignUp,
  setWithSignUp,
  isGuide,
  setIsGuide,
  signUpTab,
  setSignUpTab,
  t,
  loading,
  getTotal,
}) => {
  return (
    <CheckoutSigninStyles className="checkout-signin">
      {!withSignUp ? (
        <>
          {loading ? (
            <Skeleton variant="rounded" width={"100%"} height={140} />
          ) : (
            <CheckoutGuest setWithSignUp={setWithSignUp} t={t} />
          )}
        </>
      ) : (
        <CheckoutSignUp
          isGuide={isGuide}
          setWithSignUp={setWithSignUp}
          setIsGuide={setIsGuide}
          t={t}
          signUpTab={signUpTab}
          setSignUpTab={setSignUpTab}
          getTotal={getTotal}
        />
      )}
    </CheckoutSigninStyles>
  );
};
export default CheckoutSignin;
