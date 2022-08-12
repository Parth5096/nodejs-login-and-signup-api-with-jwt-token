const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RegisterUser = new Schema({
    phoneNumber : String,
    password : String,
    userJWTtoken : String
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('UserAuth', RegisterUser);