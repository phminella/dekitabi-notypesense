import styled from "styled-components";
export const ItineraryResponsiveStyles = styled.div`
  .itinerary-wrapper {
    &.guide-wrapper {
      grid-template-columns: 1fr 1fr;
      .itinerary-attractions-wrapper {
        grid-template-columns: 1fr;
        .itinerary-details-content {
          margin-left: 0;
        }
        .itinerary-attractions-list,
        .itinerary-options {
          padding: 0;
        }
      }
    }
    @media screen and (max-width: 1230px) {
      grid-template-columns: 1fr 1fr;
      .itinerary-attractions-wrapper {
        grid-template-columns: 1fr;
        .itinerary-details-content {
          margin-left: 0;
        }
        .itinerary-attractions-list,
        .itinerary-options {
          padding: 0;
        }
      }
    }
    @media screen and (max-width: 500px) {
      .itinerary-details-header {
        grid-template-columns: 1fr;
        justify-content: right;
        .itinerary-price {
          text-align: right;
        }
        .itinerary-person-number {
          justify-content: right;
        }

        .itinerary-details-price-person {
          order: 2 !important;
        }
        .itinerary-details-guide {
          order: 1 !important;
          justify-content: left;
          a {
            justify-content: left;
          }
        }
      }
      .primary-language {
        justify-content: right;
      }
      .guide-details {
        .itinerary-person-number {
          justify-content: left;
        }
        .primary-language {
          justify-content: left;
        }
      }
    }
    @media screen and (max-width: 990px) {
      grid-template-columns: 1fr !important;
      .no-attractions-image-wrapper {
        display: none;
      }
      .show-map {
        display: flex;
      }
    }
  }
  .map-wrapper {
    @media screen and (max-width: 990px) {
      position: fixed !important;
      width: 100vw !important;
      left: 0;
      transition: left 0.3s ease-in-out;
      border-radius: 0;
      z-index: 1;
      &.hide {
        left: -105vw;
      }
      .map {
        border-radius: 0;
      }
    }
  }
  @media (max-width: 365px) {
    .toolbar-button {
      padding: 11px;
    }
  }
  @media screen and (max-width: 990px) {
    .show-map {
      display: flex;
      z-index: 2;
    }
  }
`;
