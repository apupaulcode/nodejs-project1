const {check, validationResult} = require('express-validator');
const createError = require('http-errors');
const path = require('path');
const { unlink } = require('fs');
//  internal imports 
const User = require('../../model/People');



const addUserValidator = [
    check('name')
       .isLength({min:1})
       .withMessage('Name is required')
       .isAlpha('en-US', {ignore: ' -'})
       .withMessage('Name must not contain anything other than alphabets')
       .trim(),
    check('email').isEmail().withMessage('Invalid email').trim().custom( async(value)=>{
        try {
            const user = await User.findOne({email:value});
            if(user){
                throw createError('email already in use');
            }
        } catch (error) {
            throw createError(error.message)
        }
    }),
    check('mobile')
        .isMobilePhone('en-IN',{
            strictMode:true,
        })
        .withMessage('Mobile number must be a valid Indian mobile number')
        .custom(async(value)=>{
            try{
                const user = await User.findOne({mobile:value});
                if(user){
                    throw createError('Mobile already in use!');
                }
            }catch(err){
                throw createError(err.message);
            }
        }),
];

const addUserValidateHandler = function(req,res,next){
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if(Object.keys(mappedErrors).length === 0){
        next();
    }else{
        if(req.files.length > 0){
            const {filename} = req.files[0];
            unlink(path.join(__dirname,`/../public/uploades/avatars/${filename}`),(err)=>{
                if(err) console.log(err);
            })
            
        }
        res.status(500).json({
            errors:mappedErrors,
        });
    }
}

module.exports = {
    addUserValidator,
    addUserValidateHandler,
}