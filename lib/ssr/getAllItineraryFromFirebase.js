const getAllItineraryFromFirebase = async () => {
  const { firestoreAdmin } = await import("../firebase/firebaseAdmin");
  const getAllItineraryFromDb = async (querySnapshot) => {
    let tempItineraries = [];
    querySnapshot.forEach(async (doc) => {
      tempItineraries.push(doc.data()?.id);
    });
    return tempItineraries;
  };
  const attractionsRef = firestoreAdmin.collection("itineraries");
  const q = await attractionsRef.select("id").get();
  const itineraries = await getAllItineraryFromDb(q);
  return itineraries;
};
export default getAllItineraryFromFirebase;
