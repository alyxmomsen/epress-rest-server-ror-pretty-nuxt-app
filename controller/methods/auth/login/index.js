const jwt = require("jsonwebtoken");
const { customResponse } = require("../../../../utils");
const { getDocs, collection } = require("firebase/firestore");
const fireStore = require("../../../../db");

const bcrypt = require("bcrypt");

async function login(request, response) {
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

    
    if(!usersByEmail.length > 1) return customResponse(response , 500 ,false , "internal error , sorry about that" , null);

    const theUser = usersByEmail[0] ;
   
    const passwordhash = theUser.password ;

    console.log({passwordhash});

    const rresult= bcrypt.compareSync(password  , passwordhash)

  if (!rresult)
    return customResponse(response, 400, false, "wrong password", {
      content: {
        type: "users_list",
        data: users,
      },
      subject: "password",
    });

  const SECRET_KEY = process.env.SECRET_KEY || "MY-SECRET-KEY";

  const token = jwt.sign({ userID: theUser.id }, SECRET_KEY, {
    expiresIn: "20s",
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
}

module.exports = login;
