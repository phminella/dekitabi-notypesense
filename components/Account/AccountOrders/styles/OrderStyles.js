import styled from "styled-components";
export const OrderStyles = styled.div`
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  color: var(--darkBlue);
  &:last-child {
    margin: 0;
  }
  .order-header {
    display: flex;
    align-items: top;
    padding: 10px;
    gap: 20px;
    background: var(--lightGray);
    .label {
      text-transform: uppercase;
    }
    .order-placed {
      white-space: nowrap;
    }
    .order-id {
      width: 100%;
      text-align: right;
    }
  }
  .order-items {
    gap: 20px;
  }
  .order-payment-method {
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 10px;
    gap: 5px;
    background: var(--lightGray);
    .link {
      color: var(--blue);
      text-decoration: underline;
      font-size: 1em;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
`;
