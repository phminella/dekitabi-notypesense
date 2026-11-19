import styled from "styled-components";
export const ItineraryReviewsStyles = styled.div`
  .dekitabi-reviews {
    margin-top: 20px;
    .dekitabi-reviews-sort {
      color: var(--darkBlue);
      .reviews-select {
        height: 35px !important;
        min-height: 35px !important;
      }
    }
    .dekitabi-review {
      background: none !important;
      padding: 0 !important;
      margin-top: 20px !important;
      &:first-child {
        margin: 0 !important;
      }
      .avatar img {
        width: 40px !important;
        height: 40px !important;
      }
      .MuiRating-sizeLarge {
        font-size: 1.5em;
      }
      .review-date {
        top: 10px !important;
      }
      .review-message {
        border: none !important;
        margin: 0 !important;
        padding: 0 0 0 45px !important;
      }
    }
  }
  .show-more {
    height: 30px !important;
    background: none !important;
    border: none !important;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--pink);
      }
    }
  }
`;
