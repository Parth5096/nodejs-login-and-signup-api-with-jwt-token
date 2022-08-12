const { badRequest , internalServerError, notFound } = require('../../../common/constants.ts');

const OrderService = require('./dm_layer/index.ts')

// create a new order.
exports.order_create = function (req, res) {
    // validate request
    if(!req.body.userId) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter a valid userId "
        });
    }

    

    // save order in the database.
    OrderService.Create(req)
        .then(data => {
            res.send({
                success: true,
                message: 'Order Created Successfully',
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while creating the order."
        });
    });
};

// retrieve and return all order.
exports.all_order= (req, res) => {
    OrderService.FindAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No Order Found";
            else message = 'Order Found';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while retrieving order"
        });
    });
};

// find a single order with a id.
exports.order_details = (req, res) => {
    OrderService.Details(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Order not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Order successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(notFound).send({
                success: false,
                message: "Order not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error retrieving Order with id " + req.params.id
        });
    });
};

// update a order  by the id.
exports.order_update = (req, res) => {
    // validate request
    if(!req.body.status ) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter order name "
        });
    }

    // find order and update
    OrderService.Update(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "order not found with id " + req.params.id
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
                message: "Ordere not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error updating order with id " + req.params.id
        });
    });
};

// delete a Order with the specified id.
exports.order_delete = (req, res) => {
   OrderService.Delete(req)
        .then(data => {
            if (!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Order not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Order successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(notFound).send({
                success: false,
                message: "Order not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Could not delete Order with id " + req.params.id
        });
    });
};
