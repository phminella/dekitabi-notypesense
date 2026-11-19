import styled from "styled-components";
export const EditFeeStyles = styled.section`
  .sub-title {
    margin-top: -10px;
    margin-bottom: 10px;
    font-size: 0.9em;
    color: gray;
  }
  b {
    color: var(--darkBlue);
  }
  a {
    color:var(--blue);
    text-decoration: underline;
  }
  .fee-edit {
    width: 100%;
    .fee-edit-options {
      margin: 10px 0;
    }
    .checkbox-label {
      display: flex;
      gap: 10px;
      background: var(--lightGray);
      padding: 10px;
      border-radius: 10px;
      text-align: center;
      input {
        width: 20px;
        height: 20px;
        &[type="checkbox"] {
          accent-color: var(--pink);
        }
      }
    }
  }
  .mui-input-wrapper {
    position: relative;
    input {
      padding-left: 25px;
    }
    span {
      position: absolute;
      top: 26px;
      left: 12px;
      z-index: 1;
      font-size: 1.2em;
      color: gray;
    }
  }
  ul li {
    display: grid;
    grid-template-columns: 80px 1fr;
    align-items: center;
    font-size: 0.8em;
    span {
      font-size: 1.3em;
      color: var(--pink);
      font-weight: 600;
    }
  }
`;
