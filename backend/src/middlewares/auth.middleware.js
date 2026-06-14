const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../model/blacklist.model');
const { json } = require('express');




async function userAuth(req,res,next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token is not provided"
        })
    }

    const isTokenAlreadyBlacklisted = await blacklistTokenModel.findOne({
        token
    })
    
    if(isTokenAlreadyBlacklisted){
        return res.status(400).json({
            message: "Token is invalid"
        })
    }
   


    try {     
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (error) {
        return res.status(401).json({
            message:"invalid token"
        })
        
    }

    

}

module.exports = {userAuth}