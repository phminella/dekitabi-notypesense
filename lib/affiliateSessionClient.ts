const AFFILIATE_SESSION_STORAGE_KEY = "affiliate_session_token";

const getAffiliateSessionToken = () => {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(AFFILIATE_SESSION_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
};

const setAffiliateSessionToken = (token: string) => {
  if (typeof window === "undefined") return;
  try {
    if (token) {
      window.localStorage.setItem(AFFILIATE_SESSION_STORAGE_KEY, token);
    } else {
      window.localStorage.removeItem(AFFILIATE_SESSION_STORAGE_KEY);
    }
  } catch {
    // ignore storage failures (private mode/quota restrictions)
  }
};

const clearAffiliateSessionToken = () => {
  setAffiliateSessionToken("");
};

const withAffiliateSessionHeaders = (headers: Record<string, string> = {}) => {
  const token = getAffiliateSessionToken();
  if (!token) return headers;
  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
};

export {
  clearAffiliateSessionToken,
  getAffiliateSessionToken,
  setAffiliateSessionToken,
  withAffiliateSessionHeaders,
};
