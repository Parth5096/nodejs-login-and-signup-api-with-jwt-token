const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CartLineSchema = new Schema({
    quantity: {type: String, required: true, max: 25},
    skuId: [{type:Schema.Types.name, ref:'SKU'}],
    priceData: {type: String, required: true, max: 50},
    weight: {type: Number, required: true,min:10},
    options: [{type:String, max:25,required:true}],
    lineItemType: {type: String, max: 25},
    
},{
    timestamps: true
});

// Export the model
module.exports = mongoose.model('CareLineItem', CartLineSchema);