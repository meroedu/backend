
const express = require('express');
const router = express.Router();
const auth = require('../config/auth');
const {validateToken} = require('../utils/myeduJWT');

// Auth APIs
router.use('/auth', require('./custom_auth/local'));

/**
 * To make endpoint authenticate
 * eg: router.use('/api', validateToken, require('./api'));
 */
// Business APIs
router.use('/api', require('./api'));

module.exports = router;
