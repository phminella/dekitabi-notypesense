import styled from "styled-components";
export const RequestAvailabilityCompletedStyles = styled.div`
  max-width: 450px;
  img {
    filter: invert(87%) sepia(80%) saturate(574%) hue-rotate(69deg)
      brightness(95%) contrast(82%);
    margin: 0 auto 5px auto;
    display: block;
  }
  .title {
    background: white;
    font-size: 2em;
    color: var(--darkBlue);
    font-weight: bold;
    padding: 20px 40px 0 20px;
    flex-wrap: wrap;
  }
  .message-wrapper {
    padding: 0px 20px 20px 20px;
    font-size: 1.2em;
    /* text-align: center; */
    div {
      margin: 10px 0;
    }
    .thanks {
      color: var(--pink);
    }
  }
`;
