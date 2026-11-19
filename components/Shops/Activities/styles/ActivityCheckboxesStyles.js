import styled from "styled-components";
export const ActivityCheckboxesStyles = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 15px auto;
  padding: 10px;
  border: 1px solid #ebebeb;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  border-radius: 10px;
  .checkboxes-info {
    border: 1px solid lightgray;
    background: var(--lightGray);
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;
    padding: 5px;
    gap: 5px;
    img {
      filter: var(--pinkFilter);
    }
  }
  .checkboxes-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    text-align: center;
    @media (max-width: 1000px) {
      grid-template-columns: 1fr;
      justify-content: left;
      text-align: left;
    }
    label {
      gap: 8px !important;
      vertical-align: top !important;
      @media (max-width: 1000px) {
        grid-template-columns: 1fr;
        box-align: start !important;
      }
    }
    .MuiTypography-root {
      text-align: left !important;
    }
    .checkbox-msg {
      color: gray;
      font-size: 0.9em;
    }
  }
`;
