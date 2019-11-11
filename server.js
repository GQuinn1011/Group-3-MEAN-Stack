/* ROUTING */

// import here

var app = express();
var exphbs = require("express-handlebars");
var routes = require("../controllers/controller");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
var http = require("http").createServer(app);
var io = require("socket.io")(http);
// end imports

app.use(express.static(path.join(__dirname, "public")));
var connection = require("./config/connection.js");
/* CHATROOM */
var numUsers = 0;

io.on("connection", (socket) => {
    var addedUser = false;

    socket.on("new message", (data) => {
        socket.broadcast.emit("new message", {
            username: socket.username,
            message: data
        });
        console.log(socket.username + ": " + data);
    });

    socket.on("add user", (username) => {
        if (addedUser) return;

        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit("login", {
            numUsers: numUsers
        });
        socket.broadcast.emit("User Joined", { // emit to all clients
            username: socket.username,
            numUsers: numUsers
        });
        console.log(socket.username + " has joined!");
    });

    socket.on("typing", () => {
        socket.broadcast.emit("typing", {
            username: socket.username
        });
    });

    socket.on("stop typing", () => {
        socket.broadcast.emit("stop typing", {
            username: socket.username
        });
    });

    socket.on("disconnect", () => {
        if (addedUser) {
            --numUsers;

            socket.broadcast.emit("user left", {
                username: socket.username,
                numUsers: numUsers
            });
        }
        console.log("User " + socket.username + " disconnected");
    });
});

http.listen(PORT, function () {
    console.log("listening on localhost:" + PORT);
});