import styled from "styled-components";
export const ReviewExistsStyles = styled.div`
  background: url("/img/no-attractions/bg.webp");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px 0;
  .review-exists-wrapper {
    max-width: 100lvh;
    margin: 120px auto 120px auto;
    padding: 20px;
    border-radius: 10px;
    background: white;
    @media (max-width: 600px) {
      margin: 120px 10px;
    }
  }
`;
