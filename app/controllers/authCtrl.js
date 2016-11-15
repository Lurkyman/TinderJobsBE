var express         = require('express');
var router          = express.Router();

var User            = require('./../models/authm.js');

var Seeker          = require('./../models/jseeker.js');
var Employer        = require('./../models/employer.js');

router.post('/login/', function(req, res) {
    if(!req.body.email || !req.body.password)
        res.json({success: false, msg: 'Please enter both username and password'});
    else {
        User.findOne({email: req.body.email, password: req.body.password},
            function(err, user){
                if(!user){
                    res.json({success: false, msg: "Authentication failed."});
                } else {
                    if(user.type == "seeker"){
                        Seeker.findOne({email: user.email}, function(err, seeker){
                            if(err) {
                                return res.json({success: false, msg: "Oops, something went wrong."});
                            }

                            if(!seeker) {
                                res.json({success: false, msg: "User info not found."});
                            } else {
                                res.json({success: true, info: seeker});
                            }
                        });
                    } 
                    else if(user.type == "employer") {
                        Employer.findOne({email: user.email}, function(err, employer){
                            if(err) {
                                return res.json({success: false, msg: "Oops, something went wrong."});
                            }

                            if(!employer) {
                                res.json({success: false, msg: "User info not found."});
                            } else {
                                res.json({success: true, info: employer});
                            }
                        });
                    }
                    else {
                        res.json({success: false, msg: "Invalid user type."});
                    }
                }
            }
        );
    }
});

module.exports = router;
