const express = require("express");
const route = express.Router();

const loginController = require("./src/controllers/loginController");
const registerController = require("./src/controllers/registerController");
const trainingController = require("./src/controllers/trainingController");
const exerciseController = require("./src/controllers/exerciseController");

const { loginRequired } = require("./src/middlewares/middleware");

// login controllers
route.get("/", loginController.index);
route.post("/", loginController.login);
route.get("/logout", loginController.logout);

// register controllers
route.get("/register", registerController.index);
route.post("/register", registerController.register);

// training controllers
route.get("/training", loginRequired, trainingController.index);
route.get("/training/add", loginRequired, trainingController.registerIndex);
route.post("/training/add", loginRequired, trainingController.register);
route.get("/training/add/:id", loginRequired, trainingController.editIndex);
route.post("/training/edit/:id", loginRequired, trainingController.edit);
route.get("/training/delete/:id", loginRequired, trainingController.delete);

// exercise controllers
route.get("/training/:id/exercise", loginRequired, exerciseController.exerciseIndex);
route.get("/training/:id/exercise/add", loginRequired, exerciseController.addExerciseIndex);
route.post("/training/:id/exercise/add", loginRequired, exerciseController.add);
route.get("/training/:id/exercise/add/:idExercise", loginRequired, exerciseController.editIndex);
route.post("/training/:id/exercise/edit/:idExercise", loginRequired, exerciseController.edit);
route.get("/training/:id/exercise/delete/:idExercise", loginRequired, exerciseController.delete);

module.exports = route;