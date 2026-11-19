import styled from "styled-components";
export const ActivityEditStringStyles = styled.div`
  position: relative;
  margin-bottom: 15px;
  .edit-information-button {
    top: -10px;
    right: 0;
  }
  .profile-field {
    padding-right: 60px;
    font-size: 1.2em;
    font-weight: 600;
    color: var(--darkBlue);
    margin-bottom: 5px;
  }
  .profile-value {
    /* white-space: pre-line; */
    line-height: 1.5em;
    max-height: 4.5em;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 55px;
    /* white-space: pre-wrap; */
  }
  form {
    margin-top: 15px;
    .edit-description {
      textarea {
        resize: vertical;
        width: 100%;
        max-width: 100%;
        height: 200px;
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
  }
  .languages {
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .badge {
        display: flex;
        align-items: center;
        gap: 5px;
        text-transform: capitalize;
        background: var(--lightGray);
        border-radius: 5px;
        padding: 10px;
      }
    }
  }
  .react-select__input-container {
    font-size: 30px !important;
    font-family: inherit !important;
  }
  .react-select__menu {
    z-index: 3;
  }
  &.edit-persons {
    select {
      border: 1px solid lightgray;
    }
    .edit-persons-form {
      display: grid;
      grid-template-columns: 100px 100px 1fr;
      gap: 10px;
      align-items:last baseline;
      margin: 0;
      @media(max-width:450px) {
        grid-template-columns:1fr;
      }
      .edit-buttons {
        flex-direction: row-reverse;
        justify-content: left;
        button {
          height:45px;
        }
      }
    }
  }
`;
