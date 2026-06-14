// the main work of app.js is to create an instance and to use all the middlewere and routes 
const express = require('express'); 
const cookieParser = require('cookie-parser');

const app = express();

/* middleweres */
app.use(express.json());
app.use(cookieParser());



/* require all the routes here */
const authRouter = require("./routes/routes.auth");


/*use all the routes  */
app.use("/api/auth",authRouter);


module.exports= app;