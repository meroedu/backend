
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const passport = require('passport');
const {generateToken} = require('../../utils/myeduJWT');
const User = require('../../models').User;

// User Login Form validation
const userLoginForm = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

// User Sign Up Form validation
const userSignUpForm = Joi.object().keys({
	fullname: Joi.string().alphanum().min(2).max(100).optional(),
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

router.post('/login', (req, res, next) => {
	const { body: { user } } = req;
	const result = Joi.validate(user, userLoginForm);
    
	if(result.error){
		return res.status(422).json({
			errors: result.error
		});
	}

	return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
		if(err) {
			return next(err);
		}

		if(passportUser) {
			const user = {
                user: passportUser,
				token: generateToken(passportUser)
			};

			return res.json(user);
		}
        
		return res.status(400).send(info);
	})(req, res, next);
});

router.post('/signup', async (req, res ) => {
	const { body: { user } } = req;
	const result = Joi.validate(user, userSignUpForm);
	if(result.error){
		return res.status(422).json({
			errors: result.error
		});
    }
    try {
        const user = await User.create(req.body);
        return res.json(user);
    } catch(e) {
        return res.status(500).json({errors: e});
    }
});


module.exports = router;
