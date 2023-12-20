import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken as getMessagingToken,
  onMessage as onMessagingMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDbov1qAXe8nsLUm-9pcm-8YvkOEQt7LBw",
  authDomain: "foolishfashionstore-384509.firebaseapp.com",
  projectId: "foolishfashionstore-384509",
  storageBucket: "foolishfashionstore-384509.appspot.com",
  messagingSenderId: "136237959521",
  appId: "1:136237959521:web:3dba2e23e8afcd97935d20",
  measurementId: "G-CEFGB8JXXP",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getToken = (setTokenFound) => {
  return getMessagingToken(messaging, {
    vapidKey:
      "BFrIMEXZoFPcJI4YFlc6w66mH-pXAkll6w5kBjRqVE1-QodRpRwztazNfDCcK5rDnEAHnZldVqTBrKEt1wX8Odg",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessage = (callback) => {
  onMessagingMessage(messaging, (payload) => {
    console.log("Message received. Payload:", payload);
    // Do something with the payload, e.g., show a notification
    if (typeof callback === "function") {
      callback(payload);
    }
  });
};
