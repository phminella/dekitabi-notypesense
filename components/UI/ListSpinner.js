import { ListSpinnerStyles } from "./styles/ListSpinnerStyles";
import Image from "next/image";
const ListSpinner = ({ loading }) => {
  return (
    <ListSpinnerStyles className={loading ? "show" : ""}>
      <Image
        height={100}
        width={100}
        alt="spinner"
        src="/img/icon-spinner.svg"
      />
    </ListSpinnerStyles>
  );
};
export default ListSpinner;
