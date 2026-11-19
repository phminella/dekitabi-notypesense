import styled from "styled-components";
export const ActivityBookCompletedStyles = styled.section`
  margin-bottom: 30px;
  h1 {
    text-align: center;
  }
  .order-id {
    font-size: 1.6em;
    color: var(--pink);
    font-weight: 600;
    text-align: center;
  }
  .check-item {
    filter: var(--darkBlueFilter);
  }
  .link {
    display: block;
    color: var(--blue);
    text-decoration: underline;
    text-align: center;
    font-size: 1.1em;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
  .completed-list {
    max-width: 500px;
    margin: 20px auto;
    li {
      display: flex;
      gap: 8px;
      font-size: 1.2em;
      padding: 5px 0;
      &:last-child {
        padding-bottom: 0;
      }
      .circle {
        margin-top: 6px;
        width: 10px;
        height: 10px;
        background-color: var(--pink);
        border-radius: 50%;
        flex-shrink: 0;
      }
    }
  }
`;
