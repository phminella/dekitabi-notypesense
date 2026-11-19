import { HeaderNotificationNormalStyles } from "./styles/HeaderNotificationNormalStyles";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";
import React from "react";
import Link from "next/link";
const HeaderNotificationNormal = ({ notification, t }) => {
  return (
    <HeaderNotificationNormalStyles>
      {notification?.counter ? (
        <div className="notification-counter">{notification?.counter}</div>
      ) : (
        <Image
          height={15}
          width={15}
          src={`/img/icon-${notification?.type}.svg`}
          alt={`dekitabi-notification-type-${notification?.type}`}
        />
      )}
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(notification.message, {
              USE_PROFILES: { html: true },
            }),
          }}
        ></div>{" "}
        {notification?.verified ? (
          <Link prefetch={false} href="/account/payments-and-payouts">
            {t("paymentsAndPayouts")}
          </Link>
        ) : (
          <></>
        )}
      </div>
    </HeaderNotificationNormalStyles>
  );
};
export default React.memo(HeaderNotificationNormal);
