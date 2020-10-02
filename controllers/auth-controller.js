const User = require('../models/user')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

const register = async(req, res, next)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const { name, email, password } = req.body; 
  // Hashing The Password
  let hashedPassword
  try {
    const salt = await bcrypt.genSalt(10)
    hashedPassword = await bcrypt.hash(password, salt)
  } catch (error) {
      console.log("password is not hashed")
      return res.status(400).send('Could not create user try again later')
  }
  
 
  const user = new User({
    name,email,password: hashedPassword
})

  let existingUser;

  try {
      existingUser = await User.findOne({email})
      
  } catch (error) {
    return res.status(400).send('something went wrong')
  }
  if(existingUser){
      return res.status(400).send('Email already exist. Go and Sign In')
   // const err = new HttpError('Email already exist. Go and Sign In')
   // throw next(err)
  }
    try {
        await user.save()
    } catch (error) {
        const err = new Error('could not sign up try again')
        return next(err)
    }
    res.json({
        user: user._id
    })
}



exports.register = register
exports.login = login
