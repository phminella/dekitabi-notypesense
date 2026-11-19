import { SideCartPaymentMethodsStyles } from "./styles/SideCartPaymentMethodsStyles";
import Image from "next/image";
const SideCartPaymentMethods = ({ t }) => {
  return (
    <SideCartPaymentMethodsStyles>
      {t("weAccept")}:
      <div className="payment-method-wrapper">
        <div className="payment-method">
          <Image
            src="/img/payment-methods/icon-visa.svg"
            alt="dekitabi-payment-method-visa"
            height={10}
            width={28}
          />
        </div>
        <div className="payment-method">
          <Image
            src="/img/payment-methods/icon-mastercard.svg"
            alt="dekitabi-payment-method-mastercard"
            height={25}
            width={25}
          />
        </div>
        <div className="payment-method">
          <Image
            src="/img/payment-methods/icon-amex.svg"
            alt="dekitabi-payment-method-amex"
            height={25}
            width={25}
          />
        </div>
        <div className="payment-method">
          <Image
            src="/img/payment-methods/icon-diners.svg"
            alt="dekitabi-payment-method-diners"
            height={25}
            width={25}
          />
        </div>
        <div className="payment-method">
          <Image
            src="/img/payment-methods/icon-discover.svg"
            alt="dekitabi-payment-method-discover"
            height={25}
            width={25}
          />
        </div>
        {/* <div className="payment-method">
          <Image
            src="/img/payment-methods/icon-unionpay.svg"
            alt="unionpay"
            height={25}
            width={30}
          />
        </div> */}
        <div className="payment-method">
          <Image
            src="/img/payment-methods/icon-jcb.svg"
            alt="dekitabi-payment-method-jcb"
            height={25}
            width={25}
          />
        </div>
        <div className="payment-method">
          <Image
            src="/img/payment-methods/icon-applepay.svg"
            alt="dekitabi-payment-method-applepay"
            height={15}
            width={35}
          />
        </div>
        <div className="payment-method">
          <Image
            src="/img/payment-methods/icon-googlepay.svg"
            alt="dekitabi-payment-method-googlepay"
            height={15}
            width={35}
          />
        </div>
        <div className="payment-method">
          <Image
            src="/img/payment-methods/icon-alipay.svg"
            alt="dekitabi-payment-method-alipay"
            height={20}
            width={20}
          />
        </div>
        <div className="payment-method">
          <Image
            src="/img/payment-methods/icon-wechat.svg"
            alt="dekitabi-payment-method-wechatpay"
            height={20}
            width={20}
          />
        </div>
      </div>
    </SideCartPaymentMethodsStyles>
  );
};
export default SideCartPaymentMethods;
