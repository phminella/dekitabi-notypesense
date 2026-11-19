import { LikeBarStyles } from "./styles/LikeBarStyles";
import Image from "next/image";
const LikeBar = ({ likes, t }) => {
  return (
    <LikeBarStyles>
      <div className="like-bar">
        <div
          className="like-bar-filled"
          style={{
            width: likes <= 100 || !likes ? `${likes}%` : "100%",
          }}
        ></div>
        <div className="like-counter">
          <p>0%</p>
          <p>5%</p> <p>10%</p>
        </div>
      </div>
      <div className="profile-likes">
        <Image
          height={25}
          width={25}
          src="/img/icon-heart-filled.svg"
          alt="dekitabi-profile-likes"
        ></Image>
        <b>
          {t("likes", {
            counter: likes ? likes : 0,
          })}
        </b>
        {likes > 10 && (
          <>
            <span>|</span>
            <b>
              {t("off", {
                counter: likes > 99 ? 10 : likes ? Math.floor(likes / 10) : 0,
              })}
            </b>
          </>
        )}
      </div>
    </LikeBarStyles>
  );
};
export default LikeBar;
