import styled from "styled-components";
export const CheckoutSignUpTabsStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 15px 0 10px 0;
  button {
    background: #f6f8fa;
    height: 60px;
    text-align: left;
    gap: 10px;
    padding: 0 12px;
    border-radius: 15px;
    color: #6d6e78;
    font-weight: 600;
    display: flex;
    align-items: center;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03),
          0px 3px 6px rgba(18, 42, 66, 0.02);
      }
    }
    &.active {
      border: 2px solid var(--darkBlue);
      color: #111;
    }
    &.email img {
      filter: var(--darkBlueFilter);
    }
  }
`;
