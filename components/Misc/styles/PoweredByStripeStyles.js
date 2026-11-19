import styled from "styled-components";
export const PoweredByStripeStyles = styled.div`
  /* border: 2px solid lightgray; */
  background-color: var(--lightGray);
  margin-top: 15px;
  padding: 15px 15px 10px 15px;
  border-radius: 10px;
  h2 {
    margin: 0 0 6px 0 !important;
    line-height: 1.2em;
  }
  .subtitle {
    font-size: 1.3em;
    font-weight: bold;
    color: var(--darkBlue);
  }
  a {
    color: var(--blue);
    text-decoration: underline;
  }
  .companies {
    @media (max-width: 600px) {
      text-align: center !important;
    }
    svg {
      margin: 10px 0;
    }
  }
`;
