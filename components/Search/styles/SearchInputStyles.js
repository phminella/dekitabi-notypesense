import styled from "styled-components";
export const SearchInputStyles = styled.div`
  width: 100%;
  position: relative;
  max-width: 400px;
  .close-icon {
    position: absolute;
    top: 13px;
    right: 15px;
    border-radius: 50px;
    background: lightgray;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    display: none;
  }
  input {
    width: 100%;
    padding: 12px 40px 12px 44px;
    border: none;
    border-radius: 12px;
    background: var(--lightGray);
    font-size: 1rem;
    color: #333;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    &:focus {
      outline: none;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    &::placeholder {
      color: #999;
    }
  }

  .search-button {
    padding: 10px;
    position: absolute;
    top: 4px;
    left: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: transparent;
    img {
      width: 20px;
      height: 20px;
      filter: brightness(0) saturate(100%) invert(61%) sepia(91%) saturate(1%)
        hue-rotate(316deg) brightness(101%) contrast(83%);
    }
  }
`;
