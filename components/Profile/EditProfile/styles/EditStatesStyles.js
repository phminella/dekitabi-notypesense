import styled from "styled-components";
export const EditStatesStyles = styled.section`
  .sub-title {
    margin-top: -10px;
    margin-bottom: 15px;
    font-size: 0.9em;
    line-height: 0.9em;
    color: gray;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2px;
  }
  .states {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
    .state {
      background: var(--lightGray);
      position: relative;
      border-radius: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      z-index: 1;
      font-weight: 600;
      padding: 8px 15px;
      text-transform: capitalize;
    }
  }
  .react-select__input-container {
    font-size: 30px !important;
    font-family: inherit !important;
  }
  .css-b62m3t-container {
    z-index: 2;
  }
`;
