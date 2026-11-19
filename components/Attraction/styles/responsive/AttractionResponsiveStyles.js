import styled from "styled-components";
export const AttractionResponsiveStyles = styled.div`
  @media (max-width: 1000px) {
    .attraction-wrapper {
      margin: 0 10px !important;
      margin-top: 0 !important;
      padding-top: 0 !important;
    }
  }
  @media (max-width: 800px) {
    .attraction-more-info {
      grid-template-columns: 1fr !important;
    }
  }
`;
