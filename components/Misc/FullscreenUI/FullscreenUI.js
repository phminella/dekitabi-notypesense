import { FullscreenUIStyles } from "./FullscreenUIStyles";
import Image from "next/image";
import * as Scroll from "react-scroll";
const FullscreenUI = () => {
  return (
    <FullscreenUIStyles>
      {/* <button className="refresh" onClick={() => location.reload()}>
        <Image
          height={29}
          width={29}
          src="/img/icon-refresh.svg"
          alt="refresh"
        />
      </button> */}
      <button onClick={() => history.back()}>
        <Image
          height={20}
          width={20}
          src="/img/icon-arrow-right-pwa.svg"
          alt="up"
        />
      </button>
      <button
        onClick={() => {
          Scroll.animateScroll.scrollToTop({ duration: 300 });
        }}
      >
        <Image
          height={20}
          width={20}
          src="/img/icon-arrow-right-pwa.svg"
          alt="up"
        />
      </button>
      <button onClick={() => history.forward()}>
        <Image
          height={20}
          width={20}
          src="/img/icon-arrow-right-pwa.svg"
          alt="up"
        />
      </button>
    </FullscreenUIStyles>
  );
};
export default FullscreenUI;
