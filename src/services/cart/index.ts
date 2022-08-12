const { badRequest , internalServerError, notFound } = require('../../../comman/constants.ts');

const CartService = require('./dm_layer/index.ts')

// create a new Cart.
exports.cart_create = function (req, res) {
    // validate request
    if(!req.body.status) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter cart name "
        });
    }

    

    // save cart in the database.
    CartService.Create(req)
        .then(data => {
            res.send({
                success: true,
                message: 'Cart successfully created',
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while creating the cart."
        });
    });
};

// retrieve and return all cart.
exports.all_cart= (req, res) => {
    CartService.FindAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No cart found!";
            else message = 'Cart successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while retrieving cart"
        });
    });
};

// find a single cart with a id.
exports.cart_details = (req, res) => {
    CartService.Details(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Cart not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Cart successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(notFound).send({
                success: false,
                message: "Cart not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error retrieving cart with id " + req.params.id
        });
    });
};

// update a cart  by the id.
exports.cart_update = (req, res) => {
    // validate request
    if(!req.body.status ) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter cart name "
        });
    }

    // find cart and update
    CartService.Update(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Cart not found with id " + req.params.id
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
                message: "Cart not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error updating cart with id " + req.params.id
        });
    });
};

// delete a cart with the specified id.
exports.cart_delete = (req, res) => {
   CartService.Delete(req)
        .then(data => {
            if (!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Cart not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Cart successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(notFound).send({
                success: false,
                message: "Cart not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Could not delete cart with id " + req.params.id
        });
    });
};