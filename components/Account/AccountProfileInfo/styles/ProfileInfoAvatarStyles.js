import styled from "styled-components";
export const ProfileInfoAvatarStyles = styled.div`
  display: flex;
  justify-content: center;
  .update-photo-button {
    width: 150px;
    text-align: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
  .picture-options {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    @media (max-width: 400px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    border-radius: 10px;
    overflow: hidden;
    margin: 20px 0;
    gap: 2px;
    @media (hover: hover) and (pointer: fine) {
      button:hover {
        filter: brightness(120%);
      }
    }
    button {
      position: relative;
      height: 100px;
    }
  }
  .picture-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
    input {
      padding: 10px;
    }
    button {
      position: relative;
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
`;
