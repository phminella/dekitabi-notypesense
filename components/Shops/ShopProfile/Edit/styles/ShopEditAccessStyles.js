import styled from "styled-components";
export const ShopEditAccessStyles = styled.div`
  .subtitle {
    font-size: 0.9em;
    color: gray;
  }
  .mui-input-wrapper {
    display: grid;
    gap: 15px;
    grid-template-columns: 1fr 50px;
    align-items: center;
  }
  .access-button {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 5px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 10px;
    color: var(--blue);
    min-height: 50px;
    font-size: 1.1em;
    img {
      filter: var(--blueFilter);
    }
    &:hover {
      background: var(--darkBlue);
      color: white;
      img {
        filter: var(--whiteFilter);
      }
    }
  }
  &.edit-opening-hours {
    font-size: 0.9em;
    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      @media (max-width: 650px) {
        grid-template-columns: 1fr;
      }
      select {
        padding: 5px;
      }
    }
    .opening-hours-wrapper {
      margin-top: 10px;
      position: relative;
    }
    .opening-hours-input-wrapper {
      justify-content: center;
      grid-template-columns: 30px 80px 30px 80px 20px;
      gap: 10px;
      margin: 0;
    }
    margin-top: 15px;
    .weekday-edit {
      font-weight: 600;
      color: var(--darkBlue);
      font-size: 1.2em;
      margin-bottom: 10px;
    }
    .from {
      text-align: center;
      font-weight: 600;
    }
    input {
      border-color: lightgray;
      padding: 5px;
      text-align: center;
    }
    .access-button {
      width: 25px;
      min-height: 25px;
      box-shadow: none;
    }
    .weekday-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      border: 1px solid lightgray;
      padding: 10px;
      border-radius: 10px;
    }
    .more-schedule {
      width: 100%;
      margin-top: 10px;
      box-shadow: none;
      min-height: 30px;
      text-align: center;
      &:hover {
        background-color: white;
        color: var(--darkBlue);
        img {
          filter: var(--darkBlueFilter);
        }
      }
    }
  }
  .edit-cancellation-policy {
    .mui-input-wrapper {
      grid-template-columns: 1fr 1fr 30px;
      .days-select {
        display: grid;
        grid-template-columns: 100px 1fr;
        gap: 10px;
        align-items: center;
        select {
          text-align: center;
          border-color: lightgray;
        }
        p {
          font-size: 1.2em;
          font-weight: 600;
          color: var(--darkBlue);
          text-align: center;
        }
      }
      button {
        box-shadow: none;
        min-height: 30px;
      }
      @media (max-width: 650px) {
        position: relative;
        grid-template-columns: 1fr;
        .days-select {
          p {
            text-align: left;
          }
        }
        button {
          width: 40px;
          height: 40px;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
  .opening-hours-wrapper {
    margin: 15px 0 10px 0;
    .days,
    .fee {
      text-align: center;
      padding: 10px;
      font-size: 0.9em;
    }
    .days {
      font-weight: 600;
      border-right: 1px solid lightgray;
    }
  }
`;
