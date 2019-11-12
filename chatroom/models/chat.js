/* IMPORT ORM FUNCTIONS THAT INTERACT WITH DB */
var orm = require("../config/orm.js");
var chat = {
  all: function (cb) {
    orm.all("chat", function (res) {
      cb(res);
    });
  },
  // cols and vals are arrays
  create: function (cols, vals, cb) {
    orm.create("chat", cols, vals, function (res) {
      cb(res);
    });
  },
  update: function (objColVals, condition, cb) {
    orm.update("chat", objColVals, condition, function (res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (chatController.js).
module.exports = chat;