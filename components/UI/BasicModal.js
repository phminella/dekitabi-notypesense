import { BasicModalStyles } from "./styles/BasicModalStyles";
import Image from "next/image";
const BasicModal = (props) => {
  return (
    <>
      {props.showModal && (
        <BasicModalStyles className={`basic-modal`}>
          <div
            className="modal-background"
            onClick={() => props.setShowModal(false)}
          ></div>
          <div className="modal-wrapper">
            <button
              className="close-icon"
              onClick={() => props.setShowModal(false)}
            >
              <Image
                src="/img/icon-close.svg"
                height={20}
                width={20}
                alt="close"
              />
            </button>
            {props.children}
          </div>
        </BasicModalStyles>
      )}
    </>
  );
};
export default BasicModal;
