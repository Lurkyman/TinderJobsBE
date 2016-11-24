
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose'); 
var server     = require('http').Server(app);
var io         = require('socket.io')(server);

var db = require('./config/db.js');
mongoose.connect(db.url);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8090; 

require('./app/routes.js') (app);

server.listen(port, function(){
    console.log('Magic happens on port ' + port);
});

/************************ SOCKET IMPLEMENTATION *******************************/
var Chat = require('./app/models/chat.js');
var Msg = require('./app/models/chatmsg.js');

io.on('connection', function(socket) {
    console.log("Client connected.");

    socket.on('match', function(data) {
        var roomRaw = data.seeker + data.employer;
        roomRaw = roomRaw.replace(/[^a-zA-Z0-9]/g, '');

        var room = "";

        console.log(roomRaw.length);
        var i;
        for(i=0; i < roomRaw.length; i+=2){
            console.log(i);
            room = room + roomRaw.charAt(i);
        }

        var sendData = {seeker: data.seeker, employer: data.employer, room: room};

        console.log(sendData);
        socket.emit("Ack from server.");
        socket.broadcast.emit("match", sendData);
    });

    socket.on('recMessage', function(data) {
        var room = data.room;

        var message = new Msg();
        message.msg = data.msg;
        message.timestamp = data.timestamp;
        message.sender = data.sender;

        socket.to(room).emit('sendMessage', message);
    });
});

exports = module.exports = app;
