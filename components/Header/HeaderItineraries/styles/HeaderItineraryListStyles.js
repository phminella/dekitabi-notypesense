import styled from "styled-components";
export const HeaderItineraryListStyles = styled.div`
  position: relative;
  max-height: 250px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 3px;
  }
  .placeholder {
    margin-bottom: 10px;
  }
`;
