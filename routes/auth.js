const express = require('express');
const router = express.Router()
const { body, check } = require('express-validator');
const verify = require('../privateRoutes');
const {register, login} = require('../controllers/auth-controller')

router.post('/register',[
    check('name').isString().notEmpty().withMessage("cannot leave empty"),
    check('email').isEmail().withMessage("should be email").notEmpty().withMessage("cannot leave empty"),
    check('password').isLength({min: 6}).withMessage('must be at least 5 chars long')
], register)




//rdfghjkrtyuij
//rdfytguhijktuygihjk

router.post('/login', [
    check('email').isEmail().withMessage("should be email").notEmpty().withMessage("cannot leave empty"),
    check('password').isLength({min: 6}).withMessage('must be at least 5 chars long')
], login)

router.get('/post', verify, (req, res)=>{
    res.json({posts: {title: yes}})
})
module.exports = router