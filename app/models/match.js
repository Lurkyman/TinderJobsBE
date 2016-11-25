var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var matchSchema = new Schema({
    seeker: String,
    employer: String
},{
    timestamps: true
});

matchSchema.collection = "matches";
var match = mongoose.model('match', matchSchema);

matchSchema.pre('save', function(next) {
    var self = this;
    match.find({seeker: this.seeker, employer: this.employer}, function(err, docs) {
        if(!docs.length){
            next();
        }

        else {
            next(new Error("Match exists."));
        }
    });
});

module.exports = match;
