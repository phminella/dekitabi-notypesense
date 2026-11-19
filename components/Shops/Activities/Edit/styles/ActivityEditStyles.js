import styled from "styled-components";
export const ActivityEditStyles = styled.div`
  .modal-wrapper {
    min-width: 500px;
    @media (max-width: 540px) {
      min-width: 0;
    }
  }
  .edit-buttons {
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 10px;
    padding: 15px 0;
  }
  .profile-title {
    font-size: 1.7em;
    color: var(--darkBlue);
    font-weight: 700;
    margin-bottom: 20px;
  }
  .profile-subtitle {
    color: gray;
    font-size: 0.9em;
    margin-bottom: 20px;
  }
  .link,
  a {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
  .delete-activity-button {
    width: 100%;
    padding: 15px;
    background: #fa4157;
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 1.1em;
    margin-top: 30px;
    img {
      filter: var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: #ff2e4a;
      }
    }
  }
`;
