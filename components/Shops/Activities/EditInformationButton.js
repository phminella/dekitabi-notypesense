import { EditInformationButtonStyles } from "./styles/EditInformationButtonStyles";
import Image from "next/image";
const EditInformationButton = ({ setShowModal, field }) => {
  return (
    <EditInformationButtonStyles
      onClick={() => {
        setShowModal(field);
      }}
      className="edit-information-button"
    >
      <Image src="/img/icon-edit2.svg" height={15} width={15} alt="edit-shop" />
    </EditInformationButtonStyles>
  );
};
export default EditInformationButton;
