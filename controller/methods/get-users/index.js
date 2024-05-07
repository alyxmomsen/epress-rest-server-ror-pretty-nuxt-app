const { getDocs, collection } = require("firebase/firestore");
const fireStore = require("../../../db");
const { customResponse } = require("../../../utils");

async function getUsers (request , response) {

    // fireStore

    const usersCollection = collection(fireStore , 'users');
    const usersSnapShot = await getDocs(usersCollection) ;
    const users = usersSnapShot.docs.map(elem => ({...elem.data() , id:elem.id})) ;

    return customResponse(response , 200 , true , 'get users' , {
        subject:'users' ,
        content:{
            type:'the users array' ,
            data:(users && users instanceof Array) ? users : []
        }
    });
}

module.exports = {
    getUsers ,
}