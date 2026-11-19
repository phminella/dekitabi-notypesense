import styled from "styled-components";
export const ItineraryStatusStyles = styled.div`
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1.1em;
  &.pending {
    background: orange;
    color: white;
    img {
      filter: var(--whiteFilter);
    }
  }
  &.canceled {
    background: #ffcccc;
    color: #f3707e;
    img {
      filter: invert(58%) sepia(7%) saturate(3595%) hue-rotate(305deg)
        brightness(96%) contrast(98%);
    }
  }
  &.confirmed {
    background: #32de84;
    color: white;
    img {
      filter: var(--whiteFilter);
    }
  }
  &.waiting-review {
    background: #cce5ff;
    color: #422752;
    img {
      filter: invert(15%) sepia(10%) saturate(4205%) hue-rotate(236deg)
        brightness(95%) contrast(89%);
    }
  }
  &.completed {
    background: #d1ecf1;
    color: #06356a;
    img {
      filter: invert(13%) sepia(37%) saturate(4875%) hue-rotate(201deg)
        brightness(93%) contrast(95%);
    }
  }
`;
