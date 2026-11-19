import styled from "styled-components";
export const ItineraryGuideListResponsiveStyles = styled.div`
  @media (max-width: 305px) {
    .filter-qualifications {
      grid-template-columns: 1fr 1fr;
    }
    .filter-price-input {
      grid-template-columns: 1fr;
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
