import styled from "styled-components";
export const ModalStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100lvh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    background: var(--blue);
    opacity: 80%;
    z-index: -1;
  }
  .modal-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    color: var(--darkBlue);
    border-radius: 10px;
    overflow: hidden;
    margin: 0 10px;
    .modal-title,
    .modal-message {
      padding: 20px 15px;
      border-radius: 10px;
    }
    .modal-title {
      background: var(--darkBlue);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      color: white;
      display: flex;
      align-items: center;
      gap: 5px;
      max-width: 100%;
      font-weight: 600;
      img {
        filter: var(--whiteFilter);
      }
    }
    .modal-message {
      padding: 15px;
    }
    span {
      color: var(--pink);
      font-weight: 600;
      text-transform: capitalize;
    }
    .modal-buttons {
      display: flex;
      align-items: center;
      justify-content: right;
      gap: 10px;
      padding: 0 15px;
      button {
        min-width: 100px;
      }
    }
  }
`;
