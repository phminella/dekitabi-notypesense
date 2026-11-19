import BasicModal from "../UI/BasicModal";
import { CheckoutAccountCreatedStyles } from "./styles/CheckoutAccountCreatedStyles";
import Image from "next/image";
const CheckoutAccountCreated = ({ t }) => {
  return (
    <CheckoutAccountCreatedStyles>
      <BasicModal showModal={true}>
        <Image
          height={85}
          width={85}
          src="/img/icon-check.svg"
          alt="checked"
          className="checked"
        />
        <h2>
          {t("checkoutLoggedIn")}
          <br /> {t("pleaseWait")}...
        </h2>
        <Image
          height={85}
          width={85}
          src="/img/icon-spinner.svg"
          alt="spinner"
        />
      </BasicModal>
    </CheckoutAccountCreatedStyles>
  );
};
export default CheckoutAccountCreated;
