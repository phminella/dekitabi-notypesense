import Image from "next/image";
import { useState } from "react";
const ToursTab = ({ user, t, setTab, tab }) => {
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  return (
    <div className="responsive-tours-tab-wrapper">
      <button
        className="tours-menu"
        onClick={() => setShowResponsiveMenu(true)}
      >
        <Image src="/img/icon-menu.svg" height={20} width={20} alt="close" />{" "}
        {t("menu")}
      </button>
      <div
        className={`responsive-tours-tab ${showResponsiveMenu ? "show" : ""}`}
      >
        <button
          className="close-icon"
          onClick={() => setShowResponsiveMenu(false)}
        >
          <Image src="/img/icon-close.svg" height={25} width={25} alt="close" />
        </button>
        <div>
          <ul>
            <li className={tab === "pending" ? "active" : ""}>
              <button
                onClick={() => {
                  setTab("pending");
                  setShowResponsiveMenu(false);
                }}
              >
                <Image
                  src="/img/icon-clock.svg"
                  height={20}
                  width={20}
                  alt="pending"
                />
                {t("pending")}
              </button>
            </li>
            <li className={tab === "waitingPay" ? "active" : ""}>
              <button
                onClick={() => {
                  setTab("waitingPay");
                  setShowResponsiveMenu(false);
                }}
              >
                <Image
                  src="/img/icon-money.svg"
                  height={20}
                  width={20}
                  alt="waiting-pay"
                />
                {t("waitingPay")}
              </button>
            </li>
            <li className={tab === "confirmed" ? "active" : ""}>
              <button
                onClick={() => {
                  setTab("confirmed");
                  setShowResponsiveMenu(false);
                }}
              >
                <Image
                  src="/img/icon-confirmed.svg"
                  height={20}
                  width={20}
                  alt="confirmed"
                />
                {t("confirmed")}
              </button>
            </li>
            <li className={tab === "waitingReview" ? "active" : ""}>
              <button
                onClick={() => {
                  setTab("waitingReview");
                  setShowResponsiveMenu(false);
                }}
              >
                <Image
                  src="/img/icon-edit2.svg"
                  height={20}
                  width={20}
                  alt="edit"
                />
                {t("waitingReview")}
              </button>
            </li>
            <li className={tab === "completed" ? "active" : ""}>
              <button
                onClick={() => {
                  setTab("completed");
                  setShowResponsiveMenu(false);
                }}
              >
                <Image
                  src="/img/icon-check.svg"
                  height={20}
                  width={20}
                  alt="completed"
                />
                {t("completed")}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ToursTab;
