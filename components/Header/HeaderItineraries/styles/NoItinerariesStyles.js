import styled from "styled-components";
export const NoItinerariesStyles = styled.div`
  padding: 10px 5px;
  font-size: 1.05em;
  color: var(--darkBlue);
  font-weight: 600;
  ul {
    li {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 10px;
      .icon-wrapper {
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img {
        filter: var(--pinkFilter);
      }
    }
  }
`;
