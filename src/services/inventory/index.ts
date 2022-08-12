const {
  badRequest,
  internalServerError,
  notFound,
} = require('../../../common/constants.ts');

const InventoryService = require('./dm_layer/index.ts');

// create a new inventory.
exports.inventory_create = function (req, res) {
  // validate request
  if (!req.body) {
    return res.status(badRequest).send({
      success: false,
      message: 'Please enter a valid body',
    });
  }

  // save inventory in the database.
  InventoryService.Create(req)
    .then((data) => {
      res.send({
        success: true,
        message: 'Inventory Created Successfully',
        data: data,
      });
    })
    .catch((err) => {
      res.status(internalServerError).send({
        success: false,
        message:
          err.message || 'Some error occurred while creating the inventory.',
      });
    });
};

// retrieve and return all inventories
exports.all_inventory = (req, res) => {
  console.log('Getting all inventories');
  InventoryService.FindAll()
    .then((data) => {
      var message = '';
      if (data === undefined || data.length == 0)
        message = 'No inventory Found';
      else message = 'Inventory Found';

      res.send({
        success: true,
        message: message,
        data: data,
      });
    })
    .catch((err) => {
      res.status(internalServerError).send({
        success: false,
        message:
          err.message || 'Some error occurred while retrieving inventory',
      });
    });
};

// find a single order with a id.
exports.inventory_details = (req, res) => {
  InventoryService.Details(req)
    .then((data) => {
      if (!data) {
        return res.status(notFound).send({
          success: false,
          message: 'Inventory not found with id ' + req.params.id,
        });
      }
      res.send({
        success: true,
        message: 'Inventory successfully retrieved',
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(notFound).send({
          success: false,
          message: 'Inventory not found with id ' + req.params.id,
        });
      }
      return res.status(internalServerError).send({
        success: false,
        message: 'Error retrieving Inventory with id ' + req.params.id,
      });
    });
};

// update a inventory  by the id.
exports.inventory_update = (req, res) => {
  // validate request
  if (!req.body) {
    return res.status(badRequest).send({
      success: false,
      message: 'Please enter inventory update details',
    });
  }

  // find order and update
  InventoryService.Update(req)
    .then((data) => {
      if (!data) {
        return res.status(notFound).send({
          success: false,
          message: 'inventory not found with id ' + req.params.id,
        });
      }
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(notFound).send({
          success: false,
          message: 'Inventory not found with id ' + req.params.id,
        });
      }
      return res.status(internalServerError).send({
        success: false,
        message: 'Error updating inventory with id ' + req.params.id,
      });
    });
};

// delete a Inventory with the specified id.
exports.inventory_delete = (req, res) => {
  InventoryService.Delete(req)
    .then((data) => {
      if (!data) {
        return res.status(notFound).send({
          success: false,
          message: 'Inventory not found with id ' + req.params.id,
        });
      }
      res.send({
        success: true,
        message: 'Inventory successfully deleted!',
      });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(notFound).send({
          success: false,
          message: 'Inventory not found with id ' + req.params.id,
        });
      }
      return res.status(internalServerError).send({
        success: false,
        message: 'Could not delete Inventory with id ' + req.params.id,
      });
    });
};
