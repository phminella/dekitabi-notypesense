import styled from "styled-components";
export const ProfileContactStyles = styled.div`
  max-width: 600px;
  .contact {
    flex-wrap: wrap;
    p {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    img {
      filter: var(--darkBlueFilter);
    }
  }
`;
