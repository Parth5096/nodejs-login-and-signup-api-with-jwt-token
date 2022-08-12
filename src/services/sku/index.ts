const { badRequest , internalServerError, notFound } = require('../../../common/constants.ts');
// include sku model
const  SkuService = require('./dm_layer/index.ts');
// create a new SKU.

exports.sku_create = function (req, res) {
    // validate request
    if(!req.body.name) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter sku serviceType "
        });
    }

    

    // save sku in the database.
    SkuService.Create(req)
        .then(data => {
            res.send({
                success: true,
                message: 'SKU successfully created',
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while creating the sku."
        });
    });
};

// retrieve and return all skus.
exports.all_skus= (req, res) => {
    SkuService.FindAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No sku found!";
            else message = 'SKU successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while retrieving sku"
        });
    });
};

// find a single sku with a id.
exports.sku_details = (req, res) => {
    SkuService.FindById(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "SKU not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'SKU successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(notFound).send({
                success: false,
                message: "SKU not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error retrieving sku with id " + req.params.id
        });
    });
};

// update a sku  by the id.
exports.sku_update = (req, res) => {
    // validate request
    if(!req.body.name) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter sku serviceType "
        });
    }

    // find sku and update
    SkuService.Update(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "SKU not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(notFound).send({
                success: false,
                message: "SKU not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error updating sku with id " + req.params.id
        });
    });
};

// delete a sku with the specified id.
exports.sku_delete = (req, res) => {
   SkuService.Delete(req)
        .then(data => {
            if (!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "SKU not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "SKU successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(notFound).send({
                success: false,
                message: "SKU not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Could not delete sku with id " + req.params.id
        });
    });
};