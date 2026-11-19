import { ScrollContainerArrowsStyles } from "./styles/ScrollContainerArrowsStyles";
import { useEffect, useState } from "react";
const ScrollContainerArrows = ({
  containerRef,
  itemWidth,
  tags,
  suggestedAttractions,
}) => {
  const [hiddenArrow, setHiddenArrow] = useState("left");
  useEffect(() => {
    function updateScrollPosition() {
      // update the scroll position
      if (containerRef?.current?.scrollLeft === 0) {
        setHiddenArrow("left");
      } else if (
        Math.floor(containerRef?.current?.scrollLeft + 5) >
          containerRef?.current?.scrollWidth -
            containerRef?.current?.clientWidth ||
        Math.ceil(containerRef?.current?.scrollLeft + 5) >
          containerRef?.current?.scrollWidth -
            containerRef?.current?.clientWidth
      ) {
        setHiddenArrow("right");
      } else {
        setHiddenArrow();
      }
    }
    if (containerRef && containerRef?.current) {
      containerRef?.current?.addEventListener(
        "scroll",
        updateScrollPosition,
        false
      );
      return function cleanup() {
        containerRef?.current?.removeEventListener(
          "scroll",
          updateScrollPosition,
          false
        );
      };
    }
  }, []);
  const moveRight = () => {
    const visibleItems = Math.floor(
      containerRef?.current?.offsetWidth / itemWidth
    );
    const widthToMoveRight =
      containerRef?.current?.offsetWidth -
      (containerRef?.current?.offsetWidth -
        visibleItems * itemWidth -
        visibleItems * 10);
    containerRef.current.scroll({
      top: 0,
      left: containerRef?.current?.scrollLeft + widthToMoveRight,
      behavior: "smooth",
    });
  };
  const moveLeft = () => {
    const visibleItems = Math.floor(
      containerRef?.current?.offsetWidth / itemWidth
    );
    const widthToMoveLeft =
      containerRef?.current?.offsetWidth -
      (containerRef?.current?.offsetWidth -
        visibleItems * itemWidth -
        visibleItems * 10);
    containerRef?.current?.scroll({
      top: 0,
      left: containerRef?.current?.scrollLeft - widthToMoveLeft,
      behavior: "smooth",
    });
  };
  return (
    <ScrollContainerArrowsStyles
      className={`${!tags ? "normal-arrows" : ""} ${tags ? "tags" : ""} ${
        suggestedAttractions ? "suggested-attractions" : ""
      }`}
    >
      <button
        onClick={moveRight}
        className={`right-arrow ${hiddenArrow === "right" ? "disabled" : ""}`}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>arrow right</title>
          <rect width="40" height="40" rx="20" fill="#EBEDEF"></rect>
          <g clipPath="url(#clip0_1_1385)">
            <path
              d="M16.151 27.507C16.5594 27.9154 17.2177 27.9154 17.626 27.507L24.551 20.582C24.876 20.257 24.876 19.732 24.551 19.407L17.626 12.482C17.2177 12.0737 16.5594 12.0737 16.151 12.482C15.7427 12.8904 15.7427 13.5487 16.151 13.957L22.1844 19.9987L16.1427 26.0404C15.7427 26.4404 15.7427 27.107 16.151 27.507V27.507Z"
              fill="#0D0D0E"
            ></path>
          </g>
          <defs>
            <clipPath>
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(10 10)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      </button>
      <button
        onClick={moveLeft}
        className={`left-arrow ${hiddenArrow === "left" ? "disabled" : ""}`}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>arrow left</title>
          <rect width="40" height="40" rx="20" fill="#EBEDEF"></rect>
          <g clipPath="url(#clip0_1_1385)" transform="rotate(180,20, 20)">
            <path
              d="M16.151 27.507C16.5594 27.9154 17.2177 27.9154 17.626 27.507L24.551 20.582C24.876 20.257 24.876 19.732 24.551 19.407L17.626 12.482C17.2177 12.0737 16.5594 12.0737 16.151 12.482C15.7427 12.8904 15.7427 13.5487 16.151 13.957L22.1844 19.9987L16.1427 26.0404C15.7427 26.4404 15.7427 27.107 16.151 27.507V27.507Z"
              fill="#0D0D0E"
            ></path>
          </g>
          <defs>
            <clipPath>
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(10 10)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      </button>
    </ScrollContainerArrowsStyles>
  );
};
export default ScrollContainerArrows;
