var config = require('./../config/db.js');

module.exports = function(app) {
    app.get('/api', function(req, res) {
        res.json({msg: "API reporting for duty"});
    });

    app.use(require('./controllers/seekerCtrl.js'));
    app.use(require('./controllers/employerCtrl.js'));
    app.use(require('./controllers/listingCtrl.js'));
    app.use(require('./controllers/liketbCtrl.js'));
    app.use(require('./controllers/authCtrl.js'));
    app.use(require('./controllers/matchCtrl.js'));
    app.use(require('./controllers/chatCtrl.js'));
};
