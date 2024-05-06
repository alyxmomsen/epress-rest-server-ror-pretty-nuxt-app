const account = require("./methods/account");
const { authCheck } = require("./methods/auth/auth-check");
const login = require("./methods/auth/login");
const { registration } = require("./methods/auth/registration");


class RouterController {
  constructor() {
    this.account = account;
    this.registration = registration;
    this.login = login;
    this.authCheck = authCheck;
  }
}

module.exports = new RouterController();
