import styled from "styled-components";
export const HeaderNotificationRequirementsStyles = styled.div`
  position: relative;
  display: flex;
  gap: 10px;
  padding-right: 20px;
  img {
    margin-top: 3px;
  }
  a {
    color: var(--blue);
    text-decoration: underline;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
`;
