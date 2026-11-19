import styled from "styled-components";
export const ItineraryLunchBreakStyles = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  min-height: 100px;
  margin-top: 10px;
  border: 1px solid lightgray;
  .attraction {
    display: grid;
    grid-template-columns: 180px 1fr;
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
    .attraction-image-bg {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .attraction-description {
      padding: 5px;
      .attraction-item {
        display: flex;
        align-items: center;
        gap: 5px;
        margin: 2px 0;
        p,
        a {
          margin: 0;
          white-space: pre-line; /* CSS 3.0 */
        }
      }
    }
    .lunch-bold {
      font-weight: 600;
    }
  }
`;
