import styled from "styled-components";
export const ItineraryLoaderStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  z-index: 9999 !important;
  background: var(--darkBlue);
  color: var(--blue);
  font-size: 1.4em;
  font-weight: 700;
  opacity: 0;
  visibility: hidden;
  font-family: "Poppins";
  &.show {
    opacity: 1;
    visibility: visible;
  }
  .loader-text {
    text-align: center;
  }
  .loading-bar {
    margin-top: 10px;
    height: 40px;
    width: 100%;
    border: 3px solid var(--blue);
    border-radius: 10px;
    background: linear-gradient(to left, var(--darkBlue) 50%, var(--blue) 50%);
    background-size: 0% 100%;
    background-position: left right;
    transition: all 2s ease-in;
    background-repeat: no-repeat;
  }
`;
