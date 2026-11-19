import styled from "styled-components";
export const AffiliateTabsStyles = styled.ul`
  width: 100%;
  display: inline-flex;
  gap: 10px;
  justify-content: center;
  height: 50px;
  li {
    a {
      border-radius: 10px;
      border: 2px solid var(--darkBlue);
      padding: 10px;
      color: var(--darkBlue);
      background-color: white;
      font-weight: 600;
      font-size: 1em;
      text-decoration: none;
      &:hover {
        background: var(--darkBlue);
        color: white;
      }
    }
    &.active {
      a {
        background-color: var(--darkBlue);
        color: white;
      }
    }
  }
`;
