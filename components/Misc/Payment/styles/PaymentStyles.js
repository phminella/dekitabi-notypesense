import styled from "styled-components";
export const PaymentStyles = styled.div`
  background-color: var(--lightGray);
  padding: 20px 10px;
  margin-top: -60px;
  min-height: calc(100dvh);
  text-align: center;
  .timer-wrapper {
    background: var(--darkBlue);
    color: white;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    padding: 10px;
    border-radius: 10px;
    .icon-clock {
      filter: var(--whiteFilter);
    }
    span {
      color: var(--pink);
      font-weight: 600;
    }
    .time-left {
      display: flex;
      align-items: center;
    }
  }
  .payment-wrapper {
    background-color: white;
    text-align: left;
    max-width: 500px;
    margin: 20px auto 0 auto;
    padding: 15px 20px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    a {
      color: var(--blue);
      text-decoration: underline;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
    h1 {
      margin: 10px 0;
    }
    .payment-subtitle {
      border-bottom: 1px solid var(--darkBlue);
      margin-bottom: 20px;
      padding-bottom: 15px;
    }
    .tour-name {
      border-bottom: 1px solid lightgray;
      padding-bottom: 20px;
    }
    .tour-details {
      li {
        display: grid;
        grid-template-columns: 130px 1fr;
        gap: 10px;
        padding: 12px 0;
        border-bottom: 1px solid lightgray;
        p:nth-child(2) {
          text-align: right;
        }
        &:last-child {
          border-bottom: 1px solid var(--darkBlue);
        }
        .language {
          display: flex;
          align-items: center;
          justify-content: right;
          gap: 5px;
        }
      }
    }
    .payment-details-title {
      display: flex;
      align-items: center;
      gap: 5px;
      margin: 15px 0;
    }
    .payment-details {
      font-size: 1.1em;
      li {
        display: grid;
        grid-template-columns: 130px 1fr;
        gap: 10px;
        p:nth-child(2) {
          text-align: right;
        }
      }
      .total {
        border-top: 1px solid lightgray;
        padding: 10px 0;
        margin-top: 10px;
        font-weight: 700;
        font-size: 1.2em;
      }
    }
    .normal-button {
      width: 100%;
      background-color: var(--pink);
      height: 50px;
      margin: 20px 0 10px 0;
      font-size: 1.1em;
      font-weight: bold;
      img {
        filter: none;
      }
    }
    button:hover {
      background-color: var(--darkBlue);
    }
  }
`;
