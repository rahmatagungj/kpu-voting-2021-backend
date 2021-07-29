
let router = require('express').Router();

// Default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to KPU STKIP!'
    });
});


var voteController = require('./controllers/voteController');

// Contact routes
router.route('/vote')
    .get(voteController.index)
    .post(voteController.new);
router.route('/vote/:nim')
    .get(voteController.view)
    .patch(voteController.update)
    .put(voteController.update)
    .delete(voteController.delete)
router.route('/vote/count/:vote_to')
    .get(voteController.count)

module.exports = router;