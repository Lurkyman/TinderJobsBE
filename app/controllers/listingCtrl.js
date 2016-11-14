var express         = require('express');
var router          = express.Router();

var Listing         = require('./../models/listing.js');

// get all listings
router.get('/api/listings', function(req, res) {
    Listing.find(function(err, listings) {
        if(err)
            res.send(err);

        res.json(listings);
    });
});

module.exports = router;
