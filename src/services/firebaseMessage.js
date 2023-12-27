import { useEffect } from "react";
import { getToken, onMessage } from "~/firebase_setup/firebase.js";
import { showInfoNotification } from "./NotificationUtils";

const fcmServerKey =
  "AAAAH7hqSWE:APA91bGqmPdUdqwem730s38CXslW7ayoQLke4NQ9OXEGLAvAKodv7_PBXhlvHnc8g4g35uj3lGv_rU6war90LHk74luKiFSvpK0GuVK4_gZXSUHF4yMnLzcy8bZoi8RZYIfvKbWaAxuC"; // Replace with your FCM server key
export const initializeMessaging = async (user, method) => {
  try {
    const token = await getToken();
    console.log("Token:", token);

    const topic = user;
    if (method === "subscribe") {
      subscribeTokenToTopic(token, topic);
    } else {
      unsubscribeTokenToTopic(token, topic);
    }
  } catch (error) {
    console.error("Error initializing messaging:", error);
  }
};

// Set up message listener
onMessage((payload) => {
  console.log("Message received in component:", payload);
  showInfoNotification(payload.notification.title, payload.notification.body);
});
const subscribeTokenToTopic = (token, topic) => {
  console.log("sub");
  if (topic !== undefined) {
    fetch(
      "https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic,
      {
        method: "POST",
        headers: new Headers({
          Authorization: "key=" + fcmServerKey,
        }),
      }
    )
      .then((response) => {
        if (response.status < 200 || response.status >= 400) {
          throw (
            "Error subscribing to topic: " +
            response.status +
            " - " +
            response.text()
          );
        }
        console.log('Subscribed to "' + topic + '"');
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
export const unsubscribeTokenToTopic = (token, topic) => {
  console.log("unsub");
  if (topic !== undefined) {
    // Construct the URL for unsubscribing from the specified topic
    const url = "https://iid.googleapis.com/iid/v1:batchRemove";

    // Prepare the payload for the POST request
    const payload = {
      to: "/topics/" + topic,
      registration_tokens: [token],
    };

    // Perform a POST request to unsubscribe the token from the topic
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "key=" + fcmServerKey, // Include FCM server key in the Authorization header
      }),
      body: JSON.stringify(payload), // Convert the payload to JSON format
    })
      .then((response) => {
        // Check the response status
        if (response.status < 200 || response.status >= 400) {
          // Throw an error if the response status indicates an issue
          throw (
            "Error subscribing to topic: " +
            response.status +
            " - " +
            response.text()
          );
        }
        // Log success if the operation is successful
        console.log('Unsubscribed from "' + topic + '"');
      })
      .catch((error) => {
        // Log and handle any errors that occur during the fetch operation
        console.error(error);
      });
  }
};
