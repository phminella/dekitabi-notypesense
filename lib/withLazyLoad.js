import React, { useEffect, useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import styled from "styled-components";
import LazySkeleton from "../components/UI/LazySkeleton";
import { WithLoadStyles } from "./WithLoadStyles";
export const LazyLoadStyles = styled.div``;
const withLazyLoad = (
  WrappedComponent,
  LazyLoader = LazySkeleton,
  height = 0,
  threshold = 0
) => {
  return function LazyLoadHoc(props) {
    const [isInView, ref] = useIntersectionObserver(threshold);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [elementHeight, setElementHeight] = useState();
    useEffect(() => {
      if (isInView && !hasLoaded) {
        setHasLoaded(true);
      }
      if (ref.current.offsetHeight > 0) {
        setElementHeight(ref.current.offsetHeight);
      }
    }, [isInView, hasLoaded]);
    return (
      <LazyLoadStyles
        ref={ref}
        style={{
          minWidth: "100%",
        }}
      >
        {hasLoaded ? (
          <WithLoadStyles>
            <WrappedComponent {...props} />
          </WithLoadStyles>
        ) : (
          <WithLoadStyles
            style={{
              minHeight: height ? height : elementHeight,
              minWidth: "100%",
            }}
          >
            <LazyLoader height={height} minHeight={height} />
          </WithLoadStyles>
        )}
      </LazyLoadStyles>
    );
  };
};
export default withLazyLoad;
