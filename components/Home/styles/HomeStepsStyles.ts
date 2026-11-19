import styled from "styled-components";
export const HomeStepsStyles = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--darkBlue);
  padding: 30px 30px;
  margin-top: 30px;
  .steps-wrapper {
    max-width: 1050px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 70px;
    .step {
      width: 100%;
      display: flex;
      justify-content: center;
      position: relative;
      flex-wrap: wrap;
      .step-screenshot {
        width: 100%;
        height: auto;
        object-fit: contain;
        max-width: 300px !important;
        opacity: 0.9;
        z-index: 0;
        margin: 0 auto;
      }
      .text {
        width: 100%;
        display: flex;
        gap: 9px;
        background: var(--darkBlue);
        /* text-shadow: var(--darkBlue) 1px 0 5px; */
        color: white;
        padding: 5px;
        margin-bottom: 17px;
        border-bottom: 4px dotted white;
        padding-bottom: 15px;
        .title {
          font-weight: bold;
          font-size: 2em;
          line-height: 1.1em;
          margin-bottom: 5px;
          width: 100%;
        }
        .message {
          width: 100%;
          font-size: 1.1em;
        }
        img {
          filter: var(--whiteFilter);
        }
      }
    }
  }
  @media (max-width: 895px) {
    padding: 20px 10px;
    margin-top: 30px;
    .steps-wrapper {
      grid-template-columns: 1fr;
      gap: 15px;
      .step-screenshot {
        max-width: 280px !important;
      }
      .text {
        justify-content: center;
        .title {
          text-align: center;
        }
        .message {
          font-size: 1.2em !important;
        }
        img {
          display: none;
        }
      }
    }
  }
  @media (hover: none) {
    .steps-wrapper {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      display: flex;
      flex-wrap: nowrap;
      gap: 15px;
      padding: 15px 30px;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 100%;
        pointer-events: none;
        background: linear-gradient(to right, transparent, var(--darkBlue));
        z-index: 1;
      }
    }

    .step {
      min-width: 80%;
      flex-shrink: 0;
      scroll-snap-align: start;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      .title {
        font-size: 1.9em !important;
      }
    }

    .step-screenshot {
      width: 100%;
      height: auto;
    }
    /* Optional: Smooth scrolling and scrollbar tweaks */
    .steps-wrapper::-webkit-scrollbar {
      height: 6px;
    }
    .steps-wrapper::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
  }
`;
