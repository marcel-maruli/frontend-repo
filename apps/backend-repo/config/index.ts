import { initializeApp, ServiceAccount, cert } from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

/**
 * Uncomment this import below
 */
// import serviceAccount from "./serviceAccount.ts.example"

// Firebase configuration
const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  /**
   * Uncomment this credential below
   */
  
  // credential: cert(serviceAccount as ServiceAccount),
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

export { getFirestore, fire };
