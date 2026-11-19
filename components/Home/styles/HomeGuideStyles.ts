import styled from "styled-components";
export const HomeGuideStyles = styled.div`
  margin-top: 30px;
  @media (max-width: 1250px) {
    margin: 26px 0;
  }
  width: 100%;
  display: flex;
  align-items: center;
  img {
    filter: var(--whiteFilter);
  }
  .guide-wrapper {
    width: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    gap: 10px;
    position: relative;
    /* flex-wrap: wrap; */
    @media (max-width: 450px) {
      display: flex;
      flex-wrap: wrap;
    }
    a,
    button {
      color: white;
      background: var(--blue);
      border-radius: 20px;
      padding: 5px 5px;
      height: 65px;
      text-align: center;
      font-size: 1.2em;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      justify-content: center;
      align-items: center;
      width: 100%;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--pink);
        }
      }
    }
  }
`;
