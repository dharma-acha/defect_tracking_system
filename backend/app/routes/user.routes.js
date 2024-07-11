module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.create);

  //assign Project Manger to project
  router.post("/assignPM", users.assignPM);

  // Retrieve all users
  router.get("/", users.findAll);

  //Retrive assigned Project Managers
  router.get("/get-assignedPM", users.findassignedPM);

  //Retrive unassigned Project Managers
  router.get("/get-unassignedPM", users.findUnassignedPM);

  router.get("/projectemployees/:id", users.findProjectEmployees);

  // Retrieve a single user with id
  router.get("/:id", users.findOne);

  // Update a user with id
  router.put("/:id", users.update);

  // Delete a user with id
  router.delete("/:id", users.delete);

  app.use("/api/users", router);
};
