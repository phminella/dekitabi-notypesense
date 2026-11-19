import styled from "styled-components";
export const ReviewAlreadyCompletedStyles = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 50px 0;
  position: relative;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  @media (max-width: 600px) {
    margin: 50px 10px;
  }
  .review-already-completed-wrapper {
    border-radius: 10px;
    text-align: center;
    overflow: hidden;
    .logo {
      background: white;
      padding: 10px;
    }
    h2 {
      padding: 20px;
      word-break: break-all;
    }
    img {
      margin: 0 auto;
    }
  }
`;
