const { checkIfUserExists } = require("../middleware");

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

router.post("/auth-check", controller.authCheck);
router.post("/login", controller.login);
router.post("/registration", checkIfUserExists, controller.registration);
router.post("/account", controller.account);

module.exports = {
  router,
  customResponse,
};
