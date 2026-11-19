import styled from "styled-components";
export const ActivityDetailsStyles = styled.ul`
  margin-top: 20px;
  border: 1px solid lightgray;
  background-color: var(--lightGray);
  padding: 15px;
  border-radius: 10px;
  color: var(--darkBlue);
  li {
    border-top: 1px solid lightgray;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 10px;
    font-size: 1.1em;
    &:first-child {
      border: none;
      padding-top: 0;
    }
    &:last-child {
      padding-bottom: 0;
    }
    .label {
      text-transform: capitalize;
    }
    .value {
      font-weight: 600;
      text-align: right;
      .type {
        text-transform: capitalize;
        color: gray;
      }
    }
    &.service-fee {
      font-size: 0.95em;
      padding-top: 5px;
      border: none;
    }
    &.price-label {
      border: none;
    }
    .total {
      font-size: 1.2em;
      color: var(--pink);
    }
  }
  &.price {
    border: none;
    padding: 0;
    font-size: 1.1em;
    box-shadow: none;
    background-color: unset;
    margin-top: 30px;
    .total-list {
      border-top: 1px solid lightgray;
      margin-top: 10px;
      padding-top: 10px;
    }
  }
`;
