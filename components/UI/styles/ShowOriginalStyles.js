import styled from "styled-components";
export const ShowOriginalStyles = styled.div`
  background: var(--lightGray);
  padding: 15px 10px;
  margin-bottom: 10px;
  button {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
`;
