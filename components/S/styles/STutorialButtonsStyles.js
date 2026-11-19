import styled from "styled-components";
export const STutorialButtonsStyles = styled.div`
  display: flex;
  justify-content: right;
  gap: 10px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid lightgray;
  .skip-button {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
`;
