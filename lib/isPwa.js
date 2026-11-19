const isPwa = () => {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  } else {
    return (
      ["fullscreen", "standalone", "minimal-ui"].some(
        (displayMode) =>
          window.matchMedia("(display-mode: " + displayMode + ")").matches
      ) || navigator.userAgent.includes("PWAShell")
    );
  }
};
export default isPwa;
