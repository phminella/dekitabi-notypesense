import styled from "styled-components";
export const ProfileDesignOptionsStyles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 50px;
  padding: 5px;
  border-radius: 15px;
  margin: 15px;
  .design-options-bg {
    position: absolute;
    top: 0;
    left: 0;
    background: var(--blue);
    width: 100%;
    height: 100%;
    border-radius: 15px;
    z-index: -1;
    opacity: 0.2;
  }
  .bg-icon {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-position: center center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    border: 3px solid white;
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        filter: brightness(120%);
      }
    }
  }
  .modal-wrapper {
    max-width: 1200px !important;
  }
  .bg-options {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-radius: 10px;
    overflow: hidden;
    margin: 20px 0;
    gap: 2px;
    overflow: auto;
    max-height: 450px;
    z-index: 2;
    button {
      position: relative;
      height: 85px;
      min-width: 200px;
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          filter: brightness(120%);
        }
      }
    }
  }
`;
