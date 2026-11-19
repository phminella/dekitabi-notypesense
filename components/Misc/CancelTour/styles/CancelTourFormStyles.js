import styled from "styled-components";
export const CancelTourFormStyles = styled.div`
  .modal-title {
    max-width: 600px;
    background: #ff2e4a;
    border-bottom: 1px solid #f3707e;
    padding: 20px 60px 20px 20px;
    color: var(--darkBlue);
    h2 {
      margin: 0 !important;
      max-width: 550px;
      color: #fff;
    }
    a {
      color: white;
      text-decoration: underline;
    }
    .cancelation-msg {
      color: white;
    }
  }
  .modal-body {
    position: relative;
    max-width: 600px;
    max-height: 520px;
    overflow: auto;
    padding: 20px;
    h3 {
      margin-bottom: 10px;
    }
    .signin-to-cancel {
      margin-bottom: 15px;
    }
    ul {
      border: 1px solid lightgray;
      padding: 15px;
      border-radius: 10px;
      display: block !important;
      li {
        display: flex;
        justify-content: left;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        input[type="radio"] {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
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
        &:focus {
          outline: none;
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
    }
    .cancel-buttons {
      margin-top: 20px;
      display: flex;
      justify-content: right;
      .cancel-button-spinner {
        img {
          filter: var(--whiteFilter);
        }
      }
    }
  }
`;
