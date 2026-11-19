import styled from "styled-components";
export const PricePerPersonStyles = styled.div`
  max-width: 800px;
  margin: 120px auto 50px auto;
  @media (max-width: 800px) {
    margin: 20px 10px;
  }
  .person-alert {
    margin-bottom: 25px;
    display: flex;
    gap: 10px;
    background-color: var(--lightGray);
    border-radius: 10px;
    padding: 10px;
    color: var(--blue);
    img {
      filter: var(--blueFilter);
    }
  }
  h2 {
    margin-bottom: 15px;
  }
  .example-data {
    margin: 30px 0;
  }
  ul {
    margin: 10px 0;
    li {
      border: 1px solid lightgray;
      border-bottom: none;
      padding: 5px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      &:last-child {
        border-bottom: 1px solid lightgray;
      }
    }
  }
`;
