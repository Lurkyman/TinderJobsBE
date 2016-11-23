var express     = require('express');
var router      = express.Router();

var Match       = require('./../models/match.js');

router.get('/api/matches', function(req, res) {
    Match.find({updatedAt: {$gte: new Date(parseInt(req.query.timestamp))}}, function(err, matches) {
        if(err)
            res.send(err);

        res.json(matches);
    });
});

router.post('/api/matches', function(req, res) {
    var match = new Match();
    match.seeker = req.body.seeker;
    match.employer = req.body.employer;

    match.save( function(err) {
        if(err)
            res.send({success: false, msg:"Match cannot be saved"});
        else 
            res.send({success: true});
    });
});

module.exports = router;
