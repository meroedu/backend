
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models').User;

/**
 * Sign in - Email and Password Implementation.
 */
passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
	User.findOne({ where: {email: email }}).then(user => {
	  if (user == null) {
		return done(null, false, { message: 'Invalid account.' });
	  }
	  user.validatePassword(password, (err, isMatch) => {
		if (err) { return done(err); }
		if (isMatch) {
		  return done(null, user);
		}
		return done(null, false, { message: 'Invalid password.' });
	  });
	}, err => {
		return done(err);
	});
  }));

/**
 * TODO: Singn in - Single SSO implementation
 */
