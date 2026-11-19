import styled from "styled-components";
export const ConfirmCompleteStyles = styled.div`
  position: relative;
  max-width: 600px;
  @media (max-width: 600px) {
    margin: 20px 10px;
  }
  margin: 120px auto 50px auto;
  background: var(--lightGray);
  color: var(--darkBlue);
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  padding: 20px;
  .confirm-complete {
    height: 100%;
    width: 100%;
    h2 {
      text-align: center;
      &.thank-you {
        color: var(--blue);
      }
    }
    img {
      filter: var(--blueFilter);
      display: block;
      margin: 0 auto;
    }
    ul {
      text-align: left;
      max-width: 450px;
      margin: 30px auto;
      font-size: 1.1em;
      li {
        list-style: inside;
        margin-bottom: 10px;
      }
    }
  }
`;
