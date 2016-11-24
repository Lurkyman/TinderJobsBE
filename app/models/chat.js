var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var chatSchema = new Schema({
    room: String,
    messages: [{
        timestamp: Date,
        sender:String, 
        msg:String,
    }],
});

var chat = mongoose.model('Chat', chatSchema);

module.exports = chat;
