import styled from "styled-components";
export const ContactUsStyles = styled.div`
  padding: 50px 0;
  .order-background {
    z-index: -1;
  }
  .contact-wrapper {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    background: white;
    @media (max-width: 600px) {
      margin: 0 10px;
    }
    .contact-header {
      max-width: 500px;
      border-bottom: 1px solid lightgray;
      padding-bottom: 15px;
      margin-bottom: 15px;
      .sub-title {
        margin-top: 10px;
      }
    }
    textarea {
      resize: none;
      width: 100%;
      max-width: 100%;
      height: 90px;
      padding: 10px;
      border: none;
      border-radius: 10px;
      background: #f6f8fa;
      width: 100%;
      transition: background-color 0.2s ease-in-out;
      &:focus {
        outline: none;
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: #e8e8e8;
        }
      }
      &::placeholder {
        color: #262626 !important;
      }
    }
    .reason-counter {
      font-size: 0.9em;
      line-height: 0.9em;
      text-align: right;
    }
    .normal-button {
      margin-top: 10px;
      width: 100%;
      height: 50px;
    }
    .sent {
      margin-top: 10px;
      background: #d7f7c2;
      color: #006908;
      padding: 5px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 600;
      font-size: 0.9em;
      svg {
        filter: invert(21%) sepia(93%) saturate(1725%) hue-rotate(116deg)
          brightness(90%) contrast(107%);
      }
    }
  }
  .return-msg {
    margin-top: 20px;
  }
`;
