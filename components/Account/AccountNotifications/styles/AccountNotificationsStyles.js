import styled from "styled-components";
export const AccountNotificationsStyles = styled.div`
  margin: 120px auto 50px auto;
  max-width: 1000px;
  @media (max-width: 1000px) {
    margin: 30px 10px;
  }
  .page-header {
    .breadcrumbs {
      font-size: 1.2em;
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
      @media (max-width: 830px) {
        margin-bottom: 20px;
      }
    }
  }
  .notifications {
    .checkbox-wrapper {
      padding: 0 10px 10px 10px;
    }
    .normal-button {
      min-width: 200px;
      height: 50px;
      .spinner {
        filter: none;
      }
    }
    .notifications-info {
      max-width: 400px;
      margin: 0 0 20px 0;
      color: var(--darkBlue);
    }
  }
`;
