var express         = require('express');
var router          = express.Router();

var Listing         = require('./../models/listing.js');

// get all listings
router.get('/api/listings', function(req, res) {
    Listing.find({updatedAt: {$gt: new Date(parseInt(req.query.timestamp))}}, function(err, listings) {
        if(err)
            res.send(err);

        res.json(listings);
    });
});

router.post('/api/listing', function(req, res) {
    var listing = new Listing();
    listing.owner = req.body.compname;
    listing.jobdesc = req.body.jobdesc;
    listing.skillsReq = req.body.skillsReq;
    listing.tags = req.body.tags;
    listing.jobTitle = req.body.jobTitle;
    listing.expRequired = req.body.expRequired;

    listing.save( function(err) {
        if(err) res.send({success: "false", msg: "match cannot be saved"});
        else res.send({success: "true", info: listing});
    });
});

module.exports = router;
