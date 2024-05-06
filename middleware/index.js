import("express") ;

const jwt = require('jsonwebtoken')

const { initializeApp } = require("firebase/app");

const { getFirestore, collection, getDocs } = require("firebase/firestore");
const { customResponse } = require("../utils");

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


/**
 * 
 * @param {Express.Request} request 
 * @param {Express.Response} response 
 * @param {*} next 
 */
async function auth(request, response, next) {

  const { authorization}  = request.headers ;

  console.log({authorization});
  console.log('checking checking' , authorization);
  
  
  if(!authorization) return customResponse(response , 501 , false , 'u must send token' , null);
  
  console.log('checking checking' , authorization);

  const token = authorization ;

  const secret = process.env.SECRET_KEY ;

  try {
    
    const result = jwt.verify(token , secret) ;

    console.log({result});
  }
  catch (err) {

    console.log({err});

    return customResponse(response , 501 , false , 'token expired' , {
      subject:'token_expired' ,
      content:{
        type:'' ,
        data:null ,
      }
    });

  }


  // console.log({result});

  next();
}

// async function

async function checkIfUserExists(request, response, next) {
  const { username, email } = request.body;

  const userCollection = collection(fireStore, "users");
  const usersSnapShot = await getDocs(userCollection);

  let docs = usersSnapShot.docs;

  docs = docs.map((elem) => elem.data());

  if (docs.length) {
    if (docs.filter((elem) => elem.email === email).length)
      return response.status(501).json({
        status: false,
        message: "sorry , such user email alredy exists",
        payload: { subject: "email" },
      });

    if (docs.filter((elem) => elem.username === username).length)
      return response.status(501).json({
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
