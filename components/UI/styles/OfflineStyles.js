import styled from "styled-components";
export const OfflineStyles = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: var(--darkBlue);
  width: 100%;
  .offline-wrapper {
    text-align: center;
    img {
      margin-bottom: 15px;
    }
    .offline {
      padding: 20px;
      border-radius: 10px;
      background: #ff2e4a;
      color: white;
      margin: 0 10px;
      h2 {
        color: white;
      }
    }
  }
`;
