require('dotenv').config({path:'.env.example'})

const  { initializeApp } = require("firebase/app")
const { getAnalytics } = require("firebase/analytics")

const firebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE,
  authDomain:process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MASSAGE_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID
};

// Initialize Firebase
const appFB = initializeApp(firebaseConfig);
// const analytics = getAnalytics(appFB);

module.exports = {appFB}