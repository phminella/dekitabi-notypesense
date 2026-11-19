import Image from "next/image";
import React from "react";
import background from "../../public/img/home/bg.webp";

const HomeBackground = (): JSX.Element => {
  return (
    <Image
      placeholder="blur"
      style={{
        objectFit: "cover",
        objectPosition: "center 6%",
        opacity: "0.8",
      }}
      className="wrapper-background"
      alt="background"
      fill
      priority
      src={background}
      quality={70}
      // priority already implies eager loading; loading="eager" removed (WARNING-5)
    />
  );
};

export default React.memo(HomeBackground);
