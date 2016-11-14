var express     = require('express');
var router      = express.Router();

var Like = require('./../models/liketable.js');

router.post('/api/like/:uo_eid/:ut_eid', function(req, res) {
     var like = new Like();
     like.liker = req.params.uo_eid;
     like.likee = req.params.ut_eid;

     like.save(function(err) {
        if(err) return;
     });
});

module.exports = router;
