import styled from "styled-components";
export const ItineraryHeaderResponsiveStyles = styled.div`
  @media (max-width: 870px) {
    .itinerary-header-wrapper {
      grid-template-columns: 1fr !important;
      .right-frame {
        display: none !important;
      }
    }
  }
  @media (max-width: 570px) {
    .left-frame {
      padding: 0 10px !important;
      .header-buttons,
      .share-itinerary {
        left: 10px !important;
      }
    }
    .no-reviews-img {
      width: 260px;
      height: 140px;
    }
  }
  @media (max-width: 400px) {
    h1 {
      font-size: 2.2em !important;
    }
  }
  @media (max-width: 360px) {
    .no-reviews-img {
      width: 200px;
      height: 120px;
    }
  }
`;
