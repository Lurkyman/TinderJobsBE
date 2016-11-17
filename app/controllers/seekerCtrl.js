var express     = require('express');
var router      = express.Router();

var Seeker      = require('./../models/jseeker.js');
var AuthUser    = require('./../models/authm.js');

// get all job seekers
router.get('/api/seekers', function(req, res) {
    Seeker.find( function(err, seekers) {
        if(err)
            res.send(err);

        res.json(seekers);
    });
});

// create new job seeker
router.post('/api/seeker', function(req, res) {
   var seeker =  new Seeker();
   seeker.salut = req.body.salut;
   seeker.fname = req.body.fname;
   seeker.lname = req.body.lname;
   seeker.img = req.body.img;
   seeker.education = req.body.education;
   seeker.workexp = req.body.workexp;
   seeker.skills = req.body.skills;
   seeker.mobnum = req.body.mobnum;
   seeker.email = req.body.email;
   seeker.likes = [];
   seeker.tags = [];

   seeker.save( function(err) {
        if(err) {
            res.send(err);
            return;
        }
   });

   var authUser = new AuthUser();
   authUser.email = req.body.email;
   authUser.password = req.body.password;
   authUser.type = "seeker";

   authUser.save( function(err) {
       if(err){
           res.send(err);
       } else {
           res.json({msg:"User created."});
       }
   });
});

// get individual seeker
router.get('/api/seeker/:seeker_eid', function(req, res) {
    Seeker.findOne({email: req.params.seeker_eid}, function(err, user) {
        if(err)
            res.send(err);

        res.json(user);
    });
});

module.exports = router;
