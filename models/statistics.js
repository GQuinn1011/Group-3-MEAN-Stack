/* IMPORT ORM FUNCTIONS THAT INTERACT WITH DB */
var orm = require("../config/orm.js");
var stat = {
  // all: function(cb) {
  //   orm.all("cats", function(res) {
  //     cb(res);
  //   });
  // },
  // // cols and vals are arrays
  // create: function(cols, vals, cb) {
  //   orm.create("cats", cols, vals, function(res) {
  //     cb(res);
  //   });
  // },
  // update: function(objColVals, condition, cb) {
  //   orm.update("cats", objColVals, condition, function(res) {
  //     cb(res);
  //   });
  // }
}

/* EXPORT ORM FUNCTIONS FOR CATSCONTROLLER */
module.exports = stat;