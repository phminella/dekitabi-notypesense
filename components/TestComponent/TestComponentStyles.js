import styled from "styled-components";
export const TestComponentStyles = styled.div`
  padding: 20px;
  .attraction {
    position: relative;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    .prefecture {
      font-size: 1.1em;
      font-weight: bold;
    }
    .tags {
      display: flex;
      align-items: center;
      gap: 5px;
      .tag {
        background: var(--blue);
        color: white;
        padding: 3px 2px;
        border-radius: 5px;
      }
    }
    .duration {
      position: absolute;
      right: 5px;
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }
`;
