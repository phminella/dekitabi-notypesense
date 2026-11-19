import styled, { keyframes } from "styled-components";
const fadeIn = keyframes`
from { opacity: 0; }
    to   { opacity: 1; }`;
export const WithLoadStyles = styled.div`
  animation: ${fadeIn} 1.5s;
`;
