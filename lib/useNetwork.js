import { useEffect, useState } from "react";
const useNetwork = () => {
  const [isOnline, setNetwork] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setNetwork(window.navigator.onLine);
      window.addEventListener("offline", () =>
        setNetwork(window.navigator.onLine)
      );
      window.addEventListener("online", () =>
        setNetwork(window.navigator.onLine)
      );
    }
  }, []);
  return { isOnline };
};
export default useNetwork;
