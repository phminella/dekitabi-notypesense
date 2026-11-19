import { GuideChatStyles } from "./styles/GuideChatStyles";
import Image from "next/image";
import React, { useState } from "react";
import useLocalStorage from "../../../lib/useLocalStorage";

interface GuideChatProps {
  t: (key: string) => string;
}

const GuideChat = ({ t }: GuideChatProps) => {
  const { getItem, setItem } = useLocalStorage();
  const [showTooltip, setShowTooltip] = useState(
    !getItem("checkedChatMessage")
  );

  if (!showTooltip) return null;

  return (
    <GuideChatStyles>
      <div className="title">
        💬 {t("consultWithGuides")}
        <button
          className="close-button"
          onClick={() => {
            setItem("checkedChatMessage", true);
            setShowTooltip(false);
          }}
        >
          <Image
            height={19}
            width={19}
            src="/img/icon-close.svg"
            alt="close"
          />
        </button>
      </div>
      <p>{t("consultWithGuidesMsg")}</p>
    </GuideChatStyles>
  );
};

export default GuideChat;
