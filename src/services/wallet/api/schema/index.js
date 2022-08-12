const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let walletSchema = new Schema({
    address: String,
    user_id: [{type:Schema.Types.ObjectId, ref:'User'}], 
    currency_id: String
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('wallet', walletSchema);
