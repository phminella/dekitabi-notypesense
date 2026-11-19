import styled from "styled-components";
export const ActivityCancelStyles = styled.div`
  position: relative;
  max-width: 600px;
  max-height: 520px;
  overflow: auto;
  padding: 20px;
  margin: 0 auto;
  .cancel-title {
    background: #ff2e4a;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    padding: 10px;
    h1 {
      color:white;
      line-height: 1.4em;
    }
    p {
      font-size: 1.2em;
      color: white;
    }
  }
  .cancellation-fee {  
    a {
      color:var(--blue);
      text-decoration:underline;
      &:hover {
        color:var(--darkBlue);
      }
    }
  }
  ul {
    border: 1px solid lightgray;
    border-top: none;
    padding: 15px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
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
    .normal-button {
      background: #ff2e4a;
      height:50px;
      &:hover {
        background:var(--darkBlue);
      }
      img {
        filter: none;
      }
    }
  }
`;
