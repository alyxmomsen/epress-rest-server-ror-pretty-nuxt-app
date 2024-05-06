const { customResponse } = require("../../../../utils");

const hooks = [] ;

async function authCheck(request, response) {


  const res = await (async () => new Promise((resolve) => {

    const resolver = (payload) => {
      resolve(payload);
    }

    hooks.push(resolver);

  }))()


  // console.log('auth-check response: ' , res);


  return customResponse(response, 501, true, "hello from check" , {
    content: {
      type: "feedback",
      data: res,
    },
    subject: null,
  });
}

function useResolvers () {

  return hooks ;
}

module.exports = {
  authCheck ,
  useResolvers
};


