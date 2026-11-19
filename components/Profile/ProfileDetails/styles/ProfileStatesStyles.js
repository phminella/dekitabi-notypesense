import styled from "styled-components";
export const ProfileStatesStyles = styled.div`
  margin-bottom: 15px;
  h3 {
    font-size: 2em;
  }
  .states {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
    .state {
      background: var(--darkBlue);
      color: white;
      position: relative;
      border-radius: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      z-index: 0;
      padding: 8px 15px;
      text-transform: capitalize;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--blue);
        }
      }
    }
  }
`;
