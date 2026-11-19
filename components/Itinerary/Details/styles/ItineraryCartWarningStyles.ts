import styled from "styled-components";
export const ItineraryCartWarningStyles = styled.div`
  font-size: 1.15em;
  .cart-warning,
  .select-language {
    margin-bottom: 10px;
    display: flex;
    gap: 10px;
    color: var(--darkBlue);
    padding: 5px 10px;
    border-radius: 10px;
    border: 2px solid #ededed;
    margin-bottom: 10px;
    img {
      margin-top: 1px;
      filter: var(--blueFilter);
    }
    &.list {
      ul li {
        list-style: inside;
      }
    }
    li {
      button {
        color: var(--blue);
        text-decoration: underline;
        font-size: 1em;
        @media (hover: hover) and (pointer: fine) {
          &:hover {
            color: var(--darkBlue);
          }
        }
      }
    }
  }
  .free-consultation {
    display: flex;
    align-items: start;
    gap: 7px;
    span {
      color: darkgray;
      font-size: 0.9em;
    }
    .email-wrapper {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
    }
    .email {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
    }
    .email-link {
      color: var(--pink);
      display: flex;
      align-items: center;
    }
    .email-link-item {
      display: flex;
      align-items: center;
    }
    .copied {
      img {
        filter: var(--pinkFilter);
      }
    }
  }
`;
