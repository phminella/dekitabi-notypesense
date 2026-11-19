import styled from "styled-components";
export const ItineraryPriceStyles = styled.div`
  margin-bottom: 5px;
  &.align-left {
    text-align: left !important;
  }
  p {
    display: grid;
    @media (max-width: 500px) {
      margin-bottom: 10px;
    }
    b {
      font-size: 2em;
      line-height: 1.2em;
      color: var(--darkBlue);
    }
  }
`;
