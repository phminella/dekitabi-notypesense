import { createGlobalStyle } from "styled-components";
import isPwa from "../../lib/isPwa";
export const GlobalStyles = createGlobalStyle`
:root {
  //
  // Form Variables
  //
  --pink:#fc0165;
  --lightGray:#FAFAFA;
  --blue: #2186eb;
  --darkBlue:#1a2b49;
  --blueFilter: invert(50%) sepia(58%) saturate(4816%) hue-rotate(192deg) brightness(95%) contrast(93%);
  --whiteFilter: invert(100%) sepia(3%) saturate(3%) hue-rotate(333deg)
      brightness(104%) contrast(100%);
  /* --purpleFilter: invert(19%) sepia(83%) saturate(3950%) hue-rotate(262deg) brightness(101%) contrast(98%); */
  --purpleFilter: invert(16%) sepia(37%) saturate(782%) hue-rotate(177deg)
              brightness(93%) contrast(99%);
  --pinkFilter:invert(11%) sepia(91%) saturate(7480%) hue-rotate(329deg) brightness(95%) contrast(110%);
  --darkBlueFilter: invert(16%) sepia(37%) saturate(782%) hue-rotate(177deg)
              brightness(93%) contrast(99%);
}* {
  scroll-behavior: smooth !important;
}
html {
  box-sizing: border-box;
  color:#484848;
  overflow: auto; 
  scroll-behavior: smooth !important;
  -webkit-scroll-behavior: smooth !important;
  ${() => {
    if (typeof navigator !== "undefined") {
      navigator.userAgent.includes("PWAShell") &&
        "overscroll-behavior-y: none;";
    }
  }}
  button, a {
    cursor:pointer;
    color:#484848;
  }
  input:focus,
      textarea:focus,
      select:focus,
      a:focus {
        outline: none;
      }
  .normal-button {
    padding:10px;
    background:var(--blue);
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:5px;
    border-radius:5px;
    text-decoration: none;
    img {
    filter:var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
    &:hover {
    color:white;
      background:var(--darkBlue);
    }}
    &:disabled {
      background:#a4ccf4;
      cursor: default;
      @media (hover: hover) and (pointer: fine) {
      &:hover {
      background:#a4ccf4;
      }
     }
    }
  }
  h1, h2, h3, h4, h5 {
    color: var(--darkBlue);
  }
  p, div, body, ul, li, input, img, fieldset, h1, h2, h3, h4, h5, button {
    margin:0;
    padding:0;
  }
  ul li {
    list-style: none;
  }
  a {
    cursor: pointer;
    text-decoration: none;
    @media (hover: hover) and (pointer: fine) {
    &:hover {
      color:var(--darkBlue);
    }}
  }
  input, select, textarea {
    width: 100%;
    border:1px solid var(--lightGray);
    border-radius: 4px;
    height:45px;
    font-size: 16px !important;
    text-overflow:ellipsis; 
  }
  .MuiSelect-select {
    font-size:16px !important;
  }
  select {
    -moz-appearance: none; 
    -webkit-appearance: none; 
    appearance: none;
    overflow: hidden;
  overflow: -moz-hidden-unscrollable;
    background: url(/img/icon-arrow-down.png) no-repeat right 10px center white !important;
    background-size:10px 10px !important;
  }
  input:focus, select:focus {
    outline:none;
    box-shadow:none;
  }
  input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
  input[type=number] {
  -moz-appearance: textfield;
}
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  min-height:100%;
  margin:60px 0 0 0 !important;
  padding:0 !important;
  font-size:13px;
  max-width:100vw !important;
  scroll-behavior: smooth;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-overflow-scrolling: touch;
}
button {
  background:none;
  border:none;
}
fieldset {
  border:none;
}
  .error-message {
    background-color: #fee;
    border: 1px solid #edd;
    color: #a66 !important;
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
    display:flex;
    align-items:center;
    gap:5px;
    img {
    filter: invert(6%) sepia(96%) saturate(7492%) hue-rotate(358deg) brightness(121%) contrast(118%);
    }
  }
  .warning-message {
      background:  #ff892f;
      color: white;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
    display:flex;
    align-items:center;
    gap:5px;
    img {
    filter: var(--whiteFilter);
    }
  }
//
// Material UI Input
//
.mui-input-wrapper {
  position:relative;
    margin-bottom: 10px;
    z-index: 0;
  /* Change the white to any color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #f6f8fa inset !important;
  }
    .error-input {
      .MuiInputBase-root {
        border: 2px solid #ff2e4a;
      }
    }
    .MuiFormControl-root {
      width: 100%;
    }
    .MuiInputBase-root {
      height: 60px;
      border-radius: 10px;
      background: #f6f8fa;
      width: 100%;
      &::before {
        border-bottom: none !important;
      }
      &.MuiFilledInput-root:after {
        border: none;
      }
    }
    label {
      font-size: 1.2em;
      letter-spacing: inherit;
      color: #262626 !important;
      padding: 4px 0;
    }
  }
  .MuiMenuItem-root {
      font-size:1.1em !important;
  }  
  .MuiOutlinedInput-notchedOutline{
    border:none;
  }
  .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root {
    top:14px !important;
  }
  .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
    padding-top:16px !important;
  }
  .two-columns-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 10px;
    }
    .three-columns-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0 10px;
    }
    .flex-wrapper-five, .flex-wrapper-ten {
      display:flex;
      align-items:center;
      gap:5px;
      flex-wrap: wrap;
    }
    .flex-wrapper-ten {
      gap:3px 10px;
    }
    .hidden-loading-page {
      position: absolute;
          top:-100vw;
    visibility: hidden;
          opacity: 0;
    }
    .show-loading-page {
      position: relative;
          top: 0;
    visibility: visible;
          opacity: 1;
    }
    select {
      background:white !important;
      color:var(--darkBlue) !important;
      padding:5px 10px;
      min-height:45px !important;
    }
      input::placeholder {
        font-size:0.9em;
      }
      .attraction-image-component {
       object-fit: cover;
       }
`;
