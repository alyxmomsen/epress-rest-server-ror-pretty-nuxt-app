const account = require("./methods/account");
const { authCheck } = require("./methods/auth/auth-check");
const login = require("./methods/auth/login");
const { registration } = require("./methods/auth/registration");
const { deleteUsers } = require("./methods/delete-users");
const { getUsers } = require("./methods/get-users");
const { notifications } = require("./methods/notifycations");

class RouterController {
  constructor() {
    this.account = account;
    this.registration = registration;
    this.login = login;
    this.authCheck = authCheck;
    this.notifications = notifications;
    this.getUsers = getUsers ;
    this.deleteUsers = deleteUsers ;
  }
}

module.exports = new RouterController();
