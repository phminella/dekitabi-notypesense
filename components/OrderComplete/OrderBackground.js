import React from "react";
import { OrderBackgroundStyles } from "./styles/OrderBackgroundStyles";
import background from "../../public/img/home/bg.webp";
import Image from "next/image";
const HomeBackground = () => {
  return (
    <OrderBackgroundStyles className="order-background">
      <Image
        placeholder="blur"
        style={{ objectFit: "cover", objectPosition: "center center" }}
        className="wrapper-background"
        alt="background"
        fill
        priority={true}
        src={background}
        quality={60}
        sizes="(min-width:280px) 100vw"
        loading="eager"
      />
    </OrderBackgroundStyles>
  );
};
export default React.memo(HomeBackground);
