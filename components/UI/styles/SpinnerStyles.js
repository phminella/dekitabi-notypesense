import styled from "styled-components";
export const SpinnerStyles = styled.span`
  min-height: 500px;
  width: 100vw;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  &.responsive {
    width: 100% !important;
    height: 100% !important;
    min-height: 100px !important;
  }
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring span {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 8px;
    border: 8px solid lightgray;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: lightgray transparent transparent transparent;
  }
  .lds-ring span:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring span:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring span:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
