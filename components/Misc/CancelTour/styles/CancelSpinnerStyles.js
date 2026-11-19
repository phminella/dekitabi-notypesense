import styled from "styled-components";
export const CancelSpinnerStyles = styled.div`
  .loading-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    color: #ff2e4a;
    .loading-wrapper {
      text-align: center;
      padding: 20px;
      border-radius: 10px;
      background: white;
      margin: 0 10px;
    }
    .progress-default-message {
      font-size: 1.2em;
      font-weight: 600;
    }
    .progress {
      height: 4.5px;
      width: 245.6px;
      background: linear-gradient(#ff2e4a 0 0), linear-gradient(#ff2e4a 0 0),
        #dbdcef;
      background-size: 60% 100%;
      background-repeat: no-repeat;
      animation: progress-7x9cg2 3s infinite;
      margin: 20px auto;
    }
    @keyframes progress-7x9cg2 {
      0% {
        background-position: -150% 0, -150% 0;
      }

      66% {
        background-position: 250% 0, -150% 0;
      }

      100% {
        background-position: 250% 0, 250% 0;
      }
    }
    .loading-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      opacity: 0.9;
      z-index: -1;
    }
  }
`;
