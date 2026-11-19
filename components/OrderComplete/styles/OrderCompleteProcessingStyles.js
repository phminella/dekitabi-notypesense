import styled from "styled-components";
export const OrderCompleteProcessingStyles = styled.div`
  position: fixed;
  width: 100vw;
  height: 100dvh;
  top: 0;
  z-index: 9999;
  background-color: var(--lightGray);
  header,
  footer {
    visibility: hidden;
  }
  .loading-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    .loading-wrapper {
      margin: 0 10px;
      padding: 20px;
      border-radius: 10px;
      background: white;
      border: 3px solid (--blue);
      z-index: 5;
      .logo {
        margin: 0 auto 10px auto;
      }
      text-align: center;
    }
    .progress-default-message {
      font-size: 1.2em;
      font-weight: 600;
    }
    .progress-list {
      text-align: left;
      margin-top: 20px;
      font-size: 1.1em;
      li {
        display: flex;
        align-items: start;
        gap: 5px;
        color: lightgray;
        img {
          margin-top: 5px;
          filter: invert(95%) sepia(0%) saturate(100%) hue-rotate(123deg)
            brightness(111%) contrast(65%);
          &.checked {
            filter: invert(87%) sepia(80%) saturate(574%) hue-rotate(69deg)
              brightness(95%) contrast(82%);
          }
        }
        &.completed {
          color: var(--darkBlue);
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
  }
  .order-background {
    background-color: var(--blue);
    opacity: 0.6;
  }
`;
