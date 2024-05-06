const { customResponse } = require("../../../../utils");

const hooks = [] ;

async function authCheck(request, response) {


  const p = () => new Promise((resolve) => {

    const resolver = (message) => {
      resolve('hello from my resolver : ' + message);
    }

    hooks.push(resolver);

  })

  const res = await p()


  console.log('auth-check response: ' , res);


  return customResponse(response, 501, true, "hello from check" , {
    content: {
      type: "check",
      data: {
        firstname: "john",
        lastname: "doe",
      },
    },
    subject: null,
  });
}

const waiting = async () => {


  return new Promise((res , rej) => {

  }) ;

}


function useResolvers () {

  return hooks ;
}

module.exports = {
  authCheck ,
  useResolvers
};


