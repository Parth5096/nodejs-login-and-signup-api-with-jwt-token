const { badRequest , internalServerError, notFound } = require('../../../common/constants.ts');

const variantService = require('./dm_layer/index.ts');

// create a new Variants.
exports.variants_create = function (req, res) {
    // validate request
    if(!req.body.variantName) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter variants serviceType "
        });
    }

   

    // save variants in the database.
    variantService.Create(req)
        .then(data => {
            res.send({
                success: true,
                message: 'Variants successfully created',
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while creating the variants."
        });
    });
};

// retrieve and return all variantss.
exports.all_variants= (req, res) => {
    variantService.FindAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No variants found!";
            else message = 'Variants successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while retrieving variants"
        });
    });
};

// find a single variants with a id.
exports.variants_details = (req, res) => {
    variantService.FindById(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Variants not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Variants successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(notFound).send({
                success: false,
                message: "Variants not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error retrieving variants with id " + req.params.id
        });
    });
};

// update a variants  by the id.
exports.variants_update = (req, res) => {
    // validate request
    if(!req.body.variantName) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter variants name "
        });
    }

    // find variants and update
   variantService.Update(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Variants not found with id " + req.params.id
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
                message: "Variants not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error updating variants with id " + req.params.id
        });
    });
};

// delete a variants with the specified id.
exports.variants_delete = (req, res) => {
    variantService.Delete(req)
        .then(data => {
            if (!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Variants not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Variants successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(notFound).send({
                success: false,
                message: "Variants not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Could not delete variants with id " + req.params.id
        });
    });
};