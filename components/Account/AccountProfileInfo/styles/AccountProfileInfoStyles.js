import styled from "styled-components";
export const AccountProfileInfoStyles = styled.div`
  margin: 120px auto 50px auto;
  max-width: 1000px;
  @media (max-width: 1000px) {
    margin: 30px 10px;
  }
  .page-header {
    .breadcrumbs {
      font-size: 1.2em;
      display: flex;
      gap: 15px;
      @media (hover: hover) and (pointer: fine) {
        a:hover {
          color: var(--pink);
        }
      }
    }
    .title {
      margin-top: 10px;
    }
    .sub-title {
      font-size: 0.9em;
      margin-bottom: 50px;
      color: gray;
      @media (max-width: 830px) {
        margin-bottom: 20px;
      }
    }
  }
  .input-wrapper {
    margin: 20px 0;
    &.input-name {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      label {
        color: var(--darkBlue);
      }
      input {
        text-transform: capitalize;
        padding: 10px;
      }
    }
  }
  .title {
    position: relative;
    margin: 20px 0 10px 0;
    span {
      font-size: 0.8em;
      color: lightgray;
    }
    button {
      position: absolute;
      top: 10px;
      right: 0;
      text-align: right;
      color: var(--blue);
      text-decoration: underline;
      font-size: 1.1em;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--darkBlue);
        }
      }
    }
  }
  .edit-profile-content {
    max-height: 70vh;
    padding: 0 20px;
    overflow: auto;
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
  .profile-info-wrapper {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 50px;
    @media (max-width: 830px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    h3 {
      margin: 10px 0 15px 0;
    }
    .normal-button {
      width: 100%;
      margin-top: 20px;
      padding: 20px;
      font-size: 1.1em;
    }
    .personal-info-msg {
      border: 1px solid var(--lightGray);
      border-radius: 10px;
      padding: 15px;
      @media (max-width: 830px) {
        grid-row: 1;
        padding: 10px;
      }
      .personal-info-detail {
        margin-bottom: 20px;
        p {
          font-size: 1.1em;
          color: gray;
        }
      }
    }
  }
`;
