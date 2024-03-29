/* IMPORT chat.JS TO USE ITS DB FUNCTIONS */
var express = require("express");
var router = express.Router();
var chat = require("../models/chat.js");

router.post("/api/chat", function(req, res) {
  // TODO change ↓
  chat.create(["name", "sleepy"], [req.body.name, req.body.sleepy], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});
router.put("/api/chat/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  chat.update(
    {
      sleepy: req.body.sleepy
    },
    condition,
    function(result) {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

/* EXPORT ROUTES FOR SERVER.JS */
module.exports = router;
