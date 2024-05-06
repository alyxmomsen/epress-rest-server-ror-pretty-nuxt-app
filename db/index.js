const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAvWDq-aHova7lPIXasdlzht7WhRKj6n0I",
  authDomain: "pro-base-2f7d7.firebaseapp.com",
  projectId: "pro-base-2f7d7",
  storageBucket: "pro-base-2f7d7.appspot.com",
  messagingSenderId: "419680975130",
  appId: "1:419680975130:web:858424ea0b109328bd14a3",
  measurementId: "G-GQ53LDJVQR",
};

const app = initializeApp(firebaseConfig);

const fireStore = getFirestore(app);

module.exports = fireStore;
