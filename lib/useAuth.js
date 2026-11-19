import { getAuth, signOut } from "firebase/auth";
import { useSelector, shallowEqual } from "react-redux";
const useAuth = () => {
  let auth;
  try {
    auth = getAuth();
  } catch (err) {
    console.log(err);
  }
  const user = useSelector((state) => state.app.user, shallowEqual);
  //
  // Sign out
  //
  const signOff = async () => {
    signOut(auth);
  };
  return {
    user,
    signOff,
  };
};
export default useAuth;
