// import { useEffect } from "react";
// import { getToken, onMessage } from "~/firebase_setup/firebase.js";

// const fcmServerKey =
//   "AAAAH7hqSWE:APA91bGqmPdUdqwem730s38CXslW7ayoQLke4NQ9OXEGLAvAKodv7_PBXhlvHnc8g4g35uj3lGv_rU6war90LHk74luKiFSvpK0GuVK4_gZXSUHF4yMnLzcy8bZoi8RZYIfvKbWaAxuC"; // Replace with your FCM server key

// function Test() {
//   useEffect(() => {
//     const initializeMessaging = async () => {
//       try {
//         const token = await getToken();
//         console.log("Token:", token);

//         const topic = "minhhieu";

//         // Assuming you want to subscribe the token directly to a topic using the server key
//         subscribeTokenToTopic(token, topic);
//       } catch (error) {
//         console.error("Error initializing messaging:", error);
//       }
//     };

//     initializeMessaging();

//     // Set up message listener
//     onMessage((payload) => {
//       console.log("Message received in component:", payload);
//     });
//   }, []); // Empty dependency array ensures the effect runs only once on mount
//   const subscribeTokenToTopic = (token, topic) => {
//     fetch(
//       "https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic,
//       {
//         method: "POST",
//         headers: new Headers({
//           Authorization: "key=" + fcmServerKey,
//         }),
//       }
//     )
//       .then((response) => {
//         if (response.status < 200 || response.status >= 400) {
//           throw (
//             "Error subscribing to topic: " +
//             response.status +
//             " - " +
//             response.text()
//           );
//         }
//         console.log('Subscribed to "' + topic + '"');
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
//   // Your component rendering logic...
// }

// export default Test;
