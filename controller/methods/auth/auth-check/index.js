const { customResponse } = require("../../../../utils");


async function authCheck(request, response) {

  return customResponse(response, 200, true, "hello from check" , {
    content: {
      type: "feedback",
      data: 'null',
    },
    subject: null,
  });
}

module.exports = {
  authCheck ,
};


