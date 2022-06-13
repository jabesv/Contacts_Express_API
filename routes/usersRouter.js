const express = require('express')
const UserModel = require('../models/usersSchema')
//* pulls out the two functions we need from express validator
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
//Create a Router
const router = express.Router()

//Create or register an user
router.post('/', [
    check('username', 'Uername is required!').notEmpty(),
    check('email', 'Please use a valid email!').isEmail(),
    check('password', "Please enter a password").notEmpty(),
    check('password', "please enter a password with six characters").isLength({min: 6})
], async (req, res) => {
    const userData = req.body

    const errors = validationResult(req)
    
    if (!errors.isEmpty()){
        return res.json(errors.array())
    }
    
    try {
        // checking if there is an user with this email in the db
        const userExist = await UserModel.findOne({email: userData.email})

        if (userExist){
            return res.json({msg: "User already exist!"})
        }

        //* Create new user
        // 1. Create new salt
        const SALT = await bcrypt.genSalt(10)
        // 2. use the salt to create a hash with the user's password
        const hashedPassword = await bcrypt.hash(userData.password, SALT)
        // 3. assign the hashed password to the userData
        userData.password = hashedPassword
        // write the user to the db
        const user = await UserModel.create(userData)
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json('Bad request!!!')
    }
})

module.exports = router