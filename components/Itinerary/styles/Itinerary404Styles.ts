import styled from "styled-components";
export const Itinerary404Styles = styled.div`
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  z-index: 9999;
  background: var(--lightGray);
  color: var(--pink);
  font-weight: 600;
  h2 {
    font-size: 4.5em;
    @media (max-width: 600px) {
      font-size: 2.6em;
    }
  }
  p {
    font-size: 1.8em;
  }
  a {
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
    font-size: 1.3em;

    color: var(--blue);
    img {
      margin-top: 4px;
      filter: var(--blueFilter);
    }
  }
  .loader-text {
    text-align: center;
  }
  margin-bottom: -50px;
`;
