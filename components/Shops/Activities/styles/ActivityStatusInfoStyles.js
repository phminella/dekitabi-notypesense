import styled from "styled-components";
export const ActivityStatusInfoStyles = styled.div`
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  section {
    border-radius: 10px;
    background-color: var(--lightGray);
    margin: 0 10px;
  }
  .msg {
    font-size: 1.3em;
    font-size: 600;
    color: var(--darkBlue);
    text-align: center;
    margin: 30px 0;
  }
  img {
    filter: var(--darkBlueFilter);
  }
`;
