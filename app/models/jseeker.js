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
    likes: [String],
    tags: [String],
    dislikes: [String]
},{
    timestamps: true
});

seekerSchema.collection = 'seekers'
var seeker = mongoose.model('Seeker', seekerSchema);

seekerSchema.pre('save', function(next) {
    var self = this;
    seeker.find({email: self.email}, function(err, docs) {
        if(!docs.length){
            next();
        }
        else {
            next(new Error("User exists."));
        }
    });
});

module.exports = seeker;
