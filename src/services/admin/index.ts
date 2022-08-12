const { badRequest , internalServerError, notFound } = require('../../../comman/constants.ts');

const AdminService = require('./dm_layer/index.ts');

// create a new Admin.
exports.admin_create = function (req, res) {
    // validate request
    if(!req.body.accessLevel ) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter required fields-accessLevel"
        });
    }

    
    // save admin in the database.
    AdminService.Create(req)
     .then(data => {
         res.send({
             success: true,
             message: 'admin successfully created',
             data: data
         });
     }).catch(err => {
     res.status(internalServerError).send({
         success: false,
         message: err.message || "Some error occurred while creating the admin."
     });
 });
};

// retrieve and return all admins.
exports.all_admin = (req, res) => {
    AdminService.FindAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No admins found!";
            else message = 'Admins successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while retrieving admins."
        });
    });
};

// find a single admin with a id.
exports.admin_details = (req, res) => {
    AdminService.Details(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Admin not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Admin successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(notFound).send({
                success: false,
                message: "Admin not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error retrieving address with id " + req.params.id
        });
    });
};

// update a admin  by the id.
exports.admin_update = (req, res) => {
    // validate request
    if(!req.body.accessLevel) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter required fields user_id"
        });
    }

    // find admin and update
   AdminService.Update(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Admin not found with id " + req.params.id
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
                message: "Admin not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error updating admin with id " + req.params.id
        });
    });
};

// delete a admin with the specified id.
exports.admin_delete = (req, res) => {
    AdminService.Delete(req)
        .then(data => {
            if (!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Admin not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Admin successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(notFound).send({
                success: false,
                message: "Admin not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Could not delete Admin with id " + req.params.id
        });
    });
};