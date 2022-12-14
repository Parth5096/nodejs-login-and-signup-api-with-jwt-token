const {
  badRequest,
  internalServerError,
  notFound,
} = require("../../../common/constants.ts");
// include plans model
const Plans = require("./api/schema/index.ts");

const PlanService = require("./dm_layer/index.ts");

// create a new Plans.
exports.plan_create = function (req, res) {
  // validate request
  if (!req.body.name) {
    return res.status(badRequest).send({
      success: false,
      message: "Please enter plan name ",
    });
  }

  // save plan in the database.
  PlanService.Create(req)
    .then((data) => {
      res.send({
        success: true,
        message: "Plan successfully created",
        data: data,
      });
    })
    .catch((err) => {
      res.status(internalServerError).send({
        success: false,
        message: err.message || "Some error occurred while creating the plan.",
      });
    });
};

// retrieve and return all plans.
exports.all_plans = (req, res) => {
  PlanService.FindAll()
    .then((data) => {
      var message = "";
      if (data === undefined || data.length == 0) message = "No plan found!";
      else message = "Plans successfully retrieved";

      res.send({
        success: true,
        message: message,
        data: data,
      });
    })
    .catch((err) => {
      res.status(internalServerError).send({
        success: false,
        message: err.message || "Some error occurred while retrieving plan",
      });
    });
};

// find a single plan with a id.
exports.plans_details = (req, res) => {
  PlanService.Details(req)
    .then((data) => {
      if (!data) {
        return res.status(notFound).send({
          success: false,
          message: "Plan not found with id " + req.params.id,
        });
      }
      res.send({
        success: true,
        message: "Plan successfully retrieved",
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(notFound).send({
          success: false,
          message: "Plan not found with id " + req.params.id,
        });
      }
      return res.status(internalServerError).send({
        success: false,
        message: "Error retrieving plan with id " + req.params.id,
      });
    });
};

// update a plan  by the id.
exports.plan_update = (req, res) => {
  // validate request
  if (!req.body.name) {
    return res.status(badRequest).send({
      success: false,
      message: "Please enter plan name ",
    });
  }

  // find plan and update
  PlanService.Update(req)
    .then((data) => {
      if (!data) {
        return res.status(notFound).send({
          success: false,
          message: "Plan not found with id " + req.params.id,
        });
      }
      res.send({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(notFound).send({
          success: false,
          message: "Plan not found with id " + req.params.id,
        });
      }
      return res.status(internalServerError).send({
        success: false,
        message: "Error updating plan with id " + req.params.id,
      });
    });
};

// delete a plan with the specified id.
exports.plan_delete = (req, res) => {
  PlanService.Delete(req)
    .then((data) => {
      if (!data) {
        return res.status(notFound).send({
          success: false,
          message: "Plan not found with id " + req.params.id,
        });
      }
      res.send({
        success: true,
        message: "Plan successfully deleted!",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(notFound).send({
          success: false,
          message: "Plan not found with id " + req.params.id,
        });
      }
      return res.status(internalServerError).send({
        success: false,
        message: "Could not delete plan with id " + req.params.id,
      });
    });
};
