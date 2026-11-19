import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import ShopProfile from "./ShopProfile/ShopProfile";
import Script from "next/script";
const ShopProfileWrapper = ({ shop }) => {
  const { t } = useTranslation();
  const user = useSelector((state) => state?.app?.user);
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
    !function(f,b,e,v,n,t,s) {
      if(f.fbq) return; 
      n = f.fbq = function() {
        n.callMethod ? 
        n.callMethod.apply(n, arguments) : 
        n.queue.push(arguments)
      }; 
      if(!f._fbq) f._fbq = n; 
      n.push = n; 
      n.loaded = !0; 
      n.version = '2.0'; 
      n.queue = []; 
      t = b.createElement(e); 
      t.async = !0; 
      t.src = v; 
      s = b.getElementsByTagName(e)[0]; 
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    // Initialize the Facebook Pixel with your Pixel ID
    fbq('init', '550564998062341');

    // Function to track PageView
    const pageview = () => {
      if (typeof window.fbq === 'function') {
        fbq('track', 'PageView');
      } else {
        // In case fbq is not available yet, add a retry mechanism
        const interval = setInterval(() => {
          if (typeof window.fbq === 'function') {
            fbq('track', 'PageView');
            clearInterval(interval);
          }
        }, 100); // Retry every 100ms

        // Optional timeout to prevent infinite loops (6 seconds)
        setTimeout(() => clearInterval(interval), 6000);
      }
    };

    // Call the pageview function once the script has loaded and fbq is available
    pageview();
  `}
      </Script>

      {/* <ShopHeader t={t} shopUser={shopUser} id={shop?.id} /> */}
      <ShopProfile t={t} shop={shop} isOwner={shop?.uid === user?.uid} />
    </>
  );
};
export default ShopProfileWrapper;
