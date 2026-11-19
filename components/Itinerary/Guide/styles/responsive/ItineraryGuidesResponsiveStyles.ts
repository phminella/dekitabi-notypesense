import styled from "styled-components";
export const ItineraryGuidesResponsiveStyles = styled.div`
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
    .pagination {
      button {
        font-size: 0.8em !important;
        padding: 0 !important;
        min-width: 20px !important;
      }
    }
  }
`;
