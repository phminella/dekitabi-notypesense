import styled from "styled-components";
export const ItineraryPersonNumberStyles = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  border-radius: 10px;
  gap: 10px;
  margin-top: 10px;
  span {
    flex-shrink: 0;
  }
  img {
    filter: var(--darkBlueFilter);
  }
  select {
    max-width: 60px;
    border: 1px solid lightgray;
  }
  .person-amount {
    font-size: 1.1em;
    font-weight: 600;
  }
`;
