import { NoPhotoStyles } from "./styles/NoPhotoStyles";
import Image from "next/image";
const NoPhoto = () => {
  return (
    <NoPhotoStyles className="no-photo">
      <div className="no-photo-wrapper">
        <Image
          src="/img/icon-marker2.svg"
          height={150}
          width={150}
          alt="marker"
        />
      </div>
    </NoPhotoStyles>
  );
};
export default NoPhoto;
