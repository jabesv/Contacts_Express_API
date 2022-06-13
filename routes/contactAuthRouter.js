const express = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const UserModel = require('../models/usersSchema')

const router = express.Router()

//Routerr login
router.post('/', [
    check("email", "Pleasae provide a valid email!").isEmail(),
    check("password", "Check your password!").notEmpty()
], async (req, res) => {
    const userData = req.body

    const errors = validationResult(req)
    //check for validation errors
    if(!errors.isEmpty()){
        return res.json(errors.array())
    }

    try {
        //finds the user with the provided email
        const user = await UserModel.findOne({email: userData.email})

        if(!user){
            return res.json('User not found')
        }

        //compare the plaint text password to hashed password
        const isMatch = await bcrypt.compare(userData.password, user.password)

        if (!isMatch) {
            return res.json("Password is not a match!")
        }

            //* ===========
            res.status(200).json("Success!")

    } catch (error) {
        console.log(error)
        res.status(500).json("Server Error")
        
    }

})


module.exports = router
