var LocalStrategy = require("passport-local").Strategy;
var User          = require("../models/user");

module.exports = function(passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
  }, function(req, username, password, done) {

    User.findOne({ 'username' : username }, function(err, user) {
      if (err) return done(err, false, { message: "Something went wrong." });
      if (user) return done(null, false, { message: "Please choose another username." });

      var newUser      = new User();

      newUser.username = username;
      newUser.email    = req.body.email;
      newUser.image    = req.body.image;
      newUser.password = User.encrypt(password);

      newUser.save(function(err, user) {
        if (err) return done(err, false, { message: "Something went wrong." + err});
        return done(null, user);
      });
    });
  }));
}