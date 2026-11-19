import styled from "styled-components";
export const AttractionReviewsStyles = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 30px;
  @media (max-width: 1040px) {
    margin: 0 10px;
  }
  h3 {
    margin: 10px 0;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1.5em;
  }
  .reviews-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    .reviews-header-rating {
      background: var(--darkBlue);
      padding: 10px;
      font-size: 1.3em;
      font-weight: 600;
      color: white;
    }
    .reviews-header-stars {
      display: grid;
      gap: 2px;
      text-transform: lowercase;
    }
  }
`;
