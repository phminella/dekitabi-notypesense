import styled from "styled-components";
export const EditProfilePictureStyles = styled.section`
  .profile-picture-wrapper {
    padding: 0;
  }
  .picture-options {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-radius: 10px;
    overflow: hidden;
    margin: 20px 0;
    gap: 2px;
    @media (hover: hover) and (pointer: fine) {
      button:hover {
        filter: brightness(120%);
      }
    }
  }
  .upload-wrapper {
    position: relative;
  }
  .picture-wrapper {
    display: flex;
    align-items: center;
    @media (max-width: 500px) {
      flex-wrap: wrap;
      justify-content: right;
    }
    gap: 10px;
    margin: 20px 0;
    input {
      padding: 10px;
    }
    button {
      padding: 10px;
      background: var(--pink);
      color: white;
      border-radius: 10px;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--darkBlue);
        }
      }
    }
  }
  .error {
    color: #ff2e4a;
    margin-top: -15px;
  }
  .update-photo-button {
    color: var(--blue);
    text-decoration: underline;
  }
`;
