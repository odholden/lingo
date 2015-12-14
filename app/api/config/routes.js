var express           = require('express'),
    router            = express.Router(),
    passport          = require("passport");

var authenticationsController = require('../controllers/authenticationsController'),
    chatsController           = require('../controllers/chatsController'),
    usersController           = require('../controllers/usersController');


// AUTHENTICATION ROUTES

router.route('/login')
  .get(authenticationsController.login);

router.route('/register')
  .get(authenticationsController.register);



// CHAT ROUTES

// router.route('/').get(chatsController.chatsIndex)

// router.route('/chats')
//   .get(chatsController.chatsIndex)
//   .post(chatsController.chatsCreate);

router.route('/chats/:id')
  .get(chatsController.chatsShow)
  // .delete(chatsController.chatsDelete);


module.exports = router;

