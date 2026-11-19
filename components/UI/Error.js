import { ErrorStyles } from "./styles/ErrorStyles";
import Image from "next/image";
const Error = ({ showError, setShowError, errorMsg }) => {
  return (
    <ErrorStyles className={showError ? "show" : ""}>
      <Image src="/img/icon-alert.svg" alt="alert" height={15} width={15} />{" "}
      {errorMsg}
      <button className="close-icon" onClick={() => setShowError(false)}>
        <Image src="/img/icon-close.svg" height={20} width={20} alt="close" />
      </button>
    </ErrorStyles>
  );
};
export default Error;
