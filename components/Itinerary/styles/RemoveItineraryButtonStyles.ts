import styled from "styled-components";
export const RemoveItineraryButtonStyles = styled.div`
  button {
    width: 100%;
    padding: 15px;
    background: #fa4157;
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 1.1em;
    margin-top: 10px;
    img {
      filter: var(--whiteFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: #ff2e4a;
      }
    }
  }
`;
