const getActivityFromFirestore = async (id, locale) => {
  let dbLocale =
    locale === "default"
      ? "en"
      : locale === "zh_cn"
      ? "zh-CN"
      : locale === "zh_tw"
      ? "zh-TW"
      : locale === "tl"
      ? "fil"
      : locale;
  const { firestoreAdmin } = await import("../firebase/firebaseAdmin");
  const activitiesRef = firestoreAdmin.collection("activities");
  let activitiesArray = [];
  const q = await activitiesRef.where("url", "==", id).get();
  q.forEach(async (doc) => {
    let tempActivity = {
      ...doc.data(),
      ...(doc.data().translatedDescription &&
        Object.keys(doc.data()?.translatedDescription)?.length > 0 && {
          translatedDescription: doc.data().translatedDescription[dbLocale],
        }),
      ...(doc.data()?.translatedIncluded &&
        Object.keys(doc.data()?.translatedIncluded)?.length > 0 && {
          translatedIncluded: doc.data().translatedIncluded,
        }),
      ...(doc.data()?.translatedNotIncluded &&
        Object.keys(doc.data()?.translatedNotIncluded)?.length > 0 && {
          translatedNotIncluded: doc.data().translatedNotIncluded,
        }),
      ...(doc.data().translatedName && {
        translatedName: doc.data().translatedName[dbLocale],
      }),
    };
    activitiesArray.push(tempActivity);
  });
  if (activitiesArray?.length > 0) {
    const shopsRef = firestoreAdmin.collection("shops");
    const shopsQ = await shopsRef
      .where("uid", "==", activitiesArray[0]?.shopId)
      .get();
    let tempShop = [];
    shopsQ.forEach(async (doc) => {
      tempShop.push({
        ...doc.data(),
        ...(doc.data()?.translatedNotification &&
          Object.keys(doc.data()?.translatedNotification)?.length > 0 && {
            translatedNotification:
              doc.data()?.translatedNotification[dbLocale],
          }),
        ...(doc.data()?.translatedDescription &&
          Object.keys(doc.data()?.translatedDescription)?.length > 0 && {
            translatedDescription: doc.data()?.translatedDescription[dbLocale],
          }),
      });
    });
    return { ...activitiesArray[0], shop: tempShop[0] };
  } else {
    return "not-found";
  }
};
export default getActivityFromFirestore;
