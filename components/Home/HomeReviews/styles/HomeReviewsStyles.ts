import styled from "styled-components";
export const HomeReviewsStyles = styled.ul`
  max-width: 1200px;
  margin: 50px auto 0 auto;
  padding: 0 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  @media (max-width: 750px) {
    margin-top: 10px;
    grid-template-columns: 1fr;
  }
  .review {
    position: relative;
    background: var(--lightGray);
    padding: 15px;
    border-radius: 15px;
    .translate {
      position: absolute;
      top: 10px;
      right: 10px;
      img {
        filter: var(--blueFilter);
      }
      &:hover {
        img {
          filter: var(--darkBlueFilter);
        }
      }
    }
    .review-name {
      font-weight: bold;
      color: var(--darkBlue);
      font-size: 1.2em;
      display: flex;
      gap: 10px;
      align-items: center;
      line-height: 1em;
      span {
        font-size: 0.7em;
        font-weight: 400;
        color: gray;
      }
      img {
        margin-top: 4px;
      }
    }
    .review-message {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      font-size: 1.12em;
      color: var(--darkBlue);
      img {
        filter: brightness(0) saturate(100%) invert(93%) sepia(0%)
          saturate(4036%) hue-rotate(349deg) brightness(129%) contrast(65%);
      }
    }
    .review-rating {
      margin: 10px 0 0 40px;
      display: flex;
      align-items: center;
      gap: 5px;
      img {
        filter: brightness(0) saturate(100%) invert(98%) sepia(100%)
          saturate(7498%) hue-rotate(331deg) brightness(101%) contrast(96%);
      }
    }
  }
`;
