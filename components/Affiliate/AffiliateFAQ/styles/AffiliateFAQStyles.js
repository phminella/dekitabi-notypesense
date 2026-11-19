import styled from "styled-components";
export const AffiliateFAQStyles = styled.div`
  max-width: 800px;
  margin: 0 auto;
  color: var(--darkBlue);
  font-size: 1.2em;
  padding: 0 10px;
  .title {
    text-align: center;
    font-size: 3em;
    font-weight: bold;
    color: var(--darkBlue);
    margin: 45px 0 15px 0;
  }
  .faq-tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
    button {
      border: 2px solid var(--darkBlue);
      color: var(--darkBlue);
      padding: 10px 15px;
      border-radius: 20px;
      font-weight: 600;
      &.active {
        background: var(--darkBlue);
        color: white;
      }
    }
  }
  .wrapper {
    border-bottom: 1px solid lightgray;
    padding: 15px 0;
  }
  .question {
    position: relative;
    font-weight: 700;
    cursor: pointer;
    padding-right: 30px;
    img {
      position: absolute;
      right: 5px;
      top: 5px;
    }
    &.showed {
      img {
        transform: rotate(180deg);
      }
    }
  }
  .answer {
    max-height: 0;
    overflow: hidden;
    span {
      color: var(--pink);
      font-weight: 600;
    }
    &.show {
      max-height: 500px;
      padding-top: 15px;
    }
  }
`;
