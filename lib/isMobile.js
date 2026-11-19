const isMobile = () => {
  // if (typeof window === "undefined" || typeof navigator === "undefined") {
  //   return false;
  // } else if ("maxTouchPoints" in navigator) {
  //   return navigator.maxTouchPoints > 0;
  // } else if ("msMaxTouchPoints" in navigator) {
  //   return navigator.msMaxTouchPoints > 0;
  // } else {
  //   var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
  //   if (mQ && mQ.media === "(pointer:coarse)") {
  //     return !!mQ.matches;
  //   } else if ("orientation" in window) {
  //     return true;
  //   } else {
  //     // Only as a last resort, fall back to user agent sniffing
  //     var UA = navigator?.userAgentData?.brands;
  //     return (
  //       /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
  //       /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
  //     );
  //   }
  // }
  return true;
};
export default isMobile;
