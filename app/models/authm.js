var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var authSchema = new Schema({
    email: String,
    password: String
});

authSchema.collection = "auth";

module.exports = mongoose.model('auth', authSchema);
