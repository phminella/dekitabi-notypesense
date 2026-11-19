import styled from "styled-components";
export const DekitabiReviewReplyStyles = styled.div`
  .normal-button {
    margin-top: 5px;
    background: var(--blue);
    height: 30px;
  }
  .reply-name {
    color: var(--darkBlue);
    font-weight: 600;
  }
  .reply {
    margin-top: 10px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    &.show {
      max-height: 400px;
    }
    textarea {
      resize: none;
      width: 100%;
      max-width: 100%;
      height: 100px;
      border-radius: 5px;
      padding: 10px;
      border: none;
      background: #f6f8fa;
      border: 1px solid lightgray;
      &:focus {
        outline: none;
      }
    }
    .review-counter {
      font-size: 0.9em;
      line-height: 0.9em;
      text-align: right;
    }
    .submit-button {
      margin-top: 20px;
      button {
        background: var(--blue);
        width: 100%;
        height: 40px !important;
        padding: 20px 0;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background: var(--darkBlue);
          }
        }
      }
      .submit-spinner {
        height: 40px !important;
      }
    }
  }
  .reply-message {
    position: relative;
    background: #c4f2ff;
    color: var(--darkBlue);
    border-radius: 5px;
    padding: 10px;
    margin-top: 5px;
    .reply-message-header {
      display: grid;
      grid-template-columns: 1fr 70px;
      gap: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--lightGray);
      margin-bottom: 10px;
      .reply-header-name {
        display: flex;
        gap: 5px;
        align-items: center;
      }
      .reply-message-header-createdAt {
        font-size: 0.9em;
        color: var(--darkBlue);
        text-align: right;
        &.remove {
          width: 100%;
          color: var(--blue);
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              color: var(--darkBlue);
            }
          }
        }
      }
    }
  }
`;
