import styled from "styled-components";
export const AttractionsResponsiveStyles = styled.div`
 
  .result-details {
    @media (max-width: 800px) {
      grid-template-columns: 1fr !important;
      .per-page {
        margin-top: 10px;
        justify-content: left !important;
      }
    }
  }
  .attractions-wrapper {
    .attractions-list {
      @media (max-width: 800px) {
        margin: 0 10px;
      }
    }
    .attraction-list-wrapper {
      @media (max-width: 1350px) {
        grid-template-columns: 1fr 1fr !important;
        margin: 0;
      }
      @media (max-width: 430px) {
        grid-template-columns: 1fr !important;
      }
    }
    @media (max-width: 800px) {
      grid-template-columns: 1fr;
      .result-details {
        flex-wrap: nowrap;
      }
      .attractions-map {
        position: fixed;
        height: 100dvh;
        top: 0;
        right: 0;
        visibility: hidden;
        z-index: 1;
        .pagination-map {
          display: flex;
        }
        .add-to-itinerary-button {
          display: flex;
        }
        .map {
          position: fixed;
          width: 100vw;
          top: 60px;
          z-index: 2;
          right: -100vw;
          transition: all 0.3s ease-in-out;
        }
        &.show {
          visibility: visible;
          .map {
            right: 0 !important;
          }
        }
      }
    }
  }
  @media (max-width: 500px) {
    .result-details {
      flex-wrap: wrap;
    }
    .grid-wrapper {
      max-width: 100vw;
      overflow: hidden;
      .attraction-more-info {
        padding: 0 3px 0 3px;
      }
    }
    .pagination {
      button {
        font-size: 0.9em !important;
        padding: 0 !important;
        min-width: 25px !important;
      }
    }
  }
  @media (max-width: 350px) {
    .pagination {
      button {
        font-size: 0.8em !important;
        padding: 0 !important;
        min-width: 20px !important;
      }
    }
  }
  @media (max-width: 615px) {
    .result-details {
      flex-wrap: wrap !important;
    }
  }
`;
