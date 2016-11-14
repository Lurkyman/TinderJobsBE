var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var likeTb = new Schema({
    liker: String,
    likee: String
});

likeTb.collection = "liketable";

likeTb.pre('save', function(next) {
    var self = this;
   likeTb.findOne({liker: self.liker, likee: self.likee}, function(err,docs) {
        if(!docs.length()){
            next();
        }
        else {
            throw new(Error("Already liked."));
        }
   }); 
});

module.exports = mongoose.model('liketbl', likeTb);
