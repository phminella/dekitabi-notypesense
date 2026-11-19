import { firestoreAdmin } from "../firebase/firebaseAdmin";
const getShopFromFirestore = async (id, locale) => {
  const dbLocale =
    locale === "default"
      ? "en"
      : locale === "zh_cn"
      ? "zh-CN"
      : locale === "zh_tw"
      ? "zh-TW"
      : locale === "tl"
      ? "fil"
      : locale;
  const shopsRef = firestoreAdmin.collection("shops");
  const qShops = await shopsRef.where("url", "==", id[0]).limit(1).get();

  if (qShops.empty) return "not-found";

  const shopDoc = qShops.docs[0];
  let shop = shopDoc.data();
  // Add translated fields
  shop = {
    ...shop,
    ...(shop.translatedNotification?.[dbLocale] && {
      translatedNotification: shop.translatedNotification[dbLocale],
    }),
    ...(shop.translatedDescription?.[dbLocale] && {
      translatedDescription: shop.translatedDescription[dbLocale],
    }),
  };

  // Fetch related activities
  const activitiesRef = firestoreAdmin.collection("activities");
  const q = await activitiesRef.where("shopId", "==", shop.uid).get();

  const activities = [];
  for (const doc of q.docs) {
    const data = doc.data();
    activities.push({
      name: data.name,
      photos: data.photos,
      id: data.id,
      ...(data.translatedName?.[dbLocale] && {
        translatedName: data.translatedName[dbLocale],
      }),
      ...(data.price && { price: data.price }),
      persons: data.persons,
      ...(data.duration && { duration: data.duration }),
      url: data.url,
    });
  }

  return { ...shop, activities };
};
export default getShopFromFirestore;
