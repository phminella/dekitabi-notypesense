import { firestoreAdmin } from "../firebase/firebaseAdmin";

type AffiliateData = Record<string, any>;

const getAdminStore = () => {
  if (!firestoreAdmin || typeof firestoreAdmin.collection !== "function") {
    throw new Error("Firebase Admin credentials are required for affiliate storage.");
  }
  return firestoreAdmin;
};

const getAffiliateById = async (affiliateId: string) => {
  const snap = await getAdminStore().collection("affiliates").doc(affiliateId).get();
  if (!snap.exists) return null;
  return snap.data() as AffiliateData;
};

const findAffiliateByField = async (field: string, value: string) => {
  const snap = await getAdminStore()
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
};

const createAffiliate = async (affiliateId: string, data: AffiliateData) => {
  await getAdminStore().collection("affiliates").doc(affiliateId).set(data);
};

const updateAffiliate = async (affiliateId: string, data: AffiliateData) => {
  await getAdminStore().collection("affiliates").doc(affiliateId).update(data);
};

const deleteAffiliate = async (affiliateId: string) => {
  await getAdminStore().collection("affiliates").doc(affiliateId).delete();
};

export {
  createAffiliate,
  deleteAffiliate,
  findAffiliateByField,
  getAffiliateById,
  updateAffiliate,
};
