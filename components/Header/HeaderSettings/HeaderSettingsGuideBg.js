import { HeaderSettingsGuideBgStyles } from "./styles/HeaderSettingsGuideBgStyles";
import React from "react";
import Image from "next/image";
const HeaderSettingsGuideBg = ({ src }) => {
  return (
    <HeaderSettingsGuideBgStyles className="guide-background">
      <Image
        style={{ objectFit: "cover" }}
        className="wrapper-background"
        alt="tour-guide-background-image"
        fill
        src={src}
        quality={60}
        sizes="(max-width: 412px) 100vw, (max-width: 900px) 70vw, 30vw"
      />
    </HeaderSettingsGuideBgStyles>
  );
};
export default React.memo(HeaderSettingsGuideBg);
