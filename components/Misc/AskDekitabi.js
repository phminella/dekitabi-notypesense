import { useState } from "react";
import { AskDekitabiStyles } from "./styles/AskDekitabiStyles";
import Image from "next/image";
const AskDekitabi = ({ t, setItem }) => {
  const [copied, setCopied] = useState(false);
  const [showFreeConsultation, setShowFreeConsultation] = useState(true);
  if (!showFreeConsultation) return <></>;
  return (
    <AskDekitabiStyles>
      <div className="text-wrapper">
        <button
          className="close-icon"
          onClick={() => {
            setItem("hideFreeConsultation", true);
            setShowFreeConsultation(false);
          }}
        >
          <Image
            className="white-icon"
            src="/img/icon-close.svg"
            height={25}
            width={25}
            alt="close"
          />
        </button>
        <p>
          {t("freeConsultation")} <span>(English)</span>
        </p>
        <div className="email">
          <a className="email-link" href="mailto:ask@dekitabi.com">
            <Image
              className="email-icon"
              src="/img/icon-email-outline.svg"
              height={30}
              width={30}
              alt="email-icon"
            />
            ask@dekitabi.com
          </a>{" "}
          {copied ? (
            <div className="copied">
              <Image
                className="white-icon"
                src="/img/icon-check.svg"
                height={27}
                width={27}
                alt="copy"
              />
            </div>
          ) : (
            <button
              className="copy-button"
              onClick={() => {
                navigator.clipboard.writeText("ask@dekitabi.com");
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2500);
              }}
            >
              <Image
                className="white-icon"
                src="/img/icon-copy.svg"
                height={27}
                width={27}
                alt="copy"
              />
            </button>
          )}
        </div>
        <p className="reply-time">{t("returnMsg", { time: "24" })}</p>
      </div>
    </AskDekitabiStyles>
  );
};
export default AskDekitabi;
