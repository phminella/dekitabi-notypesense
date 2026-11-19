import styled from "styled-components";
export const ItineraryCreatedByStyles = styled.div`
  border-right: 3.5px solid black;
  @media (max-width: 550px) {
    border: none;
    margin-bottom: 10px;
  }
  padding-right: 25px;
  margin-right: 15px;
  .itinerary-user {
    display: flex;
    a,
    .username-guest {
      display: inline-flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
      font-weight: 600;
      font-size: 1.2em;
      color: black;
      .normal-button {
        font-size: 0.9em;
        font-weight: 400;
        background: var(--blue);
        color: white;
        height: 25px;
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          .normal-button {
            background: var(--darkBlue);
          }
        }
      }
    }
  }
`;
