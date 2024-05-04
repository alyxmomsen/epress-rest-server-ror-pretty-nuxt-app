const { initializeApp } = require("firebase/app");

const { getFirestore, collection, getDocs } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAvWDq-aHova7lPIXasdlzht7WhRKj6n0I",
  authDomain: "pro-base-2f7d7.firebaseapp.com",
  projectId: "pro-base-2f7d7",
  storageBucket: "pro-base-2f7d7.appspot.com",
  messagingSenderId: "419680975130",
  appId: "1:419680975130:web:858424ea0b109328bd14a3",
  measurementId: "G-GQ53LDJVQR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireStore = getFirestore(app);

async function auth(request, response, next) {
  next();
}

async function checkIfUserExists(request, response, next) {
  const { username, email } = request.body;

  const userCollection = collection(fireStore, "users");
  const usersSnapShot = await getDocs(userCollection);

  let docs = usersSnapShot.docs;

  docs = docs.map((elem) => elem.data());

  if (docs.length) {
    if (docs.filter((elem) => elem.email === email).length)
      return response
        .status(501)
        .json({
          status: false,
          message: "sorry , such user email alredy exists",
          payload: { subject: "email" },
        });

    if (docs.filter((elem) => elem.username === username).length)
      return response
        .status(501)
        .json({
          status: false,
          message: "sorry , such USER - NAME alredy exists",
          payload: { subject: "username" },
        });
  }

  next();
}

module.exports = {
  auth,
  checkIfUserExists,
};
