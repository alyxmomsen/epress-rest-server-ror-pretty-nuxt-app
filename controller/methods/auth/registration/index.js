const { collection, addDoc } = require("firebase/firestore");
const fireStore = require("../../../../db");
const { customResponse } = require("../../../../utils");


const bcrypt = require('bcrypt');





// const resolvers = result();

// console.log(result);

/**
 *
 * @param {Express.Request} request
 * @param {Express.Response} response
 * @returns {void}
 */

async function registration(request, response) {

  const { useResolvers } = require("../../notifycations");
  const hooks = useResolvers();

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

  const hash = bcrypt.hashSync(password , 10);

  // const result = bcrypt.compareSync(password , hash);

  // console.log({hash , result});

  const addedResult = await addDoc(userCollection, {
    username,
    password:hash,
    email,
  });

  console.log({ addedResult: addedResult });

  // hook

  // console.log();

  hooksExecutor(hooks , username);

  // success

  return customResponse(
    response,
    209,
    true,
    "user registered successful",
    null,
  );
}


/**
 * 
 * @param {any} payload - полезная нагрузка для вывода сообщения
 * @description обрабатывает глобальный массив  хуков 
 * состоящих из Promise executor resolve калбеков
 */
function hooksExecutor(hooks ,payload) {

  console.log({hooks});

  /**
   * 
   * @param {(value:any) => void} hook - Promise executor resolve callback 
   * @returns 
   */

  const callbackfn = (hook) => hook(payload);

  hooks.forEach(callbackfn);

  console.log("registration success");
}

module.exports = {
  registration,
};
