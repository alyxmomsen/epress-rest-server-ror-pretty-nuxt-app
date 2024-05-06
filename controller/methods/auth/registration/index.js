const { collection, addDoc } = require("firebase/firestore");
const fireStore = require("../../../../db");
const { customResponse } = require("../../../../utils");
const { useResolvers } = require("../../notifycations");



const hooks = useResolvers();

// const resolvers = result();

// console.log(result);

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {void}
 */

async function registration(request, response) {
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

  // hook

  hooksExecutor(addedResult);

  // success

  return customResponse(
    response,
    209,
    true,
    "user registered successful",
    null,
  );
}


function hooksExecutor(payload) {

  hooks.forEach(hook => hook(payload));

  console.log("registration success");
}

module.exports = {
  registration ,
};

