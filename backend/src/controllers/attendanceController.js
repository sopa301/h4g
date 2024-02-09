require("dotenv").config();
const Event = require("../db/schema/Event");
const Form = require("../db/schema/Form");
const { isExistingUser } = require("../util/db");

module.exports = {
  POSTForm,
  PATCHForm,
};
