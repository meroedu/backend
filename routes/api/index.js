const express = require('express');
const router = express.Router();

/**
 * All Routes for "/api/**"
 * 
 */

 // router.use('/users', require('./users'));
router.use('/courses', require('./courses'));

module.exports = router;
