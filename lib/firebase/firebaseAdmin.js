import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
export let app;
export let firestoreAdmin;
// export const authAdmin = getAuth(app);
try {
  app = getApps()?.length ? getApps()[0] : initializeApp();
  firestoreAdmin = getFirestore(app);
  firestoreAdmin?.settings({
    ignoreUndefinedProperties: true,
  });
} catch (err) {
  console.log(err);
}
