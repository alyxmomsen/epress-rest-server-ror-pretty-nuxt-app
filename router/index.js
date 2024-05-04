const { Router, response } = require("express");
const { checkIfUserExists } = require("../middleware");

const router = new require("express").Router();

// data base 


const { initializeApp } = require("firebase/app");

const { getFirestore, collection, getDocs, setDoc, addDoc } = require("firebase/firestore");

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

// routes 


router.get("/login", async (request, response) => {
  response.status(200).json("login");
});

router.post("/registration", checkIfUserExists, async (request, response) => {
  const body = request.body;

  if (!body)
    return CustomResponse(response, 209, "sorry , you have no body", null);

  const { username, email, password } = body;

  console.log({ username, email, password });

  if (!password || password == "" || password == " ")
    return CustomResponse(response, 509, "sorry , you have NO PASSWORD", null);

  const userCollection = collection(fireStore , 'users');

  const addedResult = await addDoc(userCollection , {
    username ,
    password ,
    email ,
  });

  console.log({addedResult:addedResult.id});

  return CustomResponse(response, 209, "user registered successful", null);
});

module.exports = router;

function CustomResponse(response, status, message, payload) {
  const data = {
    status,
    message,
    payload,
  };

  return response.status(209).json(data);
}
