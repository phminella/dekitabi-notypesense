import styled from "styled-components";
export const ItineraryBookedGuideStyles = styled.div`
  position: absolute;
  max-width: 350px;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 10px 0 10px;
  .guide-header {
    display: flex;
    justify-content: center;
  }
  .guide-content {
    padding: 5px 15px 15px 15px;
    background-color: var(--darkBlue);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  .guide-info {
    border-radius: 5px;
    color: white;
    padding: 10px 0;
    /* background: red; */
    /* font-size: 1.1em; */
    li {
      display: flex;
      align-items: start;
      gap: 5px;
      .circle {
        margin-top: 5px;
        flex-shrink: 0;
        background-color: var(--pink);
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      span {
        font-size: 0.9em;
        color: var(--pink);
      }
    }
  }
  .guide-wrapper {
    .guide {
      min-height: 280px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      .guide-background {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    .guide-change {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      .guide-change-button {
        padding: 8px;
        width: 100%;
        height: 55px;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background: var(--pink);
          }
        }
      }
    }
  }
`;
