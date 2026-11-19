import Image from "next/image";
const CheckoutBackground = () => {
  return (
    <Image
      style={{
        objectFit: "cover",
        objectPosition: "right center",
        opacity: "0.7",
      }}
      className="wrapper-background"
      alt="background"
      fill
      priority={true}
      src={"/img/home/bg.webp"}
      quality={60}
      sizes="(min-width: 1366px) 50vw, (max-width: 1366px and min-width:280px) 100vw"
      loading="eager"
    />
  );
};
export default CheckoutBackground;
