import styled from "styled-components";
export const ShareButtonsStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  svg {
    /* transform: scale(0); */
    transition: all 0.2s ease-in-out;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;
