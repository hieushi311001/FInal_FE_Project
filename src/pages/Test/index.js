import { useEffect } from "react";
import { getToken, onMessage } from "~/firebase_setup/firebase.js";

function Test() {
  useEffect(() => {
    // Get FCM token when component mounts
    getToken((isTokenFound) => {
      if (isTokenFound) {
        // Token retrieved successfully, you can perform additional actions if needed
      } else {
        // Token retrieval failed or permission is required
      }
    });

    // Set up message listener
    onMessage((payload) => {
      // Handle incoming message payload
      console.log("Message received in component:", payload);
    });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Your component rendering logic...
}

export default Test;
