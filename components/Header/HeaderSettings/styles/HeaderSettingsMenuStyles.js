import styled from "styled-components";
export const HeaderSettingsMenuStyles = styled.ul`
  display: block !important;
  border-bottom: 1px solid var(--lightGray);
  margin-bottom: 10px;
  li {
    button {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 10px 20px;
      width: 100%;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--lightGray);
        }
      }
    }
    a {
      display: grid;
      grid-template-columns: 1fr 20px;
      align-items: center;
      gap: 5px;
      padding: 10px 20px;
      p {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--lightGray);
        }
      }
    }
  }
`;
