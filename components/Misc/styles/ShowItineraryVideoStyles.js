import styled from "styled-components";
export const ShowItineraryVideoStyles = styled.div`
  .basic-modal {
    .close-icon {
      display: flex !important;
      background: var(--blue) !important;
      right: 30px !important;
      img {
        filter: var(--whiteFilter) !important;
      }
    }
    .modal-wrapper {
      max-width: 950px !important;
      padding: 15px !important;
    }
  }
  .show-video-button {
    display: flex;
    gap: 5px;
    color: var(--blue);
    text-decoration: underline;
    img {
      margin-top: 2px;
      filter: var(--pinkFilter);
    }
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--darkBlue);
      }
    }
  }
`;
