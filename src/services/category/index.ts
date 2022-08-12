const { badRequest , internalServerError, notFound } = require('../../../comman/constants.ts');

const CategoryService = require('./dm_layer/index.ts');

// create a new Category.
exports.category_create = function (req, res) {
    // validate request
    if(!req.body.name) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter category serviceType "
        });
    }

    

    // save category in the database.
    CategoryService.Create(req)
        .then(data => {
            res.send({
                success: true,
                message: 'Category successfully created',
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while creating the category."
        });
    });
};

// retrieve and return all categorys.
exports.all_categorys= (req, res) => {
    CategoryService.FindAll()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No category found!";
            else message = 'Category successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
        res.status(internalServerError).send({
            success: false,
            message: err.message || "Some error occurred while retrieving category"
        });
    });
};

// find a single category with a id.
exports.category_details = (req, res) => {
    CategoryService.Details(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Category not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: 'Category successfully retrieved',
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(notFound).send({
                success: false,
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error retrieving category with id " + req.params.id
        });
    });
};

// update a category  by the id.
exports.category_update = (req, res) => {
    // validate request
    if(!req.body.name) {
        return res.status(badRequest).send({
            success: false,
            message: "Please enter category serviceType "
        });
    }

    // find category and update
   CategoryService.Update(req)
        .then(data => {
            if(!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Category not found with id " + req.params.id
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
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Error updating category with id " + req.params.id
        });
    });
};

// delete a category with the specified id.
exports.category_delete = (req, res) => {
    CategoryService.Delete(req)
        .then(data => {
            if (!data) {
                return res.status(notFound).send({
                    success: false,
                    message: "Category not found with id " + req.params.id
                });
            }
            res.send({
                success: true,
                message: "Category successfully deleted!"
            });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(notFound).send({
                success: false,
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(internalServerError).send({
            success: false,
            message: "Could not delete category with id " + req.params.id
        });
    });
};