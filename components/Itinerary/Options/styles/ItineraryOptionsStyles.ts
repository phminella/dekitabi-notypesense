import styled from "styled-components";
export const ItineraryOptionsStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  h2 {
    margin-bottom: 15px;
  }
  .toolbar-button {
    padding: 10px 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--lightGray);
    gap: 5px;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
        color: white;
        img {
          filter: var(--whiteFilter);
        }
      }
    }
    &.active {
      background: var(--blue);
      cursor: default;
      color: white;
      img {
        filter: var(--whiteFilter);
      }
    }
  }
  .hide-modal {
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
    visibility: hidden;
    margin-top: -100%;
  }
  .show-modal {
    transition: opacity 0.2s ease-in-out;
    margin-top: 0;
    visibility: visible;
    opacity: 1;
  }
`;
