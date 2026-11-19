import styled from "styled-components";
export const CancelTourStyles = styled.div`
  background: url("/img/no-attractions/bg.webp");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px 0;
  .cancel-wrapper {
    position: relative;
    max-width: 100vw;
    margin: 0 auto 0 auto;
    border-radius: 20px;
    background: white;
    max-width: 600px;
    @media (max-width: 600px) {
      margin: 0 10px;
    }
    overflow: hidden;
  }
`;
