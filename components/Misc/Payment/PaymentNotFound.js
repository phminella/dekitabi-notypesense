import { PaymentNotFoundStyles } from "./styles/PaymentNotFoundStyles";
import Image from "next/image";
import Link from "next/link";
const PaymentNotFound = ({ t, paymentNotFound }) => {
  return (
    <PaymentNotFoundStyles>
      <div>
        <Image src="/img/logo.png" height={45} width={141} alt="logo" />
        <div className="payment-wrapper">
          {paymentNotFound === "notFound" && (
            <div className="title-wrapper">
              <h1>{t("noTour")}</h1>
              <p>
                <b>{t("noTourMsg1")}</b>
              </p>
              <p>{t("noTourMsg2")}</p>
            </div>
          )}{" "}
          {paymentNotFound === "paid" && (
            <div className="title-wrapper">
              <h1>{t("alreadyPaid")}</h1>
              <p>{t("alreadyPaidMsg")}</p>
            </div>
          )}
          <Image
            height={180}
            width={340}
            src="/img/pageNotFound.webp"
            alt="not-found"
          />
          <Link prefetch={false} href="/">
            {t("goHomePage")}
          </Link>
        </div>
      </div>
    </PaymentNotFoundStyles>
  );
};
export default PaymentNotFound;
