var express     = require('express');
var router      = express.Router();

var Match       = require('./../models/match.js');

router.get('/api/matches', function(req, res) {
    Match.find(function(err, matches) {
        if(err)
            res.send(err);

        res.json(matches);
    }
});

router.put('/api/matches', function(req, res) {
    vat match = new Match();
    match.seeker = req.body.seeker;
    match.employer = req.body.employer;

    match.save( function(err) {
        if(err)
            res.send({success: false, msg:"Match cannot be saved"});
    });
});
