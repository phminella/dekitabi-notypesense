import styled from "styled-components";
export const HomePromotionStyles = styled.section`
  margin-top: 30px;
  h2,
  h3 {
    text-align: center;
    @media (max-width: 1000px) {
      text-align: left;
      padding: 0 10px;
    }
  }
  .home-title {
    margin-bottom: 0 !important;
    margin-right: 0 !important;
    font-size: 4em !important;
  }
  h3 {
    margin-bottom: 20px;
    font-size: 2.5em;
  }
  .promotion-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
    .promotion {
      position: relative;
      min-height: 400px;
      display: flex;
      padding: 10px;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      overflow-wrap: break-word;
      overflow: hidden;
      &:hover {
        filter: brightness(120%);
      }
      .name {
        font-size: 4em;
        @media (max-width: 1300px) and (min-width: 1200px) {
          font-size: 3em;
        }
        @media (max-width: 800px) and (min-width: 600px) {
          font-size: 3em;
        }
        @media (max-width: 380px) {
          font-size: 3em;
        }
        text-transform: capitalize;
        color: white;
        overflow-wrap: break-word;
        overflow: hidden;
      }
    }
  }
`;
