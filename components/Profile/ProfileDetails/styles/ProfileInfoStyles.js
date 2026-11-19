import styled from "styled-components";
export const ProfileInfoStyles = styled.div`
  position: relative;
  width: 100%;
  .profile-section {
    padding: 15px 0 0 0;
    max-width: 100%;
  }
  .hello-title {
    color: var(--darkBlue);
  }
  .reviews-title {
    margin: 15px 0 10px 0;
  }
  .profile-title {
    font-size: 2.1em;
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
    line-height: 1.1em;
    font-weight: bold;
    color: var(--darkBlue);
    margin-bottom: 15px;
    span {
      background: var(--pink);
      color: white;
      border-radius: 5px;
      font-size: 0.7rem;
      padding: 2px 5px;
      font-weight: 600;
    }
  }
  .profile-description {
    white-space: pre-line;
    margin-bottom: 15px;
    font-size: 1.1em;
  }
  .profile-contact-wrapper {
    &.hide-info {
      padding: 10px;
      border-radius: 10px;
      filter: blur(2.5px);
    }
  }
`;
