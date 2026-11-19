import styled from "styled-components";
export const ItineraryCartBookStyles = styled.div`
  .cart-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }
  /* .select-language {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px;
    background: var(--lightGray);
    border-radius: 10px;
    img {
      filter: invert(32%) sepia(57%) saturate(2444%) hue-rotate(331deg)
        brightness(106%) contrast(96%);
    }
  } */
`;
