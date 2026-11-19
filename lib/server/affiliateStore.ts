import { initializeApp, getApps } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
  type Firestore,
} from "firebase/firestore/lite";
import { firestoreAdmin } from "../firebase/firebaseAdmin";

type AffiliateData = Record<string, any>;

const firebaseConfig = {
  apiKey: "AIzaSyCYzcnQvFLD0CY0i5ZSybuS-D4g6WNSd4k",
  authDomain: "dekitabi.com",
  databaseURL:
    "https://dekitabi-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dekitabi",
  storageBucket: "dekitabi.appspot.com",
  messagingSenderId: "105427367185",
  appId: "1:105427367185:web:33d3ff24032c75cd0e48b0",
};

let liteDb: Firestore | null = null;

const hasAdminStore = () =>
  Boolean(firestoreAdmin && typeof firestoreAdmin.collection === "function");

const getLiteDb = () => {
  if (!liteDb) {
    const app = getApps()[0] || initializeApp(firebaseConfig);
    liteDb = getFirestore(app);
  }
  return liteDb;
};

const shouldFallbackToLite = (error: unknown) => {
  if (process.env.NODE_ENV === "production") return false;
  const message =
    error instanceof Error ? error.message : String(error ?? "");
  return (
    message.includes("Could not load the default credentials") ||
    message.includes("Failed to determine service account") ||
    message.includes("7 PERMISSION_DENIED") ||
    message.includes("permission-denied")
  );
};

const getAffiliateById = async (affiliateId: string) => {
  if (hasAdminStore()) {
    try {
      const snap = await firestoreAdmin
        .collection("affiliates")
        .doc(affiliateId)
        .get();
      if (!snap.exists) return null;
      return snap.data() as AffiliateData;
    } catch (error) {
      if (!shouldFallbackToLite(error)) throw error;
    }
  }

  const db = getLiteDb();
  const snap = await getDoc(doc(db, "affiliates", affiliateId));
  if (!snap.exists()) return null;
  return snap.data() as AffiliateData;
};

const findAffiliateByField = async (field: string, value: string) => {
  if (hasAdminStore()) {
    try {
      const snap = await firestoreAdmin
        .collection("affiliates")
        .where(field, "==", value)
        .limit(1)
        .get();
      const first = snap.docs[0];
      if (!first) return null;
      return {
        id: first.id,
        data: first.data() as AffiliateData,
      };
    } catch (error) {
      if (!shouldFallbackToLite(error)) throw error;
    }
  }

  const db = getLiteDb();
  const snap = await getDocs(
    query(collection(db, "affiliates"), where(field, "==", value), limit(1))
  );
  const first = snap.docs[0];
  if (!first) return null;
  return {
    id: first.id,
    data: first.data() as AffiliateData,
  };
};

const createAffiliate = async (affiliateId: string, data: AffiliateData) => {
  if (hasAdminStore()) {
    try {
      await firestoreAdmin.collection("affiliates").doc(affiliateId).set(data);
      return;
    } catch (error) {
      if (!shouldFallbackToLite(error)) throw error;
    }
  }

  const db = getLiteDb();
  await setDoc(doc(db, "affiliates", affiliateId), data);
};

const updateAffiliate = async (affiliateId: string, data: AffiliateData) => {
  if (hasAdminStore()) {
    try {
      await firestoreAdmin
        .collection("affiliates")
        .doc(affiliateId)
        .update(data);
      return;
    } catch (error) {
      if (!shouldFallbackToLite(error)) throw error;
    }
  }

  const db = getLiteDb();
  await updateDoc(doc(db, "affiliates", affiliateId), data);
};

const deleteAffiliate = async (affiliateId: string) => {
  if (hasAdminStore()) {
    try {
      await firestoreAdmin.collection("affiliates").doc(affiliateId).delete();
      return;
    } catch (error) {
      if (!shouldFallbackToLite(error)) throw error;
    }
  }

  const db = getLiteDb();
  await deleteDoc(doc(db, "affiliates", affiliateId));
};

export {
  createAffiliate,
  deleteAffiliate,
  findAffiliateByField,
  getAffiliateById,
  updateAffiliate,
};
