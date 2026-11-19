import { ActivityStatusInfoStyles } from "./styles/ActivityStatusInfoStyles";
import { ActivityBookCompletedStyles } from "./ActivityBook/Completed/styles/ActivityBookCompletedStyles";
import { ActivityBookConfirmationStyles } from "./ActivityBook/Checkout/styles/ActivityBookConfirmationStyles";
import Image from "next/image";
import Link from "next/link";
const ActivityStatusInfo = ({ t, status, msg, order }) => {
  return (
    <ActivityStatusInfoStyles>
      <ActivityBookCompletedStyles>
        <ActivityBookConfirmationStyles>
          <h1 className="checkout-title">
            <Image
              src={
                status === "completed"
                  ? "/img/icon-check.svg"
                  : status === "loading"
                  ? "/img/icon-spinner.svg"
                  : "/img/icon-alert.svg"
              }
              height={80}
              width={80}
              alt="status"
            />
          </h1>
          <p className="order-id">
            {t("orderId")}: {order?.id}
          </p>
          <p className="msg">{msg}</p>
          {status !== "loading" && status !== "signInShop" && (
            <Link href={`/`} className="link" prefetch={false}>
              {t("goHomePage")}
            </Link>
          )}
          {status === "signInShop" && (
            <Link href={`/shop/sign-in`} className="link" prefetch={false}>
              {t("signIn")}
            </Link>
          )}
        </ActivityBookConfirmationStyles>
      </ActivityBookCompletedStyles>
    </ActivityStatusInfoStyles>
  );
};
export default ActivityStatusInfo;
