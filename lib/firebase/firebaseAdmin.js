import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
export let app;
export let firestoreAdmin;
const projectId = process.env.GOOGLE_CLOUD_PROJECT || "dekitabi";

app = getApps()?.length ? getApps()[0] : initializeApp({ projectId });
firestoreAdmin = getFirestore(app);
firestoreAdmin.settings({
  ignoreUndefinedProperties: true,
});

if (process.env.NODE_ENV !== "production" && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.warn(
    "Firebase Admin may fail locally without GOOGLE_APPLICATION_CREDENTIALS. " +
      "Point it to an untracked service-account JSON file."
  );
}
