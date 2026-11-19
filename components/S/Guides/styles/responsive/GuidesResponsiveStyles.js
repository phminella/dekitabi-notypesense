import styled from "styled-components";
export const GuidesResponsiveStyles = styled.div`
  .guides-filter {
    @media (max-width: 760px) {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 450px) {
    .guides-filter-two {
      grid-template-columns: 1fr 50px !important;
    }
    .filter-button-text {
      display: none;
    }
  }
  .result-details {
    @media (max-width: 1000px) {
      .details-wrapper {
        grid-template-columns: 1fr 1fr;
        justify-content: left;
        .include-transport {
          justify-content: right;
        }
        .per-page {
          margin-top: 10px;
          justify-content: left !important;
          white-space: nowrap;
        }
      }
    }
    @media (max-width: 680px) {
      .details-wrapper {
        grid-template-columns: 1fr;
        .include-transport {
          justify-content: left;
        }
      }
    }
  }
  .guides-wrapper {
    @media (max-width: 1100px) {
      grid-template-columns: 1fr 1fr 1fr !important;
      .guide {
        padding: 10px 10px 10px 10px;
      }
    }
    @media (max-width: 875px) {
      grid-template-columns: 1fr 1fr !important;
      .guide {
        margin: 0 auto;
      }
    }
    @media (max-width: 600px) {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 740px) {
    .modal-wrapper {
      min-width: 0 !important;
      margin: 0 10px;
    }
  }
  @media (max-width: 305px) {
    .filter-price-input {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 350px) {
    .guide {
      padding: 5px 0px !important;
    }
    .pagination {
      button {
        font-size: 0.8em !important;
        padding: 0 !important;
        min-width: 20px !important;
      }
    }
  }
  @media (max-width: 645px) {
    select {
      margin: 5px 0 15px 0;
    }
  }
`;
