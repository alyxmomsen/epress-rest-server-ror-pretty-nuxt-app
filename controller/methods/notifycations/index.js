const { customResponse } = require("../../../utils");


const hooks = [] ;

async function notifications (request , response) {


    const res = await (async () => new Promise((resolve) => {

        const resolver = (payload) => {
          resolve(payload);
        }
    
        hooks.push(resolver);
    
      }))()

    return customResponse(response , 200 , true , 'notify' , null);
    
}

function useResolvers () {

    return hooks ;
  }

module.exports = {
    notifications ,
    useResolvers
} ;