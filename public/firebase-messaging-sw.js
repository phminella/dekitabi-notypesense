// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseMessaging = () => {
  console.log("notification permitted????????", "firebase-messaging-sw.js");
  importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
  importScripts(
    "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
  );
  firebase.initializeApp({
    apiKey: "AIzaSyCYzcnQvFLD0CY0i5ZSybuS-D4g6WNSd4k",
    authDomain: "dekitabi.com",
    databaseURL:
      "https://dekitabi-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dekitabi",
    storageBucket: "dekitabi.appspot.com",
    messagingSenderId: "105427367185",
    appId: "1:105427367185:web:33d3ff24032c75cd0e48b0",
  });
  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage((payload) => {
    // Customize notification here
    // const notificationTitle = payload.notification.title;
    // const notificationOptions = {
    //   body: payload.notification.body,
    //   icon: "https://www.dekitabi.com/img/favicon/icon-128x128.png",
    // };
    // self.registration.showNotification(
    //   notificationTitle,
    //   notificationOptions
    // );
  });
};
firebaseMessaging();
