import styled from "styled-components";
export const CancelCompleteStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--lightGray);
  color: var(--darkBlue);
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  padding: 20px;
  .cancel-complete {
    text-align: center;
    max-width: 450px;
    margin: 0 auto;
    img {
      filter: var(--blueFilter);
      display: block;
      margin: 0 auto;
    }
    h2 {
      /* color: white; */
      margin: 10px 0;
    }
    h1,
    .thanks {
      color: var(--blue);
    }
    .cancel-message {
      margin: 20px 0;
    }
    ul {
      text-align: left;
      font-size: 1.1em;
      li {
        list-style: inside;
        margin-bottom: 10px;
      }
    }
    p {
      font-size: 1.1em;
    }
    .cancelation-fee {
      margin: 20px 0 10px 0;
      background: lightgray;
      font-size: 1.1em;
      padding: 10px;
      border-radius: 10px;
      align-items: center;
    }
    .cancelation-fee,
    .refund-info {
      text-align: left;
    }
    .refund-info {
      margin-bottom: 30px;
    }
  }
`;
