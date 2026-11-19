import styled from "styled-components";
export const DekitabiReviewStyles = styled.div`
  background-color: var(--lightGray);
  padding: 15px;
  margin-top: 10px;
  border-radius: 5px;
  .review-header {
    position: relative;
    flex-shrink: 0;
    @media (max-width: 320px) {
      display: block;
      .user {
        margin-bottom: 10px;
      }
    }
    .traveler-avatar {
      flex-shrink: 0;
      width: 50px;
      height: 50px;
      border-radius: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    a,
    .name {
      color: var(--darkBlue);
      font-weight: 600;
    }
    a {
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--pink);
        }
      }
    }
    .review-date {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 0.9em;
      color: gray;
    }
  }
  .review-message {
    border-top: 1px solid lightgray;
    margin-top: 10px;
    padding-top: 10px;
  }
`;
