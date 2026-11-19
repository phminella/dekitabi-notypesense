import styled from "styled-components";
export const NoAttractionsMapStyles = styled.div`
  position: absolute;
  bottom: -100%;
  left: 50%;
  margin: 0 auto;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 280px;
  border-radius: 20px;
  overflow: hidden;
  transition: bottom 0.3s ease-in-out;
  background: rgba(255, 255, 255, 0.8) !important;
  padding: 10px;
  text-align: center;
  &.show {
    bottom: 50%;
  }
  h2 {
    margin: 0 10px !important;
  }
  img {
    width: 80px;
    margin: 0 auto;
  }
`;
