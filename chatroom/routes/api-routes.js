// Dependencies
var connection = require("../config/connection.js");

// Routes
module.exports = function (app) {
    // Get all chat logs
    app.get("/api/all", function (req, res) {
        var dbQuery = "SELECT * FROM chat";

        connection.query(dbQuery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    });

    // Add a chat
    app.post("/api/new", function (req, res) {
        console.log("Chat Data:");
        console.log(req.socket);

        var dbQuery = "INSERT INTO chat (username, msg) VALUES (?,?)";

        connection.query(dbQuery, [req.socket.username, req.socket.msg], function (err, result) {
            if (err) throw err;
            console.log("Chat Log Successfully Saved!");
            res.end();
        });
    });
};