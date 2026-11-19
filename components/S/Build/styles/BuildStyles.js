import styled from "styled-components";
export const BuildStyles = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  background-color: var(--lightGray);
  border-radius: 15px;
  .title {
    font-size: 2.4em;
    color: var(--pink);
    line-height: 1em;
  }
  .subtitle {
    font-size: 1.3em;
    line-height: 1.2em;
    max-width: 400px;
    margin-bottom: 20px;
    color: var(--darkBlue);
    font-weight: bold;
  }
  .build-wrapper {
    display: grid;
    grid-template-columns: 1fr 450px;
    .build-form {
      border-right: 1px solid lightgray;
      font-weight: 600;
      padding: 20px;
      .mobile-preview {
        display: none;
      }
      input {
        padding: 15px;
        border-radius: 10px;
        border: 1px solid lightgray;
        margin: 5px 0 15px 0;
      }
      .sent {
        height: 50px;
        color: var(--blue);
        display: flex;
        align-items: center;
        gap: 15px;
        border-radius: 5px;
        margin-bottom: 10px;
        img {
          filter: var(--blueFilter);
        }
        p {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .sent-button {
          height: 50px;
          padding: 0 10px;
          background: var(--blue);
          color: white;
          border-radius: 15px;
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background: var(--darkBlue);
              color: white;
            }
          }
        }
      }
      .normal-button {
        width: 100%;
        height: 50px;
        margin-bottom: 10px;
        img {
          filter: none;
        }
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 5px 0 15px 0;
        input {
          display: none;
        }
        label {
          display: block;
          cursor: pointer;
          padding: 15px;
          border-radius: 10px;
          background: lightgray;
          color: gray;
          text-transform: capitalize;
          &.active {
            background: var(--blue);
            color: white;
            @media (hover: hover) and (pointer: fine) {
              &:hover {
                background: var(--blue);
                color: white;
                cursor: default;
              }
            }
          }
          @media (hover: hover) and (pointer: fine) {
            &:hover {
              background: var(--darkBlue);
              color: white;
            }
          }
        }
      }
    }
    .build-preview {
      padding: 20px;
      display: grid;
      align-items: center;
      h3 {
        text-align: center;
        color: var(--darkBlue);
        margin-bottom: 15px;
        font-size: 1.6em;
        font-weight: bold;
      }
    }
    .attraction-marker-wrapper,
    .attraction-options {
      display: none;
    }
    .attraction {
      cursor: default;
      border: 1px solid lightgray;
    }
  }
  .error-message {
    margin-top: -10px;
    margin-bottom: 10px;
  }
  @media (max-width: 1040px) {
    margin: 30px 10px;
    .build-wrapper {
      grid-template-columns: 1fr 350px;
    }
  }
  @media (max-width: 700px) {
    margin: 10px;
    border: none;
    background-color: white;
    .build-wrapper {
      display: block;
      .build-form,
      .build-preview {
        border: none;
        padding: 0;
        .mobile-preview {
          display: block;
          margin-bottom: 15px;
          h3 {
            text-align: center;
            color: var(--darkBlue);
            margin-bottom: 15px;
            font-size: 1.6em;
            font-weight: bold;
          }
        }
      }
      .build-preview {
        display: none;
      }
    }
  }
`;
