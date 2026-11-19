import { AvatarStyles } from "./styles/AvatarStyles";
import Image from "next/image";
const Avatar = ({ src, width, height }) => {
  return (
    <AvatarStyles className="avatar">
      <Image
        style={{ objectFit: "cover" }}
        src={src ? src : "/img/icon-avatar.svg"}
        width={width}
        height={height}
        alt="tour-guide-avatar"
        quality={60}
        sizes="(min-width:280px) 50vw"
      />
    </AvatarStyles>
  );
};
export default Avatar;
