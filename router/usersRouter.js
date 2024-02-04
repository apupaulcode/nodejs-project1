// external importScripts

const express = require('express');

// internal imports 

const {getUsers, addUser} = require('../controller/usersController')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');
const avatarUpload = require('../middleware/users/avatarUpload');
const  {addUserValidator, addUserValidateHandler}  = require('../middleware/users/userValidators');

const router = express.Router();
// users page 
router.get('/', decorateHtmlResponse('Users'), getUsers);


// get users 
router.get('/', avatarUpload, addUserValidator, addUserValidateHandler,addUser);


module.exports = router;