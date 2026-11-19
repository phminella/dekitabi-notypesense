import styled from "styled-components";
export const ItineraryGuidesStyles = styled.div`
  .guide-list-wrapper {
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    width: calc(50vw - 10px);
    height: calc(100vh - 60px);
    background: linear-gradient(135deg, #1a2b49, #4f6ba6);
    z-index: 3;
    margin-top: 60px;
    padding: 10px 0 30px 0;
    overflow-y: auto;
    box-shadow: -8px 0 12px -4px rgba(0, 0, 0, 0.3);
    @media (min-width: 620px) {
      border-left: 5px solid white;
    }
    @media (max-width: 1000px) {
      width: 60vw;
    }
    @media (max-width: 800px) {
      width: 80vw;
    }
    @media (max-width: 620px) {
      width: 100%;
    }
    .close-guide-list {
      position: fixed;
      top: 70px;
      right: 30px;
      background: linear-gradient(135deg, #1a2b49, #4f6ba6);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 450px) {
        right: 10px;
      }
      img {
        filter: var(--whiteFilter);
      }
      z-index: 2;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--darkBlue);
        }
      }
    }
  }
`;
