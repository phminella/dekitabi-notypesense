import styled from "styled-components";
export const AccountPaymentsBankStyles = styled.div`
  .payment-bank-wrapper {
    .payment-bank {
      display: flex;
      align-items: center;
      gap: 10px;
      .bank-icon-wrapper {
        background: var(--blue);
        padding: 5px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          filter: var(--whiteFilter);
        }
      }
      .bank-name {
        font-weight: 600;
      }
    }
    a {
      color: var(--blue);
      text-decoration: underline;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
`;
