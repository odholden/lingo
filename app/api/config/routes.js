var express           = require('express'),
    router            = express.Router(),
    passport          = require("passport");

var authenticationsController = require('../controllers/authenticationsController'),
    chatsController           = require('../controllers/chatsController'),
    usersController           = require('../controllers/usersController'),
    languagesController       = require('../controllers/languagesController');


// AUTHENTICATION ROUTES

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
  .get(usersController.usersIndex)

router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.addChatToUser)



router.route('/languages')
  .get(languagesController.languagesIndex)

router.route('/languages/:name')
  .get(languagesController.languagesShow)


router.route('/chats')
  .get(chatsController.chatsIndex)

router.route('/chats/:id')
  .get(chatsController.chatsShow)



module.exports = router;

