import styled from "styled-components";
export const DekitabiReviewsStyles = styled.div`
  .spinner {
    min-height: 150px;
  }
  h1 {
    margin-top: 30px;
  }
  .show-more-wrapper {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    .show-more {
      border: 1px solid lightgray;
      height: 58px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border-radius: 10px;
      padding: 10px;
      font-size: 1.1em;
      margin: 0 auto;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--lightGray);
        }
      }
    }
  }
`;
