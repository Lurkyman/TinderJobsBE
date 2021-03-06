var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var empSchema = new Schema({
    name: String,
    img: String,
    info: String,
    mobnum: String,
    email: String,
    likes: [String],
    last_modified: Date,
    dislikes: [String]
},{
    timestamps: true
});

empSchema.collection = 'employers';
var employer = mongoose.model('Employer', empSchema);

empSchema.pre('save', function(next) {
    var self = this;
    employer.find({email: self.email}, function(err, docs) {
        if(!docs.length){
            next();
        }
        else {
            next(new Error("User exists."));
        }
    });
});

module.exports = employer;
