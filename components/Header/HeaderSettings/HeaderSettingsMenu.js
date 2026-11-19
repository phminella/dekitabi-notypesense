import { HeaderSettingsMenuStyles } from "./styles/HeaderSettingsMenuStyles";
import Image from "next/image";
import Link from "next/link";
import useAuth from "../../../lib/useAuth";
import React from "react";
const HeaderSettingsMenu = ({ user, t, setShowSettings }) => {
  const { signOff } = useAuth();
  return (
    <HeaderSettingsMenuStyles>
      <li>
        <Link
          prefetch={false}
          onClick={() => setShowSettings(false)}
          href="/account"
        >
          <p>
            <Image
              src="/img/icon-settings.svg"
              height={18}
              width={18}
              alt="dekitabi-tour-guide-account"
            />
            {t("account")}
          </p>
          <Image
            src="/img/icon-arrow-right.svg"
            height={13}
            width={13}
            alt="dekitabi-tour-guide-view-account"
          />
        </Link>
      </li>
      <li>
        <Link
          prefetch={false}
          onClick={() => setShowSettings(false)}
          href={`/${user.username}`}
        >
          <p>
            <Image
              src="/img/icon-edit.svg"
              height={18}
              width={18}
              alt="dekitabi-tour-guide-profile"
            />
            {t("profile")}
          </p>
          <Image
            src="/img/icon-arrow-right.svg"
            height={13}
            width={13}
            alt="dekitabi-tour-guide-view-profile"
          />
        </Link>
      </li>
      <li>
        <Link
          prefetch={false}
          onClick={() => setShowSettings(false)}
          href={`/account/tours`}
        >
          <p>
            <Image
              src="/img/icon-itinerary2.svg"
              height={18}
              width={18}
              alt="dekitabi-tour-guide-tours"
            />
            {t("tours")}
          </p>
          <Image
            src="/img/icon-arrow-right.svg"
            height={13}
            width={13}
            alt="dekitabi-tour-guide-view-tours"
          />
        </Link>
      </li>
      <li>
        {user?.guide === "false" ? (
          <Link
            prefetch={false}
            onClick={() => setShowSettings(false)}
            href={`/account/orders`}
          >
            <p>
              <Image
                src="/img/icon-transfer.svg"
                height={18}
                width={18}
                alt="dekitabi-traveler-orders"
              />
              {t("orders")}
            </p>
            <Image
              src="/img/icon-arrow-right.svg"
              height={13}
              width={13}
              alt="dekitabi-traveler-view-orders"
            />
          </Link>
        ) : (
          <Link
            prefetch={false}
            onClick={() => setShowSettings(false)}
            href={`/account/payments-and-payouts`}
          >
            <p>
              <Image
                src="/img/icon-transfer.svg"
                height={18}
                width={18}
                alt="dekitabi-tour-guide-payouts"
              />
              {t("paymentsAndPayouts")}
            </p>
            <Image
              src="/img/icon-arrow-right.svg"
              height={13}
              width={13}
              alt="dekitabi-tour-guide-view-payouts"
            />
          </Link>
        )}
      </li>
      <li>
        <Link
          prefetch={false}
          onClick={() => setShowSettings(false)}
          href={`/account/notifications`}
        >
          <p>
            <Image
              src="/img/icon-notification.svg"
              height={18}
              width={18}
              alt="dekitabi-notifications"
            />
            {t("notifications")}
          </p>
          <Image
            src="/img/icon-arrow-right.svg"
            height={13}
            width={13}
            alt="dekitabi-tour-guide-view-tours"
          />
        </Link>
      </li>
      <li>
        <Link
          prefetch={false}
          onClick={() => {
            signOff();
            setShowSettings(false);
          }}
          href="/"
        >
          <p>
            <Image
              src="/img/icon-signoff.svg"
              height={18}
              width={18}
              alt="dekitabi-account-sign-out"
            />
            {t("signOut")}
          </p>
        </Link>
      </li>
    </HeaderSettingsMenuStyles>
  );
};
export default React.memo(HeaderSettingsMenu);
