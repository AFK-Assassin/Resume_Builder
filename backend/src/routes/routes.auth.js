const express = require("express");
const authRouter = express.Router();
const authController = require('../controllers/auth.controllers')
const authMiddlewere = require('../middlewares/auth.middleware')



/**
 * @Route POST(/api/auth/register)
 * @Description Register a new user
 * @Acess Public
 * 
 */
authRouter.post("/register",authController.registerUserController)

/**
 * @Route POST(/api/auth/login)
 * @Description  user login
 * @Acess Public
 * 
 */
authRouter.post("/login",authController.loginUserController)

/**
 * @Route GET(/api/auth/logout)
 * @Description  remove user cookie and add token into blacklisting
 * @Acess Public
 * 
 */
authRouter.get("/logout",authController.logoutUserController)

/**
 * @Route GET(/api/auth/get-me)
 * @Description  gets the deatils of the logged inn users details
 * @Acess private
 * 
 */
authRouter.get("/get-me",authMiddlewere.userAuth,authController.getmeUserController)




module.exports = authRouter;


