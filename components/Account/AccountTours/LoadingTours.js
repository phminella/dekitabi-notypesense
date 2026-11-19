import { LoadingToursStyles } from "./styles/LoadingToursStyles";
import Image from "next/image";
const LoadingTours = ({ t }) => {
  return (
    <LoadingToursStyles>
      <Image
        height={80}
        width={80}
        src="/img/icon-spinner.svg"
        alt="spinner"
        className="spinner"
      />
    </LoadingToursStyles>
  );
};
export default LoadingTours;
