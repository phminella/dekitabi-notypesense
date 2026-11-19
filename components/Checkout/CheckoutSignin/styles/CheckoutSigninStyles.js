import styled from "styled-components";
export const CheckoutSigninStyles = styled.div`
  padding: 15px;
  margin: 20px;
  background: var(--lightGray);
  margin-bottom: 20px;
  border-radius: 5px;
  //
  // Switch
  //
  /* The switch - the box around the slider */
  .switch-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
    padding: 5px;
    p {
      /* color: white; */
      transition: 0.3s color ease-in-out;
      &.guide {
        color: var(--pink);
      }
    }
  }
`;
