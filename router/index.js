const { checkIfUserExists, auth, auth2 } = require("../middleware");

const jwt = require("jsonwebtoken");

const router = new require("express").Router();

const fireStore = require("../db");

const {
  collection,
  getDocs,
  setDoc,
  increment,
  addDoc,
} = require("firebase/firestore");

const { customResponse } = require("../utils");
const controller = require("../controller");

// routes
router.post("/notifications", auth2, controller.notifications);
router.get("/auth-check", auth, controller.authCheck);
router.post("/login", controller.login);
router.post("/registration", checkIfUserExists, controller.registration);
router.post("/account", controller.account);
router.get("/users" , controller.getUsers);
router.delete("/users" , controller.deleteUsers);

module.exports = {
  router,
  customResponse,
};
