var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var empSchema = new Schema({
    name: String,
    img: String,
    info: String,
    mobnum: String,
    email: String,
    likes: [String]
});

empSchema.pre('save', function(next) {
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

empSchema.collection = "employers";

module.exports = mongoose.model('Employer', empSchema);
