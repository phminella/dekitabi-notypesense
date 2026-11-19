const getUserFromFirestore = async (username) => {
  const { firestoreAdmin } = await import("../firebase/firebaseAdmin");
  const getAllUsersFromDb = async (querySnapshot) => {
    let tempUser;
    querySnapshot.forEach(async (doc) => {
      tempUser = doc.data();
    });
    return tempUser;
  };
  const getAllReviewsFromDb = async (querySnapshot) => {
    let tempReviews = [];
    querySnapshot.forEach(async (doc) => {
      tempReviews.push(doc.data());
    });
    return tempReviews;
  };
  const attractionsRef = firestoreAdmin.collection("users");
  const q = await attractionsRef.where("username", "==", username).get();
  const user = await getAllUsersFromDb(q);
  if (user?.uid) {
    const reviewRef = firestoreAdmin.collection("reviews");
    const q2 = await reviewRef
      .where("guideId", "==", user?.uid)
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    const reviews = await getAllReviewsFromDb(q2);
    return { ...user, reviews };
  } else {
    return "not-found";
  }
};
export default getUserFromFirestore;
