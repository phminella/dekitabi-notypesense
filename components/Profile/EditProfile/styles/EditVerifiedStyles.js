import styled from "styled-components";
export const EditVerifiedStyles = styled.section`
  .verified {
    filter: invert(66%) sepia(76%) saturate(1411%) hue-rotate(44deg)
      brightness(105%) contrast(102%);
  }
  .licensed {
    filter: invert(56%) sepia(98%) saturate(1398%) hue-rotate(152deg)
      brightness(100%) contrast(108%);
  }
  .sub-title {
    margin-top: -12px;
    font-size: 0.9em;
    color: gray;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px;
  }
  .verified-licensed {
    .upload-complete {
      margin-top: 20px;
      h4,
      p {
        color: #03c03c;
      }
    }
    .expired,
    .checking {
      margin-top: 20px;
      border-radius: 10px;
      background: #ff4d4d;
      padding: 10px;
      border-radius: 10px;
      display: flex;
      align-items: start;
      gap: 10px;
      color: white;
      img {
        filter: var(--whiteFilter);
      }
    }
    .checking {
      background: var(--blue);
    }
    .valid-until {
      margin-top: 20px;
      border-radius: 10px;
      background: #ccffcc;
      padding: 10px;
      .valid-until-badges {
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .valid-until-title {
        color: #03c03c;
        font-weight: bold;
      }
      .valid-until-days {
        font-size: 0.9em;
      }
      .not-licensed,
      .alert {
        margin-top: 5px;
        background: var(--lightGray);
        padding: 5px;
        border-radius: 10px;
        display: flex;
        gap: 10px;
      }
      .alert {
        img {
          filter: invert(51%) sepia(95%) saturate(5700%) hue-rotate(355deg)
            brightness(94%) contrast(97%);
        }
      }
    }
    .verified-wrapper {
      display: flex;
      align-items: center;
      gap: 20px;
      margin: 20px 0;
      input {
        padding: 10px;
      }
      button {
        padding: 10px;
        background: var(--blue);
        color: white;
        border-radius: 10px;
        white-space: nowrap;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            background: var(--darkBlue);
          }
        }
      }
    }
  }
`;
