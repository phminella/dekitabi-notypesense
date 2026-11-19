import styled from "styled-components";
export const AffiliateHeaderStyles = styled.div`
  background: white;
  .header-wrapper {
    position: relative;
    max-width: 1000px;
    height: 70px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .buttons {
    display: flex;
    gap: 10px;
    position: absolute;
    top: 13px;
    right: 5px;
  }
  .sign-in {
    border-radius: 15px;
    color: var(--darkBlue);
    font-weight: 700;
    gap: 5px;
    border: 2.4px solid var(--darkBlue);
    padding: 0 10px;
    font-size: 1.2em;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sign-up {
    background-color: var(--blue);
    border: 2.4px solid var(--blue);
    color: white;
    border: none;
    font-weight: 400;
  }
  .sign-in:hover {
    background-color: var(--darkBlue);
    color: white;
  }
  @media (max-width: 600px) {
    .logo {
      height: 45px;
      width: 46px;
    }
  }
`;
