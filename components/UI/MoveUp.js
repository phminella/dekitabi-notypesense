import { MoveUpStyles } from "./styles/MoveUpStyles";
import Image from "next/image";
import * as Scroll from "react-scroll";
import { useEffect, useState } from "react";
const MoveUp = () => {
  const [show, setShow] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 900) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <MoveUpStyles
      className={show ? "show" : ""}
      onClick={() => {
        Scroll.animateScroll.scrollToTop({ duration: 300 });
      }}
    >
      <Image height={18} width={18} src="/img/icon-up.svg" alt="up" />
    </MoveUpStyles>
  );
};
export default MoveUp;
