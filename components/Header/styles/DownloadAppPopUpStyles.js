import styled from "styled-components";
export const DownloadAppPopUpStyles = styled.div`
  .modal-wrapper {
    position: relative;
    padding: 0 !important;
    max-width: 750px !important;
    display: grid;
    grid-template-columns: 250px 1fr;
    margin: 0 10px;
  }
  .background-wrapper {
    min-width: 250px;
    min-height: 200px;
    position: relative;
    .apps-bg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 4;
      width: 100%;
      height: 100%;
      display: none;
      align-items: center;
      justify-content: center;
      @media (hover: hover) and (pointer: fine) {
        display: flex;
      }
      .apps {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
      }
    }
  }
  .content-wrapper {
    width: 100% !important;
    padding: 45px;
    background: var(--darkBlue);
    color: white;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      h2 {
        font-size: 2em;
        line-height: 1.3em;
        color: var(--pink);
      }
      .app-icon {
        background: var(--darkBlue);
        border: 3px solid var(--blue);
        height: 60px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border-radius: 10px;
      }
    }
    .qr-code {
      border-radius: 15px;
    }
    .message {
      margin-top: 20px;
      text-align: center;
      h3 {
        margin-bottom: 15px;
        color: white;
      }
      .apps {
        display: block;
        @media (hover: hover) and (pointer: fine) {
          display: none;
        }
      }
    }
  }
  @media (max-width: 670px) {
    .modal-wrapper {
      grid-template-columns: 1fr;
    }
    .content-wrapper {
      padding: 20px;
    }
  }
  @media (max-width: 600px) {
    .background-wrapper {
      min-width: 50px;
    }
    .qr-code {
      width: 100px;
      height: 100px;
    }
  }
  @media (max-width: 400px) {
    .qr-code {
      display: none;
    }
    h2 {
      font-size: 1.3em;
    }
  }
`;
