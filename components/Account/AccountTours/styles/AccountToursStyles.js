import styled from "styled-components";
export const AccountToursStyles = styled.div`
  max-width: 1000px;
  margin: 120px auto 50px auto;
  min-height: 300px;
  .loading-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    color: var(--blue);
    .loading-wrapper {
      text-align: center;
      padding: 20px;
      border-radius: 10px;
      background: white;
    }
    .progress-default-message {
      font-size: 1.3em;
      font-weight: 600;
    }
    .progress {
      height: 4.5px;
      width: 245.6px;
      background: linear-gradient(var(--blue) 0 0),
        linear-gradient(var(--blue) 0 0), #dbdcef;
      background-size: 60% 100%;
      background-repeat: no-repeat;
      animation: progress-7x9cg2 3s infinite;
      margin: 20px auto;
    }
    @keyframes progress-7x9cg2 {
      0% {
        background-position: -150% 0, -150% 0;
      }

      66% {
        background-position: 250% 0, -150% 0;
      }

      100% {
        background-position: 250% 0, 250% 0;
      }
    }
    .loading-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      opacity: 0.9;
      z-index: -1;
    }
  }
  .modal-wrapper {
    padding: 0 !important;
  }
  .page-header {
    .breadcrumbs {
      font-size: 1.1em;
      display: flex;
      gap: 15px;
      @media (hover: hover) and (pointer: fine) {
        a:hover {
          color: var(--pink);
        }
      }
    }
    .title {
      margin-top: 10px;
    }
    .sub-title {
      font-size: 0.9em;
      margin-bottom: 30px;
      color: gray;
    }
  }
  .tours-section {
    position: relative;
    h2,
    .no-tours {
      margin-bottom: 20px;
      margin-top: 20px;
    }
    li {
      margin-bottom: 10px;
    }
  }
  .create-tour {
    margin-top: 30px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    border: 1px solid var(--darkBlue);
    max-width: 400px;
    text-align: center;
    p {
      font-weight: 600;
    }
    a {
      max-width: 300px;
      margin: 10px auto;
    }
  }
  .show-more-wrapper {
    display: flex;
    justify-content: center;
    .show-more {
      border: 1px solid lightgray;
      height: 58px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border-radius: 10px;
      padding: 10px;
      font-size: 1.1em;
      margin: 0 auto;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--lightGray);
        }
      }
    }
  }
  .close-icon {
    background: none !important;
  }
  .loading-more {
    display: flex;
    justify-content: center;
  }
  .not-found {
    padding: 0;
    justify-content: left;
    h3 {
      text-align: left;
    }
    img {
      max-width: 150px;
    }
  }
`;
