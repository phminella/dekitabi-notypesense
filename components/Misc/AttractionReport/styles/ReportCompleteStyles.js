import styled from "styled-components";
export const ReportCompleteStyles = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.3s ease-in-out;
  &.report-complete {
    left: 0;
  }
  .report-complete-wrapper {
    max-width: 400px;
    img {
      filter: var(--whiteFilter);
    }
    h1 {
      margin-bottom: 10px;
    }
    p {
      font-size: 1.1em;
    }
  }
`;
