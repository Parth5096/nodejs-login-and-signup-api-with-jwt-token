// include inventory model
const Inventory = require('../api/schema/index.ts');

const InventoryService = {
  FindAll: () => {
    return Inventory.find();
  },

  Create: (req) => {
    // create a Inventory
    let inventory = new Inventory({
      skuId: req.body.skuId,
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
      quantity: req.body.quantity,
      ShippingInfo: req.body.ShippingInfo,
    });

    return inventory.save();
  },

  Details: (req) => {
    return Inventory.findById(req.params.id);
  },

  Update: (req) => {
    return Inventory.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
  },

  Delete: (req) => {
    return Inventory.findByIdAndRemove(req.params.id);
  },
};

module.exports = InventoryService;
