var express     = require('express');
var router      = express.Router();

var Like        = require('./../models/liketable.js');
var Seeker      = require('./../models/jseeker.js');     
var Employer    = require('./../models/employer.js');
var User        = require('./../models/authm.js');

router.post('/api/like', function(req, res) {
     var like = new Like();
     like.type  = req.body.type;
     like.liker = req.body.liker;
     like.likee = req.body.likee;

     like.save(function(err) {
        if(err) return;
     });

    var type = null;

    User.findOne({email: like.liker}, function(err, user) {
        if(err)
            return res.json({success:false, msg: err});
    
        if(!user) return res.json({success: false, msg: "user not found"});

        console.log(user.type);
        type = user.type;
        console.log(type);

        if(type == "seeker") {
            Seeker.findOneAndUpdate({email: like.liker}, 
                    {$push: {[like.type]: like.likee}},
                    {safe: true},
                    function(err, seeker) {
                        if(err)
                            res.json({success:"false", msg:"Something went wrong."});      
                        if(seeker){
                            res.json({success:"true", updated: seeker});
                        } else {
                            res.json({success:"false", msg: "User not found."}); 
                        }
                    }    
            );
        } else if(type == "employer") {
            Employer.findOneAndUpdate({email: like.liker}, 
                    {$push: {[like.type]: like.likee}},
                    {safe: true},
                    function(err, employer) {
                        if(err)
                            res.json({success:"false", msg:"Something went wrong."});      
                        if(employer){
                            res.json({success:"true", updated: employer});
                        } else {
                            res.json({success:"false", msg: "User not found."}); 
                        }
                    }    
            );
        } else {
            res.json({success:false, msg: "User type invalid."});
        }
    });

});

router.get('/api/likes', function(req, res) {
    Like.find(function(err, listings) {
        if(err)
            res.send(err);

        res.json(listings);
    });
});

module.exports = router;
