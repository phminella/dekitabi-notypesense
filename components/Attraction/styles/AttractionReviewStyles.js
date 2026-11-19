import styled from "styled-components";
export const AttractionReviewStyles = styled.div`
  padding: 15px 0;
  display: flex;
  align-items: start;
  gap: 10px;
  .review-rating {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .review-details {
    .review-author {
      span {
        font-size: 0.8em;
        color: gray;
      }
    }
    .review-rating {
      gap: 5px;
    }
  }
`;
