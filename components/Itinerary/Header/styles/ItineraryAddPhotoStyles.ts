import styled from "styled-components";
export const ItineraryAddPhotoStyles = styled.div`
  .input-photos {
    display: block;
    background: white;
    border-radius: 5px;
    font-weight: 600;
    height: 40px;
    padding: 0 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--darkBlue);
        color: white;
      }
    }
    cursor: pointer;
    input {
      display: none;
    }
  }
`;
