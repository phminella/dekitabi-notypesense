export const FB_PIXEL_ID = "550564998062341"; // Replace with your real pixel ID

export const pageview = () => {
  const interval = setInterval(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
      clearInterval(interval);
    }
  }, 100);

  // Optional timeout to prevent infinite loops
  setTimeout(() => clearInterval(interval), 6000);
};

export const bookingCompleted = (amount) => {
  const interval = setInterval(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Purchase", {
        value: amount,
      });
      clearInterval(interval);
    }
  }, 100);

  // Optional timeout to prevent infinite loops
  setTimeout(() => clearInterval(interval), 5000);
};
export const event = (name, options = {}) => {
  const interval = setInterval(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", name, options);
      clearInterval(interval);
    }
  }, 100);

  // Optional timeout to prevent infinite loops
  setTimeout(() => clearInterval(interval), 5000);
};
