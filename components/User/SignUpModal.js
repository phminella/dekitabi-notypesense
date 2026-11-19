import { SignUpModalStyles } from "./styles/SignUpModalStyles";
import SignUp from "./SignUp";
import SignUpLastStep from "./SignUpLastStep";
const SignUpModal = ({ action, setAction, dispatch, isiOS, t }) => {
  return (
    <SignUpModalStyles>
      {action === "signup" && (
        <SignUp t={t} setAction={setAction} dispatch={dispatch} isiOS={isiOS} />
      )}
      {action === "laststep" && (
        <SignUpLastStep t={t} setAction={setAction} dispatch={dispatch} />
      )}
    </SignUpModalStyles>
  );
};
export default SignUpModal;
