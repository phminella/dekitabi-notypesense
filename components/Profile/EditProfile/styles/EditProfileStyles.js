import styled from "styled-components";
export const EditProfileStyles = styled.div`
  position: absolute;
  section {
    margin-bottom: 40px;
  }
  .sub-title {
    margin-top: 10px;
    color: gray;
  }
  .title {
    position: relative;
    margin: 10px 0 10px 0;
    h3 {
      margin-right: 35px;
    }
    span {
      font-size: 0.8em;
      color: lightgray;
    }
    button {
      position: absolute;
      top: 0;
      right: 0;
      text-align: right;
      color: var(--blue);
      font-size: 1.1em;
      text-decoration: underline;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
  .modal-wrapper {
    padding: 0;
  }
  .edit-profile-content {
    max-height: 500px;
    padding: 0 20px;
    overflow: auto;
    @media (max-width: 480px) {
      padding: 0 15px;
    }
  }
  .edit-buttons {
    text-align: right;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 5px;
    button {
      padding: 10px;
      background: var(--blue);
      color: white;
      border-radius: 10px;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--darkBlue);
        }
      }
    }
  }
`;
