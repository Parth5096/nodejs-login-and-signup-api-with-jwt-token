const { badRequest , internalServerError, notFound } = require('../../../common/constants.ts');
// include user model
const UserService = require('./dm_layer/index.ts');

// create a new User.
exports.user_create = function (req, res) {
    // validate request
    if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.addresses || !req.body.mobileNo) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter required fields-first name,last name,email,mobile"
        });
    }

    // save user in the database.
    UserService.Create(req)
        .then(data => {
            res.send({
                success: true,
                message: 'User successfully created',
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// retrieve and return all users.
exports.all_users = (req, res) => {
    UserService.FindAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No user found!";
            else message = 'Users successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// find a single user with a id.
exports.user_details = (req, res) => {
    UserService.FindById(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'User successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(notFound).send({
                success: false,
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error retrieving user with id " + req.params.id
        });
    });
};

// update a user  by the id.
exports.user_update = (req, res) => {
    // validate request
    if(!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.addresses || !req.body.mobileNo) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter required fields-first name,last name,email,mobile,address"
        });
    }

    // find user and update
    UserService.Update(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "User not found with id " + req.params.id
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
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error updating user with id " + req.params.id
        });
    });
};

// delete a user with the specified id.
exports.user_delete = (req, res) => {
    UserService.Delete(req)
        .then(data => {
            if (!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "User successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(notFound).send({
                success: false,
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Could not delete user with id " + req.params.id
        });
    });
};