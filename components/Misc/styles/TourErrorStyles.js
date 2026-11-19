import styled from "styled-components";
export const TourErrorStyles = styled.div`
  border: 4px solid #ff2e4a;
  font-size: 1.2em;
  color: var(--darkBlue);
  padding: 15px;
  border-radius: 20px;
  h2 {
    margin: 0 !important;
    color: var(--darkBlue);
    text-align: center;
  }
  img {
    margin: 0 auto;
    display: block;
    filter: invert(36%) sepia(73%) saturate(5687%) hue-rotate(336deg)
      brightness(103%) contrast(100%);
  }
  h3 {
    color: var(--darkBlue);
    text-align: center;
  }
  p {
    margin: 15px 0;
  }
`;
