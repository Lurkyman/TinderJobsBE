var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var listingSchema = new Schema({
    img: String,
    compName: String,
    jobdesc: String,
    skillsReq: String
});

module.exports = mongoose.model('Listing', listingSchema);
