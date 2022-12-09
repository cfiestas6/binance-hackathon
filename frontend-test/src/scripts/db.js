const mongoose = require("mongoose");
const {Schema, model} = mongoose 


const userSchema = new Schema({
    idUser: String,
    address: String
})
const User = model('User', userSchema)

function createUser(id, address){
    mongoose.connect("mongodb+srv://hereticsbinance:prueba123@cluster1.8bkbmjo.mongodb.net/?retryWrites=true&w=majority")
    const user = new User({
        idUser: id,
        address: address
    })
    user.save()
    .then(res =>{
        //console.log(res)
        mongoose.connection.close()
    }).catch(err =>{
        console.error(err)
    })
}

//createUser('54323','0x388a244FC351e4C77F778F1B63CdB8f200616434')

/*User.find({
    idUser: '54323'
}).then(res =>{
    console.log(res[0].address)
    mongoose.connection.close()
})

/*const user = new User({
    idUser: '253156717',
    address: '0x388a244FC351e4C77F778F1B63CdB8f200616434'
})

user.save()
    .then(res =>{
        console.log(res)
        mongoose.connection.close()
    }).catch(err =>{
        console.error(err)
    })
*/

export default createUser;
