const { customResponse } = require("../../../utils");

const hooks = [];

async function notifications(request, response) {
  

  const res = await (async () => new Promise(executor))();

  return customResponse(response, 200, true, "notify", {
    subject: "notify",
    content: {
      type: "noify",
      data: {
        username: res,
      },
    },
  });
}

const useResolvers = () => hooks;

module.exports = {
  notifications,
  useResolvers,
};

/**
   *
   * @param {(username:string) => void} resolve
   * @param {*} reject
   */

function executor(resolve, reject) {
  console.log({ executor: "executors" });
  const resolver = (payload) => {
    resolve(payload);
  };

  console.log('pushing');

  hooks.push(resolver);
}
