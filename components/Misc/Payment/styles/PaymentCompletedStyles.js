import styled from "styled-components";
export const PaymentCompletedStyles = styled.div`
  background-color: var(--lightGray);
  padding: 30px 10px;
  margin-top: -60px;
  text-align: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .payment-wrapper {
    background-color: white;
    text-align: left;
    max-width: 500px;
    margin: 30px auto 0 auto;
    padding: 15px 20px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    .title-wrapper {
      text-align: center;
    }
    h1 {
      margin-bottom: 10px;
    }
    a {
      display: flex;
      margin-top: 15px;
      color: var(--blue);
      text-decoration: underline;
      justify-content: center;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
    .payment-details-wrapper {
      border: 1px solid lightgray;
      border-radius: 5px;
      margin-top: 15px;
      padding: 10px;
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
          padding-top: 10px;
          margin-top: 10px;
          font-weight: 700;
          font-size: 1.2em;
          text-transform: capitalize;
          img {
            filter: invert(98%) sepia(45%) saturate(7166%) hue-rotate(17deg)
              brightness(96%) contrast(90%);
          }
        }
      }
    }
  }
`;
