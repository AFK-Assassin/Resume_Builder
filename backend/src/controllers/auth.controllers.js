const userModel = require('../model/user.model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../model/blacklist.model')



/**
 * @name registerUserController
 * @access public
 * @description register the username,email,password
 */
async function registerUserController(req,res){

    const {email,username,password} = req.body

    if (!username || !password || !email ){
        return res.status(400).json({
            message : "Please provide valid details ..."
        })
    }
    const isUserAlreadyExist = await userModel.findOne({
        $or :[ {email} , {username}]
    })

    if(isUserAlreadyExist){
        return res.status(400).json({
            message : "Account already exists with this usename or email "
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password :hash
    })

    const token = jwt.sign(
        {id:user.id , username : user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"new user regestered",
        user:{
            id:user._id,
            email:user.email,
            username:user.username
        }
    })

}

/**
 * @name loginUserController 
 * @access public
 * @description login's to the website using email & password
 */
async function loginUserController(req,res) {

    const {email,password} = req.body
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message : "invalid email and password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message : "invalid credentials "
        })
    }
    const  token =  jwt.sign(
        {id:user._id ,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)

    res.status(200).json({
        message : "user logged in sucessfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }       
    })


}

/**
 * @name logoutUserController
 * @access public
 * @description clear user cookie and puts the token in blacklisting
 */
async function logoutUserController(req,res) {

    const token = req.cookies.token

    if (token){
        await blacklistTokenModel.create({token})
    }
    
    res.clearCookie("token");

    res.status(200).json({
        message : "logout sucessfully"
    })
}

/**
 * @name getmeUserController
 * @access private
 * @description gets the current logged in user's details
 */
async function getmeUserController(req,res){

    const user = await userModel.findById(req.user.id)

        res.status(200).json({
        message:"user fetched sucessfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })


}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getmeUserController
} 