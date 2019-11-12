// Setup basic express server
var express = require("express");
var app = express();
var path = require("path");
var http = require("http").createServer(app); // or ("http").Server(app);
var fs = require("fs"); // ? Not sure if needed
var io = require("socket.io")(http); // Can be either http, server
//* If above doesnt work use this ↓ (Used for Heroku)
// var server = require("http").createServer(app);
// var io = require("socket.io").listen(server);

var PORT = process.env.PORT || 3000;

// Static directory to be served
app.use(express.static(path.join(__dirname, "public")));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/chatController.js");

// Import routes and give the server access to them.
require("./routes/api-routes.js")(app);
app.use(routes);

// Chatroom
var numUsers = 0;

io.on("connection", (socket) => {
    var addedUser = false;

    // When the client emits "new message", this listens and executes
    socket.on("new message", (msg) => {
        // We tell the client to execute "new message"
        socket.broadcast.emit("new message", {
            username: socket.username,
            message: msg
        });

        console.log(socket.username + ": " + msg);
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
        console.log("total Users online: " + numUsers);
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
        console.log("total Users online: " + numUsers);
    });

});

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


// Helpful links
// https://stackoverflow.com/questions/tagged/socket.io%20node.js%20mysql?sort=MostFrequent&edited=true


// Other
// Get the client's IP address in socket.io
// io.sockets.on('connection', function (socket) {
//     var socketId = socket.id;
//     var clientIp = socket.request.connection.remoteAddress;

//     console.log(clientIp);
//   });