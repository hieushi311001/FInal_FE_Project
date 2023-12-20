importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDbov1qAXe8nsLUm-9pcm-8YvkOEQt7LBw",
  authDomain: "foolishfashionstore-384509.firebaseapp.com",
  projectId: "foolishfashionstore-384509",
  storageBucket: "foolishfashionstore-384509.appspot.com",
  messagingSenderId: "136237959521",
  appId: "1:136237959521:web:3dba2e23e8afcd97935d20",
  measurementId: "G-CEFGB8JXXP",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Service worker setup
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);
  // Handle the background message, e.g., show a notification
});
