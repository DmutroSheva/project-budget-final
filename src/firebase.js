// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAdhPJUbGZIHMLkCcY7qRvY_udp9HbDtIo",
  authDomain: "vue-project-e8059.firebaseapp.com",
  projectId: "vue-project-e8059",
  storageBucket: "vue-project-e8059.appspot.com",
  messagingSenderId: "972667463405",
  appId: "1:972667463405:web:1b9cec30986f729f2a8ee4",
  measurementId: "G-Y64T1TDWB5"
};

  const firebaseApp = initializeApp(firebaseConfig);
  const analytics = getAnalytics(firebaseApp);


export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export {analytics};
