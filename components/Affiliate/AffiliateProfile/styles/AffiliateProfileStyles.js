import styled from "styled-components";
export const AffiliateProfileStyles = styled.div`
  margin-top: -80px;
  background-color: lightblue;
  padding-bottom: 20px;
  .link {
    color: var(--blue);
    text-decoration: underline;
    font-size: 1em;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
    &.edit-button {
      width: 100%;
      text-align: center;
    }
  }
  .title-link {
    display: block;
    width: 100%;
    text-align: center;
  }
  .bg-wrapper {
    position: relative;
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    h1 {
      z-index: 1;
      color: white;
      font-size: 4em;
      @media (max-width: 330px) {
        font-size: 3.5em;
      }
      max-width: 500px;
      line-height: 1em;
      padding: 10px;
    }
  }
  .profile-wrapper {
    max-width: 500px;
    margin: 20px auto 0 auto;
    @media (max-width: 520px) {
      margin: 20px 10px 0 10px;
    }
    font-size: 1.3em;
    /* border: 2px solid var(--darkBlue); */
    background-color: var(--lightGray);
    padding: 15px;
    border-radius: 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
  .profile-errors {
    background: #f9e154;
    color: var(--darkBlue);
    padding: 5px;
    font-size: 0.9em;
    border-radius: 10px;
  }
  .avatar-wrapper {
    text-align: center;
    .logo {
      margin: 10px 0 5px 0;
    }
  }
  h2,
  h3 {
    text-align: center;
    overflow-wrap: break-word;
  }
  .id {
    margin: 10px 0 20px 0;
    background: var(--lightGray);
    span {
      color: gray;
    }
    b {
      color: var(--pink);
    }
  }
  .no-stripe {
    background: orange;
    color: white;
    padding: 5px;
    margin-bottom: 20px;
    border-radius: 10px;
  }
`;
