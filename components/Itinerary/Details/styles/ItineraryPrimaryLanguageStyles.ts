import styled from "styled-components";
export const ItineraryPrimaryLanguageStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  span {
    flex-shrink: 0;
  }
  img {
    filter: var(--darkBlueFilter);
  }
  select {
    border: 1px solid lightgray;
    &.error {
      border: 2px solid red;
    }
  }
  .primary-language {
    font-size: 1.1em;
    text-align: left;
    font-weight: 600;
    color: var(--darkBlue);
  }
`;
