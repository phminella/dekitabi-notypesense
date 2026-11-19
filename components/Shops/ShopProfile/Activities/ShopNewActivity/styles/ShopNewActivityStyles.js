import styled from "styled-components";
export const ShopNewActivityStyles = styled.div`
  .new-activity-title {
    font-size: 2em;
    font-weight: 700;
    color: var(--darkBlue);
    text-align: center;
  }
  .new-activity-info-wrapper {
    display: flex;
    gap: 7px;
    background-color: var(--lightGray);
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 10px;
    margin: 20px 0;
  }
  .new-activity-info {
    span {
      color: var(--pink);
      text-decoration: underline;
    }
  }
  label {
    color: var(--darkBlue);
    font-weight: 600;
    font-size: 1.1em;
  }
  .input-wrapper {
    margin: 5px 0 20px 0;
  }
  input {
    border: 1px solid lightgray;
    padding: 0 10px;
    height: 50px;
    border-radius: 10px;
  }
  .normal-button {
    width: 100%;
    height: 50px;
    font-size: 1.1em;
    img {
      filter: none;
    }
  }
`;
