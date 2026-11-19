import styled from "styled-components";
export const NoTourStyles = styled.div`
  position: relative;
  max-width: 600px;
  margin: 120px auto 50px auto;
  background-color: white;
  text-align: center;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  @media (max-width: 600px) {
    margin: 80px 10px 50px 10px;
  }
  padding: 40px 20px;
  border-radius: 10px;
  .wrapper {
    text-align: center;
  }
  h2 {
    margin-top: 30px;
  }
  img {
    max-width: 400px;
    display: block;
    margin: 0 auto;
  }
`;
