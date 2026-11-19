import styled from "styled-components";
export const ProfileTravelersTabStyles = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid lightgray;
  overflow: hidden;

  margin: 0 auto 25px auto;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    color: lightgray;
    text-transform: uppercase;
    font-weight: 600;
    flex-wrap: wrap;
    padding: 10px;
    img {
      filter: brightness(0) saturate(100%) invert(100%) sepia(0%)
        saturate(1395%) hue-rotate(46deg) brightness(92%) contrast(76%);
    }
    &.active {
      border-top: 1px solid var(--darkBlue);
      color: var(--darkBlue);
      img {
        filter: var(--darkBlueFilter);
      }
    }
  }
`;
