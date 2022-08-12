const { badRequest , internalServerError, notFound } = require('../../../comman/constants.ts');

const spService = require('./dm_layer/index.ts')

// create a new ServiceProvider.
exports.serviceProvider_create = function (req, res) {
    // validate request
    if(!req.body.serviceType) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter serviceProvider serviceType "
        });
    }

    

    // save serviceProvider in the database.
    spService.Create(req)
        .then(data => {
            res.send({
                success: true,
                message: 'ServiceProvider successfully created',
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while creating the serviceProvider."
        });
    });
};

// retrieve and return all serviceProviders.
exports.all_serviceProviders= (req, res) => {
    spService.FindAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No serviceProvider found!";
            else message = 'ServiceProvider successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while retrieving serviceProvider"
        });
    });
};

// find a single serviceProvider with a id.
exports.serviceProviders_details = (req, res) => {
    spService.FindById(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "ServiceProvider not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'ServiceProvider successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(notFound).send({
                success: false,
                message: "ServiceProvider not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error retrieving serviceProvider with id " + req.params.id
        });
    });
};

// update a serviceProvider  by the id.
exports.serviceProvider_update = (req, res) => {
    // validate request
    if(!req.body.serviceType ) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter serviceProvider serviceType "
        });
    }

    // find serviceProvider and update
    spService.Update(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "ServiceProvider not found with id " + req.params.id
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
                message: "ServiceProvider not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error updating serviceProvider with id " + req.params.id
        });
    });
};

// delete a serviceProvider with the specified id.
exports.serviceProvider_delete = (req, res) => {
   spService.Delete(req)
        .then(data => {
            if (!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "ServiceProvider not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "ServiceProvider successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(notFound).send({
                success: false,
                message: "ServiceProvider not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Could not delete serviceProvider with id " + req.params.id
        });
    });
};