const { badRequest , internalServerError, notFound } = require('../../../common/constants.ts');

const Wallet = require('./dm_layer/index');

// create a new wallet.
exports.wallet_create = function (req, res) {
    // validate request
    if(!req.body.user_id) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter user_id"
        });
    }

   

    // save wallet in the database.
    Wallet.Create(req)
        .then(data => {
            res.send({
                success: true,
                message: 'wallet successfully created',
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while creating the wallet."
        });
    });
};

// retrieve and return all wallets.
exports.all_wallet= (req, res) => {
    Wallet.FindAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No wallet found!";
            else message = 'wallet successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while retrieving wallet"
        });
    });
};

// find a single wallet with a user_id.
exports.wallet_details = (req, res) => {
    Wallet.FindById(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "wallet not found with id " + req.params.user_id
                });
            }
            res.send({
                success: true,
                message: 'wallet successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(notFound).send({
                success: false,
                message: "wallet not found with id " + req.params.user_id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error retrieving wallet with id " + req.params.user_id
        });
    });
};

// update a wallet  by the user id.
exports.wallet_update = (req, res) => {
    // validate request
    if(!req.body.user_id) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter user id"
        });
    }

    // find wallet and update
   Wallet.Update(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "wallet not found with id " + req.params.user_id
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
                message: "wallet not found with id " + req.params.user_id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error updating wallet with user_id " + req.params.user_id
        });
    });
};

// delete a wallet with the specified id.
exports.wallet_delete = (req, res) => {
    Wallet.Delete(req)
        .then(data => {
            if (!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "wallet not found with id " + req.params.user_id
                });
            }
            res.send({
                success: true,
                message: "wallet successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(notFound).send({
                success: false,
                message: "wallet not found with id " + req.params.user_id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Could not delete wallet with id " + req.params.user_id
        });
    });
};