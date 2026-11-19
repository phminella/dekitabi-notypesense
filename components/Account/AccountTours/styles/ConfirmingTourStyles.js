import styled from "styled-components";
export const ConfirmingTourStyles = styled.div`
  .loading-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    color: var(--blue);
    .loading-wrapper {
      text-align: center;
      padding: 20px;
      border-radius: 10px;
      background: white;
      margin: 0 10px;
    }
    .progress-default-message {
      font-size: 1.1em;
      font-weight: 600;
    }
    .progress-list {
      max-width: 500px;
      margin-top: 20px;
      overflow: hidden;
      position: relative;
      li {
        display: grid;
        justify-content: center;
        gap: 5px;
        font-size: 1.4em;
        font-weight: 600;
        color: var(--darkBlue);
        position: absolute;
        margin-left: -550px;
        img {
          margin: 0 auto;
          filter: invert(87%) sepia(80%) saturate(574%) hue-rotate(69deg)
            brightness(95%) contrast(82%);
        }
        &.show {
          position: relative;
          margin: 0;
        }
      }
    }
    .progress {
      height: 4.5px;
      width: 245.6px;
      background: linear-gradient(var(--blue) 0 0),
        linear-gradient(var(--blue) 0 0), #dbdcef;
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
