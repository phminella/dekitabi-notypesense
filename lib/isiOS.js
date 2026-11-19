const isiOS = () => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  return /(Mac|iPhone|iPod|iPad)/i.test(
    navigator.userAgent ||
      navigator.vendor ||
      (window.opera && opera.toString() === `[object Opera]`)
  );
};
export default isiOS;
