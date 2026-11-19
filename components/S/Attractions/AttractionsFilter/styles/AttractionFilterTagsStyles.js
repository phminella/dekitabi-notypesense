import styled, { keyframes } from "styled-components";
const jump = keyframes`
0%   { transform: scale(1,1)      translateY(0); }
        10%  { transform: scale(1.1,.8)   translateY(0); }
        30%  { transform: scale(.8,1.1)   translateY(-5px); }
        50%  { transform: scale(1.05,.95) translateY(0); }
        57%  { transform: scale(1,1)      translateY(-2px); }
        64%  { transform: scale(1,1)      translateY(0); }
        100% { transform: scale(1,1)      translateY(0); }`;
export const AttractionFilterTagsStyles = styled.div`
  position: relative;
  width: calc(100% - 30px);
  @media (max-width: 1200px) {
    width: 100%;
  }
  margin: 10px auto;
  border-radius: 10px;
  overflow: hidden;
  .scroll-container {
    position: relative;
    display: flex;
    gap: 5px;
    cursor: grab;
    width: calc(100% - 60px);
    margin: 0 30px;
  }
  .tag-button {
    position: relative;
    display: block;
    border-radius: 15px;
    letter-spacing: 0.5px;
    width: 65px;
    height: 65px;
    text-transform: capitalize;
    transition: all 0.2s ease-in-out;
    font-size: 0.8em;
    color: var(--darkBlue);
    img {
      filter: var(--darkBlueFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        animation: ${jump} 1s infinite;
      }
    }
  }
  .tag-button.active {
    background: var(--darkBlue);
    color: white;
    transform: translateY(0) !important;
    transform: scale(1) !important;
    img {
      filter: var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        transform: translateY(0) !important;
        transform: scale(1) !important;
      }
    }
  }
`;
