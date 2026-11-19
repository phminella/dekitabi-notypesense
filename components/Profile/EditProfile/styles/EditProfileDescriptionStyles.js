import styled from "styled-components";
export const EditProfileDescriptionStyles = styled.section`
  .description {
    white-space: pre-line;
  }
  .description-edit {
    textarea {
      resize: none;
      width: 100%;
      max-width: 100%;
      height: 100px;
      border-radius: 5px;
      padding: 10px;
      border: 1px solid lightgray;
      background: var(--lightGray);
      &:focus {
        outline: none;
        border: 1px solid darkgray;
      }
    }
    .description-counter {
      font-size: 0.9em;
      line-height: 0.9em;
      text-align: right;
    }
  }
`;
