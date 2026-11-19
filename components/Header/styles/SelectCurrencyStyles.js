import styled from "styled-components";
export const SelectCurrencyStyles = styled.div`
  .currency-button {
    display: flex;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    padding: 5px;
    gap: 5px;
    z-index: 0;
    .arrow {
      font-size: 1.1em;
      line-height: 1em;
    }
    img {
      border-radius: 5px;
      min-width: 25px;
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--lightGray);
      }
    }
  }
  .currency-wrapper {
    height: 100dvh;
    width: 100vw;
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    z-index: 9999;
    .currency-flex {
      width: 100vw;
      height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .close-icon {
      position: absolute;
      top: 18px;
      right: 15px;
      border-radius: 50px;
      background: var(--lightGray);
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: lightgray;
        }
      }
    }
    .currency-background {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0 auto;
      width: 100vw;
      height: 100dvh;
      background: var(--blue);
      opacity: 0.8;
    }
    .language-warning-wrapper {
      display: grid;
      grid-template-columns: 50px 1fr;
      gap: 10px;
      padding: 10px 10px;
      border-left: 5px solid lightgray;
      margin: 0 20px;
      align-items: start;
      background: var(--blue);
      color: white;
      text-align: left;
      transition: 0.5s all ease-in-out;
      img {
        filter: var(--whiteFilter);
      }
      &.language-selected {
        background: #ff4433;
      }
    }
    .currency-list {
      position: relative;
      background: white;
      border-radius: 10px;
      border: 1px solid var(--lightGray);
      transition: opacity 0.1s ease-in-out;
      margin: 10px auto;
      max-width: 1000px;
      h2 {
        padding-bottom: 20px;
        margin-bottom: 10px;
        border-bottom: 1px solid var(--lightGray);
        padding: 20px;
      }
      .currency-list-wrapper {
        position: relative;
        padding: 20px;
        max-height: 50vh;
        overflow-y: auto;
        ul {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 25px;
          margin: 20px 0;
          li {
            button {
              text-align: left;
              padding: 10px;
              width: 100%;
              height: 100%;
              border-radius: 10px;
              display: flex;
              align-items: center;
              gap: 5px;
              white-space: nowrap;
              img {
                flex-shrink: 0;
              }
              div {
                p {
                  font-size: 1em;
                  color: gray;
                  span {
                    color: lightgray;
                  }
                  &.p-currency {
                    color: var(--darkBlue);
                  }
                }
                p {
                  white-space: nowrap;
                }
              }
              @media (hover: hover) and (pointer: fine) {
                &:hover {
                  background: var(--lightGray);
                  p {
                    color: var(--pink);
                  }
                }
              }
              &.active {
                border: 1px solid lightgray;
                background: white;
                cursor: default;
                span {
                  color: gray;
                }
              }
            }
          }
        }
      }
    }
  }
`;
