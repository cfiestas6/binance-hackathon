import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    idUser: {
        type: String
    },
    User_address: {
        type: String
    }
})

module.exports = mongoose.model.User || mongoose.model('User', Schema);