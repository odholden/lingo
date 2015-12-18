var express           = require('express'),
    router            = express.Router(),
    passport          = require("passport");

var authenticationsController = require('../controllers/authenticationsController'),
    chatsController           = require('../controllers/chatsController'),
    usersController           = require('../controllers/usersController');


// AUTHENTICATION ROUTES

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
  .get(usersController.usersIndex)

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)

router.route('/chats')
  .get(chatsController.chatsIndex)

router.route('/chats/:id')
  .get(chatsController.chatsShow)
  .patch(chatsController.chatsAddUser)
  .put(chatsController.chatsAddMessage)



module.exports = router;

