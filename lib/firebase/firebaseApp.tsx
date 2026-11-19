const firebaseConfig = {
  // Firebase's browser SDK requires a project API key.  This must be a
  // browser-restricted Firebase key, never a server credential.
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_WEB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dekitabi.com",
  databaseURL:
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ||
    "https://dekitabi-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dekitabi",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dekitabi.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "105427367185",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:105427367185:web:33d3ff24032c75cd0e48b0",
};
import type { FirebaseApp } from "firebase/app";
import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics, isSupported } from "firebase/analytics";
import {
  initializeFirestore,
  // persistentLocalCache,
  // persistentMultipleTabManager,
} from "firebase/firestore/lite";
import {
  initializeAuth,
  browserLocalPersistence,
  indexedDBLocalPersistence,
} from "firebase/auth";
let firebaseApp: FirebaseApp | undefined;
if (typeof window !== "undefined") {
  firebaseApp = getApps()[0] || initializeApp(firebaseConfig);
  const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(
    window.location.hostname
  );
  // Delay Analytics after idle (or LCP if needed)
  window.addEventListener("load", () => {
    if (isLocalhost) {
      return;
    }
    const bootAnalytics = () => {
      import("firebase/analytics")
        .then(({ getAnalytics, isSupported }) =>
          isSupported().then((yes) => {
            if (yes) {
              getAnalytics(firebaseApp);
            }
          })
        )
        .catch(() => undefined);
    };
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        bootAnalytics();
      });
    } else {
      setTimeout(() => {
        bootAnalytics();
      }, 4000);
    }
  });
  const auth = initializeAuth(firebaseApp, {
    persistence: [indexedDBLocalPersistence, browserLocalPersistence],
  });
  initializeFirestore(
    firebaseApp,
    {}
    //   , {
    //   ignoreUndefinedProperties: true,
    //   localCache: persistentLocalCache({
    //     tabManager: persistentMultipleTabManager(),
    //   }),
    // }
  );
}
export default firebaseApp;
