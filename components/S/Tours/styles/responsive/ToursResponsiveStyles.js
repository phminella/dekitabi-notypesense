import styled from "styled-components";
export const ToursResponsiveStyles = styled.div`
  width: calc(100%-20px);
  margin: 0 10px;
  .tours-filter {
    @media (max-width: 520px) {
      .filter-button-text {
        display: none;
      }
    }
  }
  .result-details {
    @media (max-width: 800px) {
      grid-template-columns: 1fr !important;
      .details-wrapper {
        display: block;
      }
      select {
        margin: 5px 0 15px 0;
      }
      .per-page {
        justify-content: left !important;
        white-space: nowrap;
      }
    }
  }
  .tours-wrapper {
    @media (max-width: 800px) {
      grid-template-columns: 1fr !important;
      .tours-map {
        position: fixed;
        height: 100dvh;
        top: 0;
        right: 0;
        visibility: hidden;
        z-index: 1;
        .pagination-map {
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
  .tours-list {
    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr 1fr!important;
    }
    @media (max-width: 850px) {
      grid-template-columns: 1fr 1fr !important;
    }
    @media (max-width: 430px) {
      grid-template-columns: 1fr !important;
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
`;
