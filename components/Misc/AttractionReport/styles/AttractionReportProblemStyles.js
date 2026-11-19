import styled from "styled-components";
export const AttractionReportProblemStyles = styled.div`
  z-index: 9999;
  .modal-title {
    max-width: 600px;
    background: #ff2e4a;
    border-bottom: 1px solid #f3707e;
    padding: 20px 60px 20px 20px;
    color: white;
    h2 {
      margin: 0 !important;
      max-width: 550px;
      color: white;
    }
  }
  .modal-wrapper {
    padding: 0;
  }
  .modal-body {
    padding: 20px;
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
  .report-button {
    margin-top: 20px;
    display: flex;
    justify-content: right;
    .normal-button {
      height: 40px;
    }
    img {
      filter: var(--blueFilter) !important;
    }
  }
`;
