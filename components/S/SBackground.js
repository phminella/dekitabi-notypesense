import Image from "next/image";
import React from "react";
const SBackground = ({ bg }) => {
  const background = require("../../public/img/bg/Japan/" + bg + ".webp");
  return (
    <Image
      style={{
        objectFit: "cover",
        objectPosition: "center center",
      }}
      className="wrapper-background"
      alt="background"
      fill
      priority={true}
      src={background}
      quality={70}
      // sizes="100vw, (max-width: 280px) 50vw"
      loading="eager"
      placeholder="blur"
    />
  );
};
export default React.memo(SBackground);
