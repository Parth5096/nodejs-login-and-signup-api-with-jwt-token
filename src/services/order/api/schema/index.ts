const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({
    createDate: {type: String, required: true, max: 100},
    userId:[{type:Schema.Types.ObjectId, ref:'User'}],
    totals:{type:String, max:300},
    billingInfo:{type:String , max:100},
    ShippingInfo:{type:String , max:100},
    paymentStatus:[{type:String , max:100}],
    fulfilmentStatus:[{type:String , max:100}],
    cartId:[{type:Schema.Types.ObjectId, ref:'Cart'}],
    refunds:[{type:String , max:100}],
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('Order', orderSchema);
