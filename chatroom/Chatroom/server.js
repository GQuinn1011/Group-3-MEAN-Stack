// Setup basic express server
var express = require("express");
var app = express();
var path = require("path");
var http = require("http").createServer(app); // or ("http").Server(app);
var io = require("socket.io")(http); // Can be either http, server
// if above doesnt work use this ↓ (Used for Heroku)
// var server = require("http").createServer(app);
// var io = require("socket.io").listen(server);

// MySQL connection
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "chatroom_db"
});

var PORT = process.env.PORT || 3000;

// Routing
app.use(express.static(path.join(__dirname, "public")));

// Chatroom
var numUsers = 0;

io.on("connection", (socket) => {
    var addedUser = false;

    // When the client emits "new message", this listens and executes
    socket.on("new message", (data) => {
        // We tell the client to execute 'new message'
        socket.broadcast.emit("new message", {
            username: socket.username,
            message: data
        });
        console.log(socket.username + ": " + data);
    });

    // When the client emits "add user", this listens and executes
    socket.on("add user", (username) => {
        if (addedUser) return;

        // We store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit("login", {
            numUsers: numUsers
        });
        // Echo globally (all clients) that a person has connected
        socket.broadcast.emit("User Joined", {
            username: socket.username,
            numUsers: numUsers
        });
        console.log(socket.username + " has joined!");
    });

    // When the client emits "typing", we broadcast it to others
    socket.on("typing", () => {
        socket.broadcast.emit("typing", {
            username: socket.username
        });
    });

    // When the client emits 'stop typing', we broadcast it to others
    socket.on("stop typing", () => {
        socket.broadcast.emit("stop typing", {
            username: socket.username
        });
    });

    // When the user disconnects.. perform this
    socket.on("disconnect", () => {
        if (addedUser) {
            --numUsers;

            // Echo globally that this client has left
            socket.broadcast.emit("user left", {
                username: socket.username,
                numUsers: numUsers
            });
        }
        console.log("User " + socket.username + " disconnected");
    });
});

// when user joins update total user 
// console.log("total Users online: " + numUsers);

http.listen(PORT, function () {
    console.log("listening on localhost:" + PORT);
});

// BONUS

// Heroku
// https://stackoverflow.com/questions/25013735/socket-io-nodejs-doesnt-work-on-heroku

// Private Message
// https://stackoverflow.com/questions/11356001/socket-io-private-message

// Creating Rooms
// https://stackoverflow.com/questions/19150220/creating-rooms-in-socket-io


// Get the client's IP address in socket.io
// io.sockets.on('connection', function (socket) {
//     var socketId = socket.id;
//     var clientIp = socket.request.connection.remoteAddress;

//     console.log(clientIp);
//   });