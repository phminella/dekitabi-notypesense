import styled from "styled-components";
export const ShopDetailsStyles = styled.div`
  .map {
    position: relative;
    width: 100%;
    height: 350px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 15px;
  }
  .shop-detail {
    width: 100%;
    position: relative;
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 10px;
    align-items: center;
    margin-bottom: 15px;
    font-size: 1.1em;
    @media (max-width: 530px) {
      grid-template-columns: 1fr;
    }
    .label {
      text-align: center;
      background-color: #ececec;
      font-weight: 600;
      padding: 15px;
      justify-content: center;
      border-radius: 10px;
      height: 100%;
    }
    .value {
      li {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 5px;
        &:last-child {
          margin: 0;
        }
      }
    }
  }
`;
