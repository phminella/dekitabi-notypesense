import styled from "styled-components";
export const EditCanDriveStyles = styled.section`
  margin-bottom: 10px;
  p {
    color: lightgray;
    transition: all 0.4s ease-in-out;
    &.can-drive {
      color: var(--pink);
      font-weight: 600;
    }
  }
  .switch-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-top: 0;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  label {
  }
  input:checked + .slider {
    background: var(--blue);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
  .warning {
    margin: 10px 0 20px 0;
    color: white;
    background-color: orange;
    padding: 6px;
    border-radius: 10px;
  }
  .upload-license {
    color: black;
    margin-top: 15px;
    display: flex;
    gap: 5px;
    font-size: 1.1em;
    color: var(--darkBlue);
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    padding: 10px 0;
    img {
      margin-top: 3px;
      filter: var(--pinkFilter);
    }
  }
  .transport-included {
    margin-top: 10px;
    border-top: 1px solid lightgray;
    padding-top: 10px;
    margin-top: 15px;
  }
`;
