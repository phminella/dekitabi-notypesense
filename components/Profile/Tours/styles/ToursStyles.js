import styled from "styled-components";
export const ToursStyles = styled.section`
  padding-top: 0 !important;
  margin-bottom: 15px;
  .spinner-wrapper {
    text-align: center;
    img {
      width: 80px !important;
      height: 80px !important;
    }
  }
  .tour-alert {
    display: inline-flex;
    margin-bottom: 15px;
    p {
      display: flex;
      align-items: center;
      border-radius: 5px;
      padding: 5px;
      gap: 5px;
      padding: 5px;
      background: var(--lightGray);
      color: var(--blue);
    }
    img {
      filter: var(--blueFilter);
    }
  }
  .no-itineraries {
    font-size: 1.2em;
    color: darkgray;
    &.traveler-no-itineraries {
      text-align: center;
      font-size: 1.5em;
    }
  }
  .tours-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 1000px;
    width: 100%;
    gap: 10px;
    margin: 0 auto;
    .tour {
      margin: 0;
    }
  }
  .show-more-wrapper {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    .show-more {
      width: 100%;
      max-width: 1000px;
      border: 1px solid lightgray;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border-radius: 10px;
      padding: 10px;
      font-size: 1.1em;
      margin: 0 auto;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--lightGray);
        }
      }
    }
  }
`;
