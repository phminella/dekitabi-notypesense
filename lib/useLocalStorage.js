import { useCallback } from "react";

const useLocalStorage = () => {
  const hasStorage = useCallback(() => {
    try {
      return (
        typeof window !== "undefined" &&
        typeof window.localStorage !== "undefined"
      );
    } catch {
      return false;
    }
  }, []);

  const setItem = useCallback((key, value) => {
    if (!hasStorage()) return false;
    localStorage.setItem(key, value);
    return true;
  }, [hasStorage]);

  const getItem = useCallback((key) => {
    if (!hasStorage()) return false;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }, [hasStorage]);

  const removeItem = useCallback((key) => {
    if (!hasStorage()) return false;
    localStorage.removeItem(key);
    return true;
  }, [hasStorage]);

  return { setItem, getItem, removeItem };
};

export default useLocalStorage;
