var express         = require('express');
var router          = express.Router();

var Chat            = require('./../models/chat.js');

router.get('/api/chat/:uid', function(req, res) {
    Chat.find({$or: [{seeker: req.params.uid}, {employer: req.params.uid}]}, function(err, chats) {
        if(err)
            res.json(err);
        else
            res.json(chats);
    });
});

router.post('/api/chat/', function(req, res) {
    
});

module.exports = router;
