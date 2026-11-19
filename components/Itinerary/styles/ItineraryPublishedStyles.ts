import styled from "styled-components";
export const ItineraryPublishedStyles = styled.div`
  position: fixed;
  top: -100px;
  opacity: 0;
  visibility: hidden;
  right: 0;
  left: 0;
  margin: 0 auto;
  z-index: 9999;
  transition: all 0.5s ease-in-out;
  max-width: 300px;
  a {
    background: var(--blue);
    color: white;
    padding: 20px;
    border-radius: 10px;
    font-size: 1.1em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: white;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
        color: white;
      }
    }
  }
  img {
    filter: var(--whiteFilter);
  }
  &.show {
    top: 80px;
    opacity: 1;
    visibility: visible;
  }
`;
