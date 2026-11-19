import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
from { margin-top: 0;
    transform: scale(1.2); }
    to   { 
      opacity: 1;
      transform: scale(1); }`;
export const BasicModalStyles = styled.div`
  position: fixed;
  transition: 0.2s opacity ease-in;
  width: 100vw;
  height: 95dvh;
  top: 0;
  left: 0;
  z-index: 9999;
  display: grid;
  align-content: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s;
  .modal-background {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0 auto;
    width: 100vw;
    height: 100vh;
    background: var(--blue);
    opacity: 0.3;
  }
  .modal-wrapper {
    position: relative;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    max-width: 650px;
    max-height: 95vh;
    overflow-y: auto;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    top: 2.5dvh;
    margin: 0 auto;
    @media (max-width: 650px) {
      margin: 0 10px;
    }
    .close-icon {
      position: absolute;
      top: 15px;
      right: 15px;
      border-radius: 50px;
      background: var(--lightGray);
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: lightgray;
        }
      }
    }
    h2 {
      margin-bottom: 10px;
    }
  }
`;
