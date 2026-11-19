const getAttractionFromFirestore = async (id, locale) => {
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
  return firestoreAdmin
    .collection("attractions")
    .doc(id.split("-").join(" "))
    .get()
    .then((doc) => {
      if (doc.exists && doc.data()?.hide !== "true") {
        let tempAttraction = {
          ...doc.data(),
          ...(doc.data().address?.en && {
            address: {
              [dbLocale]: doc.data().address[dbLocale],
            },
          }),
          ...(!doc.data().address?.en && {
            address: {
              [dbLocale]: doc.data().address,
            },
          }),
          ...(doc.data().reviews?.en && {
            reviews: {
              [dbLocale]: doc.data().reviews[dbLocale],
            },
          }),
          ...(!doc.data().reviews?.en && {
            reviews: {
              [dbLocale]: doc.data().reviews,
            },
          }),
          ...(doc.data().translatedArea?.en && {
            translatedArea: {
              [dbLocale]: doc.data().translatedArea[dbLocale],
            },
          }),
          ...(doc.data().translatedCity?.en && {
            translatedCity: {
              [dbLocale]: doc.data().translatedCity[dbLocale],
            },
          }),
          ...(doc.data().translatedDescription?.en && {
            translatedDescription: {
              [dbLocale]: doc.data().translatedDescription[dbLocale],
            },
          }),
          ...(doc.data().translatedName?.en && {
            translatedName: {
              [dbLocale]: doc.data().translatedName[dbLocale],
            },
          }),
          ...(doc.data().translatedState &&
            doc.data().translatedState?.en && {
              translatedState: {
                [dbLocale]: doc.data().translatedState[dbLocale],
              },
            }),
        };
        delete tempAttraction.photos;
        return tempAttraction;
      } else {
        // doc.data() will be undefined in this case
        return "not-found";
      }
    })
    .catch((error) => {
      console.log("error");
      return "not-found";
    });
};
export default getAttractionFromFirestore;
