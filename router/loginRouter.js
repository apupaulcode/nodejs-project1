// external importScripts

const express = require('express');

// internal imports 

const {getLogin} = require('../controller/loginController')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');

const router = express.Router();

router.get('/', decorateHtmlResponse('Login'), getLogin);


module.exports = router;