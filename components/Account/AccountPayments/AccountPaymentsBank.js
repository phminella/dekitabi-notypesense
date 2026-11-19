import { AccountPaymentsBankStyles } from "./styles/AccountPaymentsBankStyles";
import Image from "next/image";
import dynamic from "next/dynamic";
const StripeLink = dynamic(() => import("../../UI/StripeLink"), { ssr: false });
const AccountPaymentsBank = ({ bankAccount, t }) => {
  return (
    <AccountPaymentsBankStyles>
      <div className="payment-bank-wrapper">
        <div className="payment-bank">
          <div className="bank-icon-wrapper">
            <Image
              height={25}
              width={25}
              src="/img/icon-bank.svg"
              alt="bank-account"
            ></Image>
          </div>
          {bankAccount ? (
            <div className="bank-info-wrapper">
              <p className="bank-name">{bankAccount.bankName}</p>
              <p>{bankAccount.bankAccountHolder}</p>
              <p>•••• {bankAccount.bankLast4}</p>
            </div>
          ) : (
            <StripeLink buttonText={t("addBank")} />
          )}
        </div>
        {bankAccount && <StripeLink buttonText={t("changeBank")} />}
      </div>
    </AccountPaymentsBankStyles>
  );
};
export default AccountPaymentsBank;
