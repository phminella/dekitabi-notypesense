import { SpinnerStyles } from "./styles/SpinnerStyles";
const Spinner = () => {
  return (
    <SpinnerStyles className={`spinner`}>
      <span className="lds-ring">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </SpinnerStyles>
  );
};
export default Spinner;
