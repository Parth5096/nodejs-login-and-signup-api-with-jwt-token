const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let inventorySchema = new Schema(
  {
    skuId: { type: String, max: 100 },
    createdBy: { type: String, max: 100 },
    updatedBy: { type: String, max: 100 },
    quantity: { type: Number },
    shippingInfo: { type: String, max: 300 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Inventory', inventorySchema);
