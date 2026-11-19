import styled from "styled-components";
export const EditProfileBackgroundResponsiveStyles = styled.div`
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
  .error {
    color: #ff2e4a;
    margin-top: -15px;
  }
  .update-photo-button {
    color: var(--blue);
    text-decoration: underline;
  }
  .bg-options {
    overflow: auto;
    @media (max-width: 750px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 520px) {
      grid-template-columns: 1fr;
    }
  }
`;
