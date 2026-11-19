import styled from "styled-components";
export const ItineraryNotesStyles = styled.div`
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0 20px 0;
  .notes-title {
    position: relative;
    margin-bottom: 10px;
    button {
      position: absolute;
      top: 0;
      right: 0;
      color: var(--blue);
      text-decoration: underline;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
  p {
    white-space: pre-wrap;
    font-size: 1.2em;
    text-align: justify;
  }
  form {
    textarea {
      resize: none;
      width: 100%;
      max-width: 100%;
      height: 100px;
      border-radius: 5px;
      padding: 10px;
      border: none;
      background: white;
      border: 1px solid lightgray;
      &:focus {
        outline: none;
      }
    }
    .char-remaining {
      font-size: 0.8em;
      text-align: right;
      color: gray;
    }
    .edit-buttons {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: right;
      gap: 10px;
    }
  }
`;
