const { getDocs, collection, deleteDoc, doc } = require("firebase/firestore");
const fireStore = require("../../../db");
const { customResponse } = require("../../../utils");

async function deleteUsers (request , response) {

    // fireStore

    const props = request.query ;

    console.log({props});

    const userId = props.userId ;

    // const data = request.data ;

    // if(!data) return customResponse(response , 500 , false , 'internal error' , null);

    // const userId = data.userId ;

    if(!userId) return customResponse(response , 401 , false , 'you must provide user id' , null);

    // const usersCollection = collection(fireStore , 'users');
    // const usersSnapShot = await getDocs(usersCollection) ;

    const docRef = doc(fireStore , 'users' , userId);

    console.log({docRef});

    const deletedDoc = await deleteDoc(docRef);

    // const users = usersSnapShot.docs.map(elem => ({...elem.data() , id:elem.id})) ;

    return customResponse(response , 200 , true , 'user deleted' , null);
}

module.exports = {
    deleteUsers ,
}