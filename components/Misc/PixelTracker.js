// components/PixelTracker.js
import { useEffect } from "react";
const PixelTracker = ({ pixelId }) => {
  useEffect(() => {
    if (!pixelId) {
      return;
    }
    // Paste the base code here, replacing 'YOUR_PIXEL_ID' with your actual pixel ID
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue.push(["n", e]);
      n.queue.push(["track", "PageView"]);
      t = b.createElement(e);
      s = b.getElementsByTagName(e)[0];
      t.async = !0;
      t.src = v;
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js",
      "fbq"
    );
    fbq("init", pixelId);
    fbq("track", "PageView");
  }, [pixelId]);

  return null;
};

export default PixelTracker;
