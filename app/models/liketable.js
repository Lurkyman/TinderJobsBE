var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var likeTb = new Schema({
    type: String,
    liker: String,
    likee: String
});

likeTb.collection = "liketable";

var likeMod = mongoose.model('liketbl', likeTb);
likeTb.pre('save', function(next) {
    var self = this;
   likeMod.find({type: self.type, liker: self.liker, likee: self.likee}, function(err,docs) {

        if(!docs.length){
            next();
        }
        else {
            next(new Error("Already liked."));
        }
   }); 
});

module.exports = likeMod;
