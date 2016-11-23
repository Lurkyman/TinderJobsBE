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

module.exports = match;
