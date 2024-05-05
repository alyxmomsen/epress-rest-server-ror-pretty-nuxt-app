const { Router, response } = require("express");
const { checkIfUserExists } = require("../middleware");

const jwt = require("jsonwebtoken");

const router = new require("express").Router();

const { initializeApp } = require("firebase/app");

const {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  addDoc,
} = require("firebase/firestore");

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

router.get("/auth-chek" , async (request , response) => {


  return customResponse(response , 501 , true , 'hello from check' , {
    content:{
      type:'check' ,
      data:{
        firstname:'john' ,
        lastname:'doe' ,
      }
    } ,
    subject:null
  });
});

router.post("/login", async (request, response) => {
  const body = request.body;

  if (!body)
    return response.status(418).json({
      status: false,
      message: "the body object could not be parsed",
      payload: null,
    });

  const { password, email } = body;

  if (!password || !email)
    return response.status(401).json({
      status: false,
      message: " you must provide both your PASSWORD and EMAIL address",
      payload: null,
    });

  const usersCollection = collection(fireStore, "users");

  const usersSnapshot = await getDocs(usersCollection);

  const users = usersSnapshot.docs.map((elem) => ({
    ...elem.data(),
    id: elem.id,
  }));
  // const users = usersSnapshot.docs.map((elem) => elem.);

  if (!users.length)
    return customResponse(response, 400, false, "that user not registred", {
      content: {
        type: "users_list",
        data: users,
      },
      subject: null,
    });

  const usersByEmail = users.filter((elem) => elem.email === email);

  if (!usersByEmail.length)
    return customResponse(response, 400, false, "wrong email", {
      content: {
        type: "users_list",
        data: users,
      },
      subject: "email",
    });

  const userFiltredByPassword = usersByEmail.filter(
    (elem) => elem.password === password,
  );

  if (!userFiltredByPassword.length)
    return customResponse(response, 400, false, "wrong password", {
      content: {
        type: "users_list",
        data: users,
      },
      subject: "password",
    });

  if (userFiltredByPassword.length > 1)
    return customResponse(response, 500, false, "enternal error", null);

  const SECRET_KEY = process.env.SECRET_KEY || "MY-SECRET-KEY";

  const token = jwt.sign({ userID: userFiltredByPassword[0].id }, SECRET_KEY, {
    expiresIn: "10s",
    // algorithm:'ES256'
  });

  return customResponse(
    response,
    200,
    true,
    "it s okay , u authorized , catch the token",
    {
      content: {
        type: "access_token",
        data: token,
      },
      subject: null,
    },
  );
});

router.post("/registration", checkIfUserExists, async (request, response) => {
  const body = request.body;

  if (!body)
    return customResponse(
      response,
      209,
      false,
      "sorry , you have no body",
      null,
    );

  const { username, email, password } = body;

  console.log({ username, email, password });

  if (!password || password == "" || password == " ")
    return customResponse(
      response,
      509,
      false,
      "sorry , you have NO PASSWORD",
      null,
    );

  const userCollection = collection(fireStore, "users");

  const addedResult = await addDoc(userCollection, {
    username,
    password,
    email,
  });

  console.log({ addedResult: addedResult.id });

  return customResponse(
    response,
    209,
    true,
    "user registered successful",
    null,
  );
});

/**
 *
 * my custom response
 *
 * @param { Express.Response} response
 * @param { boolean } customStatus
 * @param { string } message
 * @param { {subject:string , content:{type:string , data:any}} | null} payload
 * @returns { void }
 */

function customResponse(response, htttpStatus, customStatus, message, payload) {
  const data = {
    status: customStatus,
    message,
    payload,
  };

  return response.status(htttpStatus).json(data);
}

module.exports = {
  router,
  customResponse,
};
