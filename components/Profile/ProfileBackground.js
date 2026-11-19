import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import React from "react";
const ProfileBackground = ({ src, loadingBg }) => {
  return (
    <>
      <div className="bg-opacity"></div>
      <Image
        style={{ objectFit: "cover", objectPosition: "center center" }}
        className="wrapper-background"
        alt="dekitabi-tour-guide-profile-background"
        fill
        priority={true}
        src={
          src?.length > 4
            ? src
            : `/img/profile-background/${src ? src : "bg13"}.webp`
        }
        quality={90}
        sizes="100vw, (min-width: 280px) 100vw"
        loading="eager"
      />{" "}
      {loadingBg && (
        <Skeleton
          style={{
            background: "var(--lightGray)",
            position: "absolute",
            top: "0",
            left: "0",
          }}
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={"320px"}
        />
      )}
    </>
  );
};
export default React.memo(ProfileBackground);
