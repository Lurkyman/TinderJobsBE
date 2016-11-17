var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var listingSchema = new Schema({
    img: String,
    owner: String,
    jobdesc: String,
    skillsReq: String,
    tags: [String]
},{
    timestamps: true
});

listingSchema.collection = 'listings';

module.exports = mongoose.model('Listing', listingSchema);
