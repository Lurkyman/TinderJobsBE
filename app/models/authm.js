var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var authSchema = new Schema({
    email: String,
    password: String,
    type: String
});

authSchema.collection = "auth";
var auth = mongoose.model('auth', authSchema);

authSchema.pre('save', function(next) {
    var self = this;
    auth.find({email: self.email}, function(err, docs) {
        if(!docs.length) {
            next();
        }
        else {
            next(new Error("User exists."));
        }
    
    });
});

module.exports = mongoose.model('auth', authSchema);
