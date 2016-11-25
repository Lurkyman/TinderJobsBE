var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var chatSchema = new Schema({
    room: String,
    seeker: String,
    employer: String,
    messages: [{
        timestamp: Date,
        sender:String, 
        msg:String,
    }],
});

chatSchema.collection = "chats";

var chat = mongoose.model('chat', chatSchema);

module.exports = chat;
