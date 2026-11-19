import { GuideBackgroundStyles } from "./styles/GuideBackgroundStyles";
import React from "react";
import Image from "next/image";
const GuideBackground = ({ src, fromHome }) => {
  return (
    <GuideBackgroundStyles className="guide-background">
      <Image
        style={{ objectFit: "cover" }}
        className="wrapper-background"
        alt="dekitabi-tour-guide-photo"
        fill={fromHome ? false : true}
        width={fromHome ? 280 : 0}
        height={fromHome ? 400 : 0}
        src={src}
        quality={70}
        sizes={
          fromHome
            ? ""
            : "(max-width: 600px) 100vw,(max-width: 875px) 50vw, (max-width: 1100px) 33vw, 25vw"
        }
      />
    </GuideBackgroundStyles>
  );
};
export default React.memo(GuideBackground);
