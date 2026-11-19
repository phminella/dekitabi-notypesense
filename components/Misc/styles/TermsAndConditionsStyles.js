import styled from "styled-components";
export const TermsAndConditionsStyles = styled.div`
  max-width: 1000px;
  margin: 120px auto 50px auto;
  min-height: 350px;
  font-size: 1.1em;
  @media (max-width: 1000px) {
    margin: 20px 10px;
  }
  b {
    color: var(--darkBlue);
  }
  h1,
  h2,
  h3 {
    margin: 20px 0;
  }
  p {
    margin-bottom: 10px;
  }
  a {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
  .only-english {
    padding: 20px 10px;
    border-left: 5px solid lightgray;
  }
  li {
    list-style: outside;
    padding: 5px 0;
  }
`;
