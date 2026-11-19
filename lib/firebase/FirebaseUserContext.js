import React, { useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";
import firebaseApp from "./firebaseApp";
import nookies from "nookies";
import { setCart, setCurrency, setUser } from "../../store/appSlice";
import { setItineraries } from "../../store/itinerarySlice";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "lodash.isequal";
import { useTranslation } from "next-i18next";
import useLocalStorage from "../useLocalStorage";
import useChangeLanguage from "../useChangeLanguage";
const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { changeLanguage } = useChangeLanguage();
  const currency = useSelector((state) => state.app.currency);
  const userReference = useRef();
  const notFirstTimeReference = useRef();
  const unsubscribeRef = useRef(null);
  const { getItem, setItem } = useLocalStorage();
  const getUser = async () => {
    import("firebase/firestore/lite")
      .then(
        ({ getFirestore, getDoc, doc, updateDoc, arrayUnion, arrayRemove }) => {
          const updateStripeRequirements = async (userData) => {
            import("firebase/functions").then(
              ({ getFunctions, httpsCallable }) => {
                const functions = getFunctions(undefined, "asia-northeast1");
                const retrieveStripeAccount = httpsCallable(
                  functions,
                  "retrieveStripeAccount"
                );
                retrieveStripeAccount(userData?.stripeAccountId)
                  .then((res) => {
                    const userRef = doc(getFirestore(), "users", userData.uid);
                    updateDoc(userRef, {
                      // ...((userData?.stripeAccountRequirements
                      //   ?.disabled_reason ===
                      //   "requirements.pending_verification" ||
                      //   userData?.stripeAccountRequirements?.disabled_reason ===
                      //     "under_review") && {
                      //   verifiedDocumentsSent: true,
                      // }),
                      ...(res.data.requirements && {
                        stripeAccountRequirements: res.data.requirements,
                      }),
                      ...(res.data.payouts_enabled && {
                        stripePayoutsEnabled: res.data.payouts_enabled,
                      }),
                      ...(res?.data?.details_submitted &&
                      res?.data?.charges_enabled &&
                      res?.data?.payouts_enabled
                        ? {
                            verified: "true",
                          }
                        : {
                            verified: "false",
                          }),
                    });
                  })
                  .catch((err) => console.log("NO STRIPE ACCOUNT", err));
              }
            );
          };
          const getItinerariesFromDb = async (itineraries) => {
            // Send full itinerary to redux
            let hasUndefined = false;
            let hasCompleted = false;
            let tempItineraries = await Promise.all(
              itineraries?.map(async (itineraryId) => {
                const itineraryRef = doc(
                  getFirestore(),
                  "itineraries",
                  itineraryId
                );
                const docSnap = await getDoc(itineraryRef);
                if (docSnap.exists()) {
                  if (docSnap.data().status === "completed") {
                    hasCompleted = true;
                  }
                  return docSnap.data();
                } else {
                  hasUndefined = true;
                }
              })
            );
            if (hasUndefined || hasCompleted) {
              tempItineraries = tempItineraries?.filter(
                (item) => item?.id !== undefined && item?.status !== "completed"
              );
            }
            dispatch(setItineraries(tempItineraries));
          };
          // const getFirebaseMessaging = async (userUid) => {
          //   const { getMessaging, getToken, onMessage } = await import(
          //     "firebase/messaging"
          //   );
          //   // const supported = await isSupported();
          //   // if (supported) {
          //   let messaging;
          //   try {
          //     messaging = getMessaging();
          //   } catch (err) {
          //     console.log(err);
          //   }
          //   return getToken(messaging, {
          //     vapidKey:
          //       "BBFcOUGMSnoiIZoky6rxhIbDRs4508lgo0ZVJ769KFmL_xk-e7BaxorUl1TWaP0InoBk3nN4Yc-ElbBV9u-EMHo",
          //   })
          //     .then(async (token) => {
          //       if (token) {
          //         const userRef = doc(getFirestore(), "users", userUid);
          //         updateDoc(userRef, {
          //           firebaseMessagingTokens: arrayUnion(token),
          //         }).then(() => {
          //           onMessage(messaging, (payload) => {
          //             // ...
          //           });
          //           if (!navigator?.serviceWorker) {
          //           }
          //           return navigator?.serviceWorker.ready
          //             .then((registration) => {
          //               if (registration && registration?.periodicSync) {
          //                 return registration?.periodicSync
          //                   .register("firebaseMessaging", {
          //                     minInterval: 5 * 60 * 1000,
          //                   })
          //                   .then(() => {})
          //                   .catch((err) => {
          //                     return registration?.sync
          //                       .register("firebaseMessaging")
          //                       .then(() => {})
          //                       .catch((err) =>
          //                         console.error(
          //                           "Error registering background sync",
          //                           err
          //                         )
          //                       );
          //                   });
          //               }
          //             })
          //             .catch((err) => {
          //               console.error("Error registering background sync", err);
          //             });
          //         });
          //       } else {
          //         console.log("no token :(");
          //       }
          //     })
          //     .catch((err) => console.log(err));
          //   // } else {
          //   //   console.log("not supported");
          //   // }
          // };
          getAuth(firebaseApp).onAuthStateChanged(async function (
            firebaseUser
          ) {
            const currenciesRef = doc(getFirestore(), "currencies/currencies");
            const currenciesSnap = await getDoc(currenciesRef);
            const currencies = currenciesSnap.data();
            if (firebaseUser?.uid) {
              import("firebase/firestore").then(
                ({ onSnapshot, getFirestore, doc, updateDoc, getDoc }) => {
                  const userRef = doc(
                    getFirestore(),
                    "users",
                    firebaseUser?.uid
                  );
                  unsubscribeRef.current = onSnapshot(
                    userRef,
                    async (docData) => {
                      if (docData.data()) {
                        let tempData = { ...docData.data() };
                        delete tempData.lastVisit;
                        let tempRef = { ...userReference.current };
                        delete tempRef.lastVisit;
                        if (docData.exists() && !isEqual(tempData, tempRef)) {
                          dispatch(setUser(docData.data()));
                          userReference.current = docData.data();
                          if (notFirstTimeReference.current === undefined) {
                            notFirstTimeReference.current = true;
                            const userData = docData.data();
                            changeLanguage(docData.data().language);
                            if (userData?.guide === "true") {
                              const stripeStuff =
                                updateStripeRequirements(userData);
                              dispatch(
                                setCurrency({
                                  currency: "Japanese Yen",
                                  code: "JPY",
                                  symbol: "¥",
                                  rate: 1,
                                })
                              );
                              setItem(
                                "currency",
                                JSON.stringify({
                                  currency: "Japanese Yen",
                                  code: "JPY",
                                  symbol: "¥",
                                  rate: 1,
                                })
                              );
                            } else {
                              dispatch(setCurrency(userData?.currency));
                              setItem(
                                "currency",
                                JSON.stringify(userData?.currency)
                              );
                            }
                            // if ("Notification" in window) {
                            //   if (Notification?.permission === "granted") {
                            //     const firebaseMessagingToken =
                            //       getFirebaseMessaging(firebaseUser?.uid);
                            //   } else {
                            //     let permission =
                            //       await Notification.requestPermission();
                            //     if (permission === "granted") {
                            //       const firebaseMessagingToken =
                            //         getFirebaseMessaging(firebaseUser?.uid);
                            //     } else {
                            //       console.log("nop");
                            //     }
                            //   }
                            // } else {
                            //   console.log("no notification permitted");
                            // }
                            //
                            // const merge = (...arrays) => {
                            //   const merged = {};
                            //   arrays.forEach((data) => {
                            //     data.forEach((o) =>
                            //       Object.assign((merged[o.id] ??= {}), o)
                            //     );
                            //   });
                            //   return Object.values(merged);
                            // };
                            //
                            // Itineraries
                            //
                            let mergedItineraries = [...userData?.itineraries];
                            if (
                              Array.isArray(
                                JSON.parse(getItem("itineraries"))
                              ) &&
                              !isEqual(
                                JSON.parse(getItem("itineraries")),
                                userData?.itineraries
                              )
                            ) {
                              mergedItineraries = [
                                ...new Set([
                                  ...JSON.parse(getItem("itineraries")),
                                  ...userData?.itineraries,
                                ]),
                              ];
                              let tempItineraries =
                                getItinerariesFromDb(mergedItineraries);
                            } else {
                              let tempItineraries = await getItinerariesFromDb(
                                mergedItineraries
                              );
                            }
                            //
                            // Cart
                            //
                            // let mergedCart = {};
                            if (userData?.guide === "false") {
                              //   mergedCart = {
                              //     currency: {
                              //       ...userData?.cart?.currency,
                              //       ...(userData?.cart?.items?.length === 0 && {
                              //         rate: currencies[
                              //           userData?.currency?.code.toLowerCase()
                              //         ],
                              //       }),
                              //     },
                              //     items: [...userData?.cart?.items],
                              //   };
                              //   if (
                              //     Array.isArray(
                              //       JSON.parse(getItem("cart"))?.items
                              //     ) &&
                              //     Array.isArray(userData?.cart?.items)
                              //   ) {
                              //     mergedCart = {
                              //       ...(mergedCart?.timer && {
                              //         timer: mergedCart?.timer,
                              //       }),
                              //       currency: mergedCart.currency,
                              //       items: merge([
                              //         ...JSON.parse(getItem("cart")).items,
                              //         ...userData?.cart?.items,
                              //       ]),
                              //     };
                              //     setItem("cart", JSON.stringify(mergedCart));
                              //   }
                              dispatch(setCart(userData?.cart));
                            }
                            userReference.current = {
                              ...userData,
                              ...(!isEqual(
                                userData?.itineraries,
                                mergedItineraries
                              ) && mergedItineraries),
                            };
                            if (
                              !isEqual(
                                JSON.parse(getItem("itineraries")),
                                mergedItineraries
                              )
                            ) {
                              setItem(
                                "itineraries",
                                JSON.stringify(mergedItineraries)
                              );
                            }
                            if (
                              !isEqual(
                                userData?.itineraries,
                                mergedItineraries
                              ) ||
                              userData?.guide !== "true"
                            ) {
                              updateDoc(userRef, {
                                lastVisit: new Date().getTime(),
                                ...(!isEqual(
                                  userData?.itineraries,
                                  mergedItineraries
                                ) && { itineraries: mergedItineraries }),
                                // ...(userData?.guide === "false" && {
                                //   cart: mergedCart,
                                // }),
                              });
                            } else {
                              updateDoc(userRef, {
                                lastVisit: new Date().getTime(),
                              });
                            }
                          }
                        }
                      } else {
                        const shopSnap = await getDoc(
                          doc(getFirestore(), "shops", firebaseUser?.uid)
                        );
                        if (shopSnap?.exists()) {
                          const updateStripeRequirements = async (userData) => {
                            import("firebase/functions").then(
                              ({ getFunctions, httpsCallable }) => {
                                const functions = getFunctions(
                                  undefined,
                                  "asia-northeast1"
                                );
                                const retrieveStripeAccount = httpsCallable(
                                  functions,
                                  "retrieveStripeAccount"
                                );
                                retrieveStripeAccount(userData?.stripeAccountId)
                                  .then((res) => {
                                    const userRef = doc(
                                      getFirestore(),
                                      "shops",
                                      userData.uid
                                    );
                                    updateDoc(userRef, {
                                      ...(res.data.requirements && {
                                        stripeAccountRequirements:
                                          res.data.requirements,
                                      }),
                                      ...(res.data.payouts_enabled && {
                                        stripePayoutsEnabled:
                                          res.data.payouts_enabled,
                                      }),
                                      ...(res?.data?.details_submitted &&
                                      res?.data?.charges_enabled &&
                                      res?.data?.payouts_enabled
                                        ? {
                                            verified: "true",
                                          }
                                        : {
                                            verified: "false",
                                          }),
                                    });
                                  })
                                  .catch((err) =>
                                    console.log("NO STRIPE ACCOUNT", err)
                                  );
                              }
                            );
                          };
                          updateStripeRequirements(shopSnap.data());
                          dispatch(setUser(shopSnap.data()));
                        }
                      }
                    }
                  );
                }
              );
            } else {
              dispatch(setUser({}));
              changeLanguage(undefined, true);
              if (getItem("currency")) {
                const localStorageCurrency = getItem("currency");
                dispatch(setCurrency(JSON.parse(localStorageCurrency)));
              }
              if (getItem("cart") && !userReference.current) {
                const localStorageCart = getItem("cart");
                const newCart = {
                  currency: {
                    ...JSON.parse(localStorageCart)?.currency,
                    ...(JSON.parse(localStorageCart)?.items?.length === 0 && {
                      rate: currencies[
                        JSON.parse(
                          localStorageCart
                        )?.currency?.code?.toLowerCase()
                      ],
                    }),
                  },
                  ...(JSON.parse(localStorageCart).timer && {
                    timer: JSON.parse(localStorageCart).timer,
                  }),
                  items: JSON.parse(localStorageCart).items,
                };
                dispatch(setCart(newCart));
                setItem("cart", JSON.stringify(newCart));
              } else {
                dispatch(setCart({ currency, items: [] }));
                setItem("cart", JSON.stringify({ currency, items: [] }));
              }
              if (getItem("itineraries") && !userReference.current) {
                getItinerariesFromDb(JSON.parse(getItem("itineraries")));
              } else {
                dispatch(setItineraries([]));
                setItem("itineraries", JSON.stringify([]));
              }
              // const removeTokenFromDb = async (userUid) => {
              //   const { getMessaging, getToken } = await import(
              //     "firebase/messaging"
              //   );
              //   const messaging = getMessaging();
              //   return getToken(messaging, {
              //     vapidKey:
              //       "BBFcOUGMSnoiIZoky6rxhIbDRs4508lgo0ZVJ769KFmL_xk-e7BaxorUl1TWaP0InoBk3nN4Yc-ElbBV9u-EMHo",
              //   })
              //     .then(async (token) => {
              //       if (token) {
              //         const userRef = doc(getFirestore(), "users", userUid);
              //         return updateDoc(userRef, {
              //           firebaseMessagingTokens: arrayRemove(token),
              //         }).then(() => {
              //           return token;
              //         });
              //       }
              //     })
              //     .catch((err) => console.log(err));
              // };
              // if (userReference?.current) {
              //   const removeToken = removeTokenFromDb(
              //     userReference?.current?.uid
              //   );
              // }
              if (unsubscribeRef.current) {
                userReference.current = undefined;
                unsubscribeRef.current();
                notFirstTimeReference.current = undefined;
              }
              return false;
            }
          });
        }
      )
      .catch((err) => console.log(err));
  };
  // Checks that user state has changed and then creates or destroys cookie with Firebase token.
  useEffect(() => {
    // window.addEventListener("beforeinstallprompt", (e) => {
    //   e.preventDefault();
    //   dispatch(setInstallPrompt(e));
    // });
    getUser();
    const unsubscribe = getAuth(firebaseApp).onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        nookies.set(undefined, "__session", token, {
          path: "/",
          sameSite: true,
        });
      } else {
        nookies.set(undefined, "__session", null, {
          path: "/",
          sameSite: true,
        });
      }
    });
    const handle = setInterval(async () => {
      if (getAuth(firebaseApp)) {
        const currentUser = getAuth(firebaseApp)?.currentUser;
        try {
          if (currentUser) await currentUser.getIdToken(true);
        } catch (err) {
          console.log(err);
        }
      }
    }, 10 * 60 * 1000);
    // clean up setInterval
    return () => clearInterval(handle);
  }, []);
  return <>{children}</>;
};

export default UserProvider;
