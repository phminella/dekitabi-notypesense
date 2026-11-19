import { AddInformationButtonStyles } from "./styles/AddInformationButtonStyles";
import Image from "next/image";
const AddInformationButton = ({ text, field, setShowModal }) => {
  return (
    <AddInformationButtonStyles
      onClick={() => {
        setShowModal(field);
      }}
    >
      <Image
        src="/img/icon-plus2.svg"
        height={20}
        width={20}
        alt="add-information"
      />
      {text}
    </AddInformationButtonStyles>
  );
};
export default AddInformationButton;
