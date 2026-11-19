import styled from "styled-components";
export const ItineraryGuideStyles = styled.div`
  display: grid;
  justify-content: left;
  /* border: 1px solid lightgray; */
  &.with-guide {
    justify-content: right;
    margin-right: 20px;
    .normal-button {
      padding: 5px;
    }
  }
  .choose-guide {
    display: grid;
    .guide-avatar {
      margin-bottom: 10px;
    }
  }
  a {
    display: grid;
    justify-content: right;
    gap: 5px;
    white-space: nowrap;
    margin: 2px 0;
    border-radius: 10px;
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
  /* button {
    color: var(--blue);
    text-decoration: underline;
    text-align: left;
    @media (max-width: 500px) {
      text-align: left;
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  } */
`;
