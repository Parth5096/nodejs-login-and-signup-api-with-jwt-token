const { badRequest , internalServerError, notFound } = require('../../../comman/constants.ts');

const CartLineService = require('./dm_layer/index.ts');

// create a new Cartline.
exports.cartline_create = function (req, res) {
    // validate request
    if(!req.body.skuid) {
        return res.status(badRequest).send({
            success: false,
            message: "No cartitem found "
        });
    }

    

    // save cartline in the database.
    CartLineService.Create(req)
        .then(data => {
            res.send({
                success: true,
                message: 'Cartline successfully created',
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while creating the cartline."
        });
    });
};

// retrieve and return all cart.
exports.all_cartline= (req, res) => {
    CartLineService.FindAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No cart found!";
            else message = 'Cartline successfully retrieved';

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
exports.cartline_details = (req, res) => {
    CartLineService.Details(req)
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
            message: "Error retrieving cartline with id " + req.params.id
        });
    });
};

// update a cart  by the id.
exports.cartline_update = (req, res) => {
    // validate request
    if(!req.body.skuid)  {
        return res.status(badRequest).send({
            success: false, 
            message: "Please enter cartline name "
        });
    }

    // find cart and update
    CartLineService.Update(req)
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
                message: "Cartitems not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error updating cartitem with id " + req.params.id
        });
    });
};

// delete a cart with the specified id.
exports.cartline_delete = (req, res) => {
   CartLineService.Delete(req)
        .then(data => {
            if (!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Cartitem not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Cartitem successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(notFound).send({
                success: false,
                message: "Cartitem not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Could not delete cartitem with id " + req.params.id
        });
    });
};