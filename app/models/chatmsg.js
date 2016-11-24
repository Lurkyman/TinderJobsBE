var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var msgSchema = new Schema({
    timestamp: Date,
    sender: String,
    msg: String
});

module.exports = mongoose.model('msg', msgSchema);
