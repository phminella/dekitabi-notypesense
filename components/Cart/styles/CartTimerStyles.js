import styled from "styled-components";
export const CartTimerStyles = styled.div`
  background: var(--darkBlue);
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px;
  border-radius: 10px;
  margin: 0 10px 20px 10px;
  .icon-fire {
    filter: var(--whiteFilter);
  }
  span {
    color: var(--pink);
    font-weight: 600;
  }
`;
