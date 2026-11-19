import { ProfilePhotoStyles } from "./styles/ProfilePhotoStyles";
import React from "react";
import Image from "next/image";
const ProfilePhoto = ({ src }) => {
  if (!src) return <></>;
  return (
    <ProfilePhotoStyles>
      <Image
        style={{ objectFit: "cover" }}
        alt="tour-guide-photo"
        fill
        src={src}
        quality={40}
      />
    </ProfilePhotoStyles>
  );
};
export default React.memo(ProfilePhoto);
