var express      = require('express');
var router       = express.Router();

var Employer     = require('./../models/employer.js');

// get all employers
router.get('/api/employers', function(req, res) {
    Employer.find(function(err, employers) {
        if(err)
            res.send(err);

        res.json(employers);
    });
});

//create new employer
router.post('/api/employer', function(req, res) {
    var employer = new Employer();
    employer.name = req.body.name;
    employer.img = req.body.img;
    employer.info = req.body.info;
    employer.mobnum = req.body.mobnum;
    employer.email = req.body.email;

    employer.save( function(err) {
        if(err)
            res.send(err);

        res.json({msg: 'User created'});
    });
});
