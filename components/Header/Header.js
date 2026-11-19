import { HeaderStyles } from "./styles/HeaderStyles";
import { HeaderResponsiveStyles } from "./styles/responsive/HeaderResponsiveStyles";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import HeaderUser from "./HeaderUser";
import Search from "../Search/Search";
import dynamic from "next/dynamic";
import Avatar from "../UI/Avatar";
const HeaderItineraries = dynamic(
  () => import("./HeaderItineraries/HeaderItineraries"),
  { ssr: false }
);
const HeaderShop = dynamic(() => import("./HeaderShop"), { ssr: false });
const HeaderMenu = dynamic(() => import("./HeaderMenu"), { ssr: false });
const HeaderAvailability = dynamic(() => import("./HeaderAvailability"), {
  ssr: false,
});
const HeaderNotifications = dynamic(
  () => import("./HeaderNotifications/HeaderNotifications"),
  { ssr: false }
);
const HeaderSettings = dynamic(
  () => import("./HeaderSettings/HeaderSettings"),
  { ssr: false }
);
import { useTranslation } from "next-i18next";
import { useSelector, shallowEqual } from "react-redux";
const SignInModal = dynamic(() => import("../User/SignInModal"), {
  ssr: false,
});
import React, { useEffect, useMemo, useRef, useState } from "react";
import { setShowCart } from "../../store/appSlice";
import { useDispatch } from "react-redux";
import { Badge } from "@mui/material";
import Image from "next/image";
// const DownloadAppPopUp = dynamic(() => import("./DownloadAppPopUp"), {
//   ssr: false,
// });
// const HeaderAppDownload = dynamic(() => import("./HeaderAppDownload"), {
//   ssr: false,
// });
import isPwa from "../../lib/isPwa";
const Header = ({ checkout }) => {
  const itineraries = useSelector(
    (state) => state.itinerary.itineraries,
    shallowEqual
  );
  const user = useSelector((state) => state.app.user, shallowEqual);
  const language = useSelector((state) => state.app.language, shallowEqual);
  const cart = useSelector((state) => state.app.cart, shallowEqual);
  const { t, i18n } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [showItineraries, setShowItineraries] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  // const [showAppPopUp, setShowAppPopUp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  // const [showFreeCards, setShowFreeCards] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const settingsRef = useRef();
  const itinerariesRef = useRef();
  const notificationsRef = useRef();
  const isGuide = user?.guide === "true" || user?.guide === true;
  const canShowNotifications =
    user?.guide === "true" ||
    user?.guide === true ||
    user?.guide === "false" ||
    user?.guide === false;
  const stripeRequirements =
    user?.stripeAccountRequirements || user?.stripeRequirements;
  const stripeCurrentlyDueCount = Array.isArray(stripeRequirements?.currently_due)
    ? stripeRequirements.currently_due.length
    : 0;
  const stripeEventuallyDueCount = Array.isArray(
    stripeRequirements?.eventually_due
  )
    ? stripeRequirements.eventually_due.length
    : 0;
  const stripePendingVerificationCount = Array.isArray(
    stripeRequirements?.pending_verification
  )
    ? stripeRequirements.pending_verification.length
    : 0;
  const stripeErrorsCount = Array.isArray(stripeRequirements?.errors)
    ? stripeRequirements.errors.length
    : 0;
  const hasStripeRequirementsAlert =
    Boolean(stripeRequirements) &&
    (stripeCurrentlyDueCount > 0 ||
      stripeEventuallyDueCount > 0 ||
      stripePendingVerificationCount > 0 ||
      stripeErrorsCount > 0 ||
      Boolean(stripeRequirements?.disabled_reason));
  const notificationsCounter = Number(user?.notificationsCounter ?? 0);
  const hasUnreadNotifications = Number.isFinite(notificationsCounter)
    ? notificationsCounter > 0
    : Boolean(user?.notificationsCounter);
  const showNotificationDot =
    hasUnreadNotifications || (isGuide && hasStripeRequirementsAlert);
  // useEffect(() => {
  //   if (user?.freeCards && user?.verified === "true") {
  //     setShowFreeCards(true);
  //   }
  // }, [user]);
  const store = useMemo(() => {
    if (typeof navigator === "undefined" || typeof window === "undefined")
      return undefined;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/huawei/i.test(userAgent)) return "huaweiGallery";
    if (/android/i.test(userAgent)) return "playStore";
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
      return "appStore";
    return null;
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target))
        setShowSettings(false);
      if (
        itinerariesRef.current &&
        !itinerariesRef.current.contains(event.target)
      )
        setShowItineraries(false);
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      )
        setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <HeaderResponsiveStyles>
        <HeaderStyles className={`${checkout ? "checkout" : ""}`}>
          {showMenu && (
            <HeaderMenu
              t={t}
              setShowMenu={setShowMenu}
              isPwa={isPwa}
              store={store}
              user={user}
            />
          )}
          {/* {showAppPopUp && (
            <DownloadAppPopUp
              setShowAppPopUp={setShowAppPopUp}
              showAppPopUp={showAppPopUp}
              t={t}
              store={store}
            />
          )} */}
          <SignInModal user={user} t={t} />
          {
            // showFreeCards && (
            // <GetFreeCards
            // t={t}
            // userUid={user?.uid}
            // userUsername={user?.username}
            // userFreeCards={user?.freeCards}
            // userEmail={user?.email}
            // />
            // )
          }
          <div className="header-wrapper">
            <div className="left-side">
              <Link prefetch={false} href="/" className="dekitabi-logo">
                <picture>
                  <source srcSet="/img/logo.png" media="(min-width: 601px)" />
                  <Image
                    src="/img/logo-short.png"
                    height={45}
                    width={141}
                    alt="dekitabi-logo"
                    priority={true}
                    className="logo"
                  />
                </picture>
              </Link>
            </div>
            {!checkout && user?.shopId && <HeaderShop t={t} user={user} />}
            {!checkout && (
              <div className={`center ${showSearch ? "show-search" : ""}`}>
                <Search
                  t={t}
                  language={language}
                  showSearch={showSearch}
                  setShowSearch={setShowSearch}
                />
              </div>
            )}
            {!checkout && !user?.shopId && (
              <div className={`right-side ${user ? "show" : ""}`}>
                <ul className="right-side-list">
                  <li>
                    <button
                      className="search-button-header header-icon"
                      onClick={() => {
                        setShowSearch(true);
                      }}
                    >
                      <Image
                        src="/img/icon-search.svg"
                        height={25}
                        width={25}
                        alt="dekitabi-destionation-search"
                        priority={true}
                        className="search-icon"
                      />
                    </button>
                  </li>
                  {/* <HeaderAppDownload
                    setShowAppPopUp={setShowAppPopUp}
                    isPwa={isPwa}
                    store={store}
                  /> */}
                  <li ref={itinerariesRef}>
                    <button
                      className="itineraries-icon"
                      onClick={() => setShowItineraries(!showItineraries)}
                    >
                      <Badge badgeContent={itineraries?.length} color="primary">
                        <Image
                          height={28}
                          width={28}
                          src="/img/icon-itinerary2.svg"
                          alt="dekitabi-itineraries"
                          className="header-icon"
                          priority={true}
                        />
                      </Badge>
                    </button>
                    {itineraries && showItineraries && (
                      <HeaderItineraries
                        t={t}
                        user={user}
                        setShowItineraries={setShowItineraries}
                        itineraries={itineraries}
                      />
                    )}
                  </li>
                  {canShowNotifications && (
                    <li ref={notificationsRef}>
                      <button
                        className="notifications-icon header-icon"
                        onClick={() => setShowNotifications(!showNotifications)}
                      >
                        <Badge
                          className="notification-dot"
                          variant="dot"
                          color="primary"
                          invisible={!showNotificationDot}
                        >
                          <Image
                            height={28}
                            width={28}
                            src="/img/icon-notification.svg"
                            alt="dekitabi-profile-notifications"
                            className="header-icon"
                            priority={true}
                          />
                        </Badge>
                      </button>
                      {showNotifications && (
                        <HeaderNotifications
                          t={t}
                          language={language}
                          user={user}
                          setShowNotifications={setShowNotifications}
                        />
                      )}
                    </li>
                  )}
                  {user?.guide === "true" && (
                    <li className="availability">
                      <button className="availability-button header-icon">
                        <Image
                          height={26}
                          width={26}
                          src="/img/icon-availability.svg"
                          alt="dekitabi-tour-guide-availability"
                          priority={true}
                        />
                      </button>
                      <HeaderAvailability
                        userAvailability={user?.availability}
                        userUid={user?.uid}
                        userAvailabilityUpdatedOn={user.availabilityUpdatedOn}
                        userEmail={user?.email}
                        t={t}
                        user={user}
                        i18n={i18n}
                      />
                    </li>
                  )}
                  {!user?.uid && (
                    <li>
                      <HeaderUser user={user} t={t} />
                    </li>
                  )}
                  {
                    user?.uid && (
                      <li style={{ flexShrink: "0" }} ref={settingsRef}>
                        <button
                          className="user-login signed-in"
                          onClick={() => setShowSettings(!showSettings)}
                        >
                          <Avatar
                            width={31}
                            height={31}
                            src={
                              user?.avatar !== "/img/avatar.png"
                                ? user?.avatar
                                : user?.photos?.length > 0
                                ? user?.photos[0]
                                : "/img/avatar.png"
                            }
                          />
                        </button>
                        {showSettings && (
                          <HeaderSettings
                            user={user}
                            t={t}
                            showSettings={showSettings}
                            setShowSettings={setShowSettings}
                          />
                        )}
                      </li>
                    )
                    // : (
                    //   <button
                    //     className="settings-icon header-icon"
                    //     onClick={() => setShowSettings(!showSettings)}
                    //   >
                    //     <Image
                    //       height={28}
                    //       width={28}
                    //       src="/img/icon-web.svg"
                    //       alt="dekitabi-profile-settings"
                    //       className="header-icon"
                    //       priority={true}
                    //     />
                    //   </button>
                    // )
                  }
                  {user?.guide !== "true" && (
                    <li>
                      <button onClick={() => dispatch(setShowCart(true))}>
                        <Badge
                          badgeContent={cart?.items?.length}
                          color="primary"
                        >
                          <Image
                            height={28}
                            width={28}
                            src="/img/icon-cart.svg"
                            alt="dekitabi-tours-cart"
                            className="header-icon cart-icon"
                            priority={true}
                          />
                        </Badge>
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      className="header-icon"
                      onClick={() => {
                        setShowMenu(true);
                      }}
                    >
                      <Image
                        src="/img/icon-menu3.svg"
                        height={28}
                        width={28}
                        alt="dekitabi-menu"
                        priority={true}
                      />
                    </button>
                  </li>
                </ul>
              </div>
            )}
            {!user && !checkout && (
              <div className="right-side show">
                <ul className="right-side-list">
                  <li>
                    <Skeleton variant="circular" width={30} height={30} />
                  </li>
                  <li>
                    <Skeleton variant="circular" width={30} height={30} />
                  </li>
                  <li>
                    <Skeleton variant="circular" width={30} height={30} />
                  </li>
                  <li>
                    <Skeleton variant="circular" width={30} height={30} />
                  </li>
                  <li>
                    <Skeleton variant="circular" width={30} height={30} />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </HeaderStyles>
      </HeaderResponsiveStyles>
    </>
  );
};
export default React.memo(Header);
