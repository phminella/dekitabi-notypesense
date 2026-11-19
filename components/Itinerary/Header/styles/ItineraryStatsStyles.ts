import styled from "styled-components";
export const ItineraryStatsStyles = styled.div`
  position: relative;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  max-width: 1200px;
  margin: 10px auto 20px auto;
  @media (max-width: 1240px) {
    padding: 0 10px 0 10px;
  }
  @media (max-width: 550px) {
    .MuiSkeleton-root {
      height: 115px !important;
    }
  }
  .itinerary-stats-wrapper {
    background-color: var(--lightGray);
    padding: 10px;
    border: 1px solid #e3e3e3;
    display: flex;
    align-items: center;
    gap: 5px;
    border-radius: 10px;
    &.hide {
      display: none;
    }
    @media (max-width: 550px) {
      display: block;
    }
    .itinerary-stats {
      display: flex;
      align-items: center;
      gap: 5px;
      .stats-button,
      .stats {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 1.2em;
        color: var(--pink);
        &:hover {
          filter: var(--pinkFilter);
        }
        .comment-icon {
          margin-top: -2.5px;
          margin-right: 4px;
          margin-left: 2px;
        }
        .printer-icon {
          margin-top: -3px;
          margin-left: 3px;
        }
        .stats-icon {
          margin-right: 6px;
        }
        .publish-icon {
          margin-left: -4px !important;
          margin-bottom: 1px !important;
        }
        .unpublish-icon {
          margin-left: -2px !important;
        }
        .share-icon {
          margin-top: -3px;
          margin-left: -4px;
        }
        .star-icon {
          margin-right: 3px;
          margin-left: -1px;
          margin-top: -2px;
        }
        .heart-icon {
          margin-left: 0px;
          margin-right: 4px;
          margin-top: -1px;
        }
        .save-icon {
          margin-left: -3px;
        }
      }
    }
    .share-itinerary {
      position: absolute;
      bottom: -45px;
      background: white;
      border: 1px solid lightgray;
      padding: 10px;
      border-radius: 10px;
      z-index: 5;
    }
  }
`;
