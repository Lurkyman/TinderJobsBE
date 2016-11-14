var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var seekerSchema = new Schema({
    salut: String,
    fname: String,
    lname: String,
    img: String,
    education: String,
    workexp: String,
    skills: String,
    mobnum: String,
    email: String,
    likes: [String]
});

seekerSchema.pre('save', function(next) {
    var self = this;
    seekerSchema.find({email: self.email}, function(err, docs) {
        if(!docs.length()){
            next();
        }
        else {
            next(new Error("User exists."));
        }
    });
});

seekerSchema.collection = 'seekers'
module.exports = mongoose.model('Seeker', seekerSchema);
