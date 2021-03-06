var express      = require('express');
var router       = express.Router();

var Employer     = require('./../models/employer.js');
var AuthUser     = require('./../models/authm.js');

// get all employers
router.get('/api/employers', function(req, res) {

    console.log(req.query.timestamp);
    Employer.find({updatedAt: {$gte: new Date(parseInt(req.query.timestamp))}},function(err, employers) {
        if(err)
            res.send(err);

        res.json(employers);
    });
});

//create new employer
router.post('/api/employer', function(req, res) {
    var employer        = new Employer();
    employer.name       = req.body.name;
    employer.img        = req.body.img;
    employer.info       = req.body.info;
    employer.mobnum     = req.body.mobnum;
    employer.email      = req.body.email;
    employer.likes      = [];
    employer.dislikes   = [];

    var authUser        = new AuthUser();
    authUser.email      = req.body.email;
    authUser.password   = req.body.password;
    authUser.type       = "employer";

    employer.save( function(err) {
        if(err){
            res.send({success:false, msg: "User exists."});
        } else {
           authUser.save( function(err) {
               if(err){
                   res.send(err);
               } else {
                   res.json({success: "true", type: "employer", info: employer});
               }
           });
        }
    });
});

// get specific employer
router.get('/api/employer/:employer_eid', function(req, res) {
    Employer.findOne({email: req.params.employer_eid}, function(err, user) {
        if(err)
            res.send(err);

        res.json(user);
    });
});

module.exports = router;
