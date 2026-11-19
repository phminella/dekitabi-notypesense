import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
from { opacity: 0;
    transform: scale(0);  }
    to   { opacity: 1;
      transform: scale(1); }`;
export const HeaderSettingsStyles = styled.div`
  position: relative;
  font-size: 1.1em;
  .coupons-left {
    text-align: center;
    background: lightblue;
    color: var(--darkBlue);
    padding: 10px 5px;
    font-weight: 600;
  }
  .settings {
    position: absolute;
    right: 0;
    top: 14px;
    background: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    border-radius: 15px;
    z-index: 1;
    width: 300px;
    transform-origin: top right;
    animation: ${fadeIn} 0.2s;
    overflow: hidden;
    .close-icon {
      position: absolute;
      top: 13px;
      right: 10px;
      z-index: 1;
      &.logged {
        filter: var(--whiteFilter);
      }
    }
    .settings-ul {
      display: block !important;
      margin-bottom: 10px;
      .settings-li {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-content: left;
        padding: 0 20px;
        p {
          display: flex;
          align-items: center;
          gap: 5px;
          width: 100%;
        }
        .currency-button {
          position: relative;
          padding: 10px;
          .arrow {
            position: absolute;
            right: 0;
            top: 30%;
          }
        }
      }
      .language-currency {
      }
      &.no-user .language-currency {
        padding: 10px 15px;
      }
    }
  }
`;
