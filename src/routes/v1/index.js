const express = require("express");
const { create } = require("../../controllers/ticket-controller");

const v1Router = express.Router();

v1Router.post("/tickets", create);

module.exports = v1Router;
