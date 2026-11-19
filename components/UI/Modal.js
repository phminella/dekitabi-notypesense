import { ModalStyles } from "./styles/ModalStyles";
const Modal = (props) => {
  return (
    <ModalStyles>
      <div className="modal-background"></div>
      <div className={`${props.showModal ? "show-modal" : ""} modal-content`}>
        {props.children}
      </div>
    </ModalStyles>
  );
};
export default Modal;
