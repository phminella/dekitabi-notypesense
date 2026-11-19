import React, { useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
const ShopsVideos = ({ t }) => {
  const containerRef = useRef();
  return (
    <div className="shop-videos">
      <ScrollContainer className="scroll-container" innerRef={containerRef}>
        <div className="video-wrapper">
          <video
            allow="autoplay"
            muted
            width="280"
            height="500"
            id="video-1"
            onMouseEnter={(e) => {
              e.currentTarget.play();
            }}
            onMouseOut={() => {
              document?.getElementById("video-1").pause();
            }}
            onTouchStart={() => {
              document?.getElementById("video-1").play();
            }}
            onTouchCancel={() => {
              document?.getElementById("video-1").pause();
            }}
          >
            <source
              src="/video/shops/alpaca-fureai-land.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-wrapper">
          <video
            allow="autoplay"
            muted
            width="280"
            height="500"
            id="video-2"
            onMouseEnter={() => {
              document?.getElementById("video-2").play();
            }}
            onMouseOut={() => {
              document?.getElementById("video-2").pause();
            }}
            onTouchStart={() => {
              document?.getElementById("video-2").play();
            }}
            onTouchCancel={() => {
              document?.getElementById("video-2").pause();
            }}
          >
            <source src="/video/shops/soak.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-wrapper">
          <video
            allow="autoplay"
            muted
            width="280"
            height="500"
            id="video-3"
            onMouseEnter={() => {
              document?.getElementById("video-3").play();
            }}
            onMouseOut={() => {
              document?.getElementById("video-3").pause();
            }}
            onTouchStart={() => {
              document?.getElementById("video-3").play();
            }}
            onTouchCancel={() => {
              document?.getElementById("video-3").pause();
            }}
          >
            <source src="/video/shops/iriya-shodo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </ScrollContainer>
    </div>
  );
};
export default React.memo(ShopsVideos);
