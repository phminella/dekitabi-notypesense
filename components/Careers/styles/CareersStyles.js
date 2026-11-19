import styled from "styled-components";
export const CareersStyles = styled.div`
  .order-background {
    z-index: -1;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  .careers-wrapper {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    background: white;
    @media (max-width: 600px) {
      margin: 120px 10px;
    }
    .register {
      font-size: 1.1em;
      color: var(--pink);
    }
    .email {
      margin: 20px 0 5px 0;
    }
    .normal-button {
      margin-top: 10px;
      width: 100%;
      height: 50px;
    }
    .sent {
      margin-top: 10px;
      background: #d7f7c2;
      color: #006908;
      padding: 5px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 600;
      font-size: 0.9em;
      svg {
        filter: invert(21%) sepia(93%) saturate(1725%) hue-rotate(116deg)
          brightness(90%) contrast(107%);
      }
    }
  }
`;
