var express           = require('express'),
    router            = express.Router(),
    passport          = require("passport");

var authenticationsController = require('../controllers/authenticationsController'),
    chatsController           = require('../controllers/chatsController'),
    usersController           = require('../controllers/usersController');


// AUTHENTICATION ROUTES

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);




// CHAT ROUTES

// router.route('/').get(chatsController.chatsIndex)

// router.route('/chats')
//   .get(chatsController.chatsIndex)
//   .post(chatsController.chatsCreate);

router.route('/chats/:id')
  .get(chatsController.chatsShow)
  // .delete(chatsController.chatsDelete);


module.exports = router;

