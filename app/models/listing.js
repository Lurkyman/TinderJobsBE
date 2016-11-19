var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var listingSchema = new Schema({
    owner: String,
    jobdesc: String,
    skillsReq: String,
    tags: [String],
    jobTitle: String,
    expRequired: String
},{
    timestamps: true
});

listingSchema.collection = 'listings';
listing = mongoose.model('Listing', listingSchema);

listingSchema.pre('save', function(next) {
    var self = this;
    listing.find({owner: self.owner, jobTitle: self.jobTitle}, function(err, docs) {
        if(!docs.length){
            next();
        }
        else {
            next(new Error("Listing exists."));
        }
    })
});

module.exports = listing;
