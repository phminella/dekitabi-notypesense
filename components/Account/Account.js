import { AccountStyles } from "./styles/AccountStyles";
import { AccountResponsiveStyles } from "./styles/responsive/AccountResponsiveStyles";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useSelector, shallowEqual } from "react-redux";
import dynamic from "next/dynamic";
const StripeLink = dynamic(() => import("../UI/StripeLink"), { ssr: false });
const Account = () => {
  const user = useSelector((state) => state.app.user, shallowEqual);
  const { t } = useTranslation();
  return (
    <AccountResponsiveStyles>
      <AccountStyles>
        <Head>
          <title>{t("account")}</title>
        </Head>
        <div className="account-wrapper">
          <h1> {t("account")}</h1>
          <div className="go-to-profile">
            <h2>
              {!user ? (
                <> {t("loading")}...</>
              ) : (
                <>
                  {user?.firstname} {user?.lastname}
                  {(user?.firstname || user?.lastname) && <>・</>} {user?.email}
                  {user?.guide === "true" && (
                    <>
                      <br />
                      <Link prefetch={false} href={`/${user?.username}`}>
                        {t("goToProfile")}
                      </Link>
                    </>
                  )}
                </>
              )}
            </h2>
          </div>
          <ul className="account-menu">
            <li>
              <Link href="/account/tours" prefetch={false}>
                <Image
                  height={25}
                  width={25}
                  src="/img/icon-itinerary.svg"
                  alt="tours"
                ></Image>
                <div>
                  <h5>{t("tours")}</h5>
                  {user?.guide === "true" ? (
                    <p>{t("toursDescGuide")}</p>
                  ) : (
                    <p>{t("toursDescTraveler")}</p>
                  )}
                </div>
              </Link>
            </li>
            <li>
              <Link prefetch={false} href="/account/login-and-security">
                <Image
                  height={20}
                  width={20}
                  src="/img/icon-login.svg"
                  alt="login"
                ></Image>
                <div>
                  <h5>{t("loginAndSecurity")}</h5>
                  <p>{t("loginAndSecurityDesc")}</p>
                </div>
              </Link>
            </li>
            {/* {user?.guide === "false" && (
              <li>
                <Link href="/account/profile-info">
                  <Image
                    height={25}
                    width={25}
                    src="/img/icon-licensed.svg"
                    alt="licensed"
                  ></Image>
                  <div>
                    <h5>{t("profileDetails")}</h5>
                    <p>{t("profileDetailsDesc")}</p>
                  </div>
                </Link>
              </li>
            )} */}
            {user?.guide === "true" && (
              <>
                <li>
                  {/* <Link href="/account/personal-info"> */}
                  <StripeLink>
                    <Image
                      height={25}
                      width={25}
                      src="/img/icon-licensed.svg"
                      alt="licensed"
                    ></Image>
                    <div>
                      <h5>{t("personalInfo")}</h5>
                      <p>{t("personalInfoDesc")}</p>
                    </div>
                  </StripeLink>
                  {/* </Link> */}
                </li>
                <li>
                  <Link prefetch={false} href="/account/payments-and-payouts">
                    <Image
                      height={25}
                      width={25}
                      src="/img/icon-payment.svg"
                      alt="payment"
                    ></Image>
                    <div>
                      <h5>{t("paymentsAndPayouts")}</h5>
                      <p>{t("paymentsAndPayoutsDesc")}</p>
                    </div>
                  </Link>
                </li>
              </>
            )}
            {user?.guide === "false" && (
              <li>
                <Link prefetch={false} href="/account/orders">
                  <Image
                    height={25}
                    width={25}
                    src="/img/icon-orders.svg"
                    alt="orders"
                  ></Image>
                  <div>
                    <h5>{t("orders")}</h5>
                    <p>{t("ordersDesc")}</p>
                  </div>
                </Link>
              </li>
            )}
            <li>
              <Link href="/account/notifications" prefetch={false}>
                <Image
                  height={25}
                  width={25}
                  src="/img/icon-notification.svg"
                  alt="licensed"
                ></Image>
                <div>
                  <h5>{t("notifications")}</h5>
                  <p>{t("notificationsDesc")}</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </AccountStyles>
    </AccountResponsiveStyles>
  );
};
export default Account;
