import styled from "styled-components";
export const ShopProfileTabsStyles = styled.ul`
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 1.1em;
  color: var(--darkBlue);
  margin: 20px 0 20px 0;
  padding: 0 10px;
  li {
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 15px;
      border: 1px solid lightgray;
      border-radius: 10px;
      font-weight: 600;
      color: var(--darkBlue);
      @media (max-width: 500px) {
        span {
          display: none;
        }
      }
    }
    &:hover {
      button {
        background: #ececec;
      }
    }
    &.active {
      button {
        color: white;
        background: var(--darkBlue);
        img {
          filter: var(--whiteFilter);
        }
      }
    }
  }
`;
